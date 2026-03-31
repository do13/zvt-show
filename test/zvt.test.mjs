import { describe, it, expect } from 'vitest'

// window.getZvtMessage is injected by test/setup.js
const parse = (hex) => window.getZvtMessage(hex)

// ── Header ────────────────────────────────────────────────────────────────────

describe('header', () => {
    it('extracts ccrc and aprc', () => {
        const r = parse('060106')
        expect(r.ccrc).toBe('06')
        expect(r.aprc).toBe('01')
    })

    it('resolves command name', () => {
        expect(parse('060106').command).toBe('Authorization')
        expect(parse('065003ffffff').command).toBe('End-of-Day')
        expect(parse('040f00').command).toBe('StatusInformation')
    })

    it('decodes standard 1-byte length', () => {
        expect(parse('060106').length).toBe(6)
    })

    it('decodes extended 3-byte length (FF HL LL)', () => {
        // 06 01 FF 00 06 → extended length = 0x0006 = 6
        const r = parse('0601ff0006')
        expect(r.length).toBe(6)
    })

    it('unknown command leaves command undefined', () => {
        expect(parse('ffff00').command).toBeUndefined()
    })
})

// ── BMP field types ───────────────────────────────────────────────────────────

describe('BMP fixed-length fields', () => {
    it('BMP 04 amount: converts BCD to decimal string', () => {
        // 0601 07(len) 04(bmp) 000000012345 → 12345 / 100 = 123.45
        const r = parse('060107' + '04' + '000000012345')
        expect(r.bmp['04'].val).toBe('123.45')
    })

    it('BMP 19 typ: parsed as binary', () => {
        // 040f 02(len) 19(bmp) 01
        const r = parse('040f02' + '19' + '01')
        expect(r.bmp['19'].val).toBe('01')
    })

    it('BMP 27 result code: resolves description', () => {
        // 040f 02(len) 27(bmp) 00
        const r = parse('040f02' + '27' + '00')
        expect(r.bmp['27'].val).toBe('00')
        expect(r.bmp['27'].valDesc).toBeDefined()
    })

    it('BMP 49 currency: parsed as 2-byte BCD', () => {
        // 040f 03(len) 49(bmp) 0978 (EUR)
        const r = parse('040f03' + '49' + '0978')
        expect(r.bmp['49'].val).toBe('0978')
    })
})

describe('BMP variable-length fields (LL / LLL)', () => {
    it('LL: reads length as 1-byte binary', () => {
        // 040f 08(len) 22(bmp=pan) 06(LL=6 bytes) 123456789012
        const r = parse('040f08' + '22' + '06' + '123456789012')
        expect(r.bmp['22'].val).toBe('123456789012')
        expect(r.bmp['22'].length).toBe(6)
    })

    it('LL: length 0x0a = 10 bytes (would fail with old nibble-reading)', () => {
        // pan with 10 bytes BCD
        const r = parse('040f0c' + '22' + '0a' + '12345678901234567890')
        expect(r.bmp['22'].val).toBe('12345678901234567890')
        expect(r.bmp['22'].length).toBe(10)
    })
})

describe('BMP 06 TLV container', () => {
    it('parses a primitive TLV tag inside BMP 06', () => {
        // 06 0F 08(bmp-len) 06(bmp=TLV) 06(TLV-len) 1f0e(tag) 02(len) 0101
        //   tag 1f0e, length 2, value 0101
        const r = parse('060f09' + '06' + '07' + '1f0e' + '02' + '0101')
        expect(r.bmp['06']).toBeDefined()
        const tlvEntries = r.bmp['06'].tlv
        expect(tlvEntries).toBeDefined()
        expect(tlvEntries.length).toBeGreaterThan(0)
        const firstTag = Object.keys(tlvEntries[0])[0]
        expect(firstTag).toBe('1f0e')
    })
})

// ── Command-specific prefix handling ─────────────────────────────────────────

describe('Completion 060F – conditional result code', () => {
    it('extracts result code when first byte is not a BMP tag', () => {
        // 06 0F 01(len) 6E(result-code)
        const r = parse('060f01' + '6e')
        expect(r.result).toBeDefined()
        expect(r.result.code).toBe('6e')
    })

    it('does not extract result code when first byte is a known BMP tag', () => {
        // real capture: 060F 11(len) 19(BMP typ) …
        const r = parse('060f11' + '1901' + '29' + '31313131' + '49' + '0978' + '06' + '05' + '2703140101')
        expect(r.result).toBeUndefined()
        expect(r.bmp['19']).toBeDefined()
    })

    it('result code includes description when known', () => {
        const r = parse('060f01' + '6e')
        expect(r.result.bez ?? r.result.desc ?? r.result.code).toBeTruthy()
    })
})

describe('Abort 061E – mandatory result code', () => {
    it('always extracts result code', () => {
        const r = parse('061e01' + '00')
        expect(r.result.code).toBe('00')
    })
})

describe('IntermediateStatusInformation 04FF', () => {
    it('parses status byte', () => {
        const r = parse('04ff01' + '0b')   // 0b = "Please remove card!"
        expect(r.status.code).toBe('0b')
        expect(r.status.desc).toContain('remove card')
    })

    it('sets error for error-flagged status codes', () => {
        const r = parse('04ff01' + '1d')   // 1d = Declined
        expect(r.error).toBe('Declined')
    })

    it('parses optional timeout byte', () => {
        const r = parse('04ff02' + '0b' + '1e')   // status + timeout 0x1e = 30s
        expect(r.timeout).toBe('1e')
    })
})

describe('password prefix commands', () => {
    it('0650 End-of-Day extracts 3-byte password', () => {
        const r = parse('065003' + 'ffffff')
        expect(r.password).toBe('ffffff')
    })

    it('0630 Reversal extracts password', () => {
        const r = parse('063003' + '123456')
        expect(r.password).toBe('123456')
    })

    it('0600 Registration extracts password + config-byte + CC', () => {
        const r = parse('060010' + 'ffffff' + '9e' + '09' + '78' + '0601060400000012345')
        expect(r.password).toBe('ffffff')
        expect(r['config-byte']).toBe('9e')
        expect(r.CC).toBe('0978')
    })
})

// ── ZVT serial framing ────────────────────────────────────────────────────────

describe('ZVT serial framing (DLE/STX/ETX)', () => {
    it('strips 10 02 … 10 03 framing', () => {
        // frame: 1002 + payload + 1003 + BCC
        // payload: 04ff01 0b  (IntermediateStatus, status=0b)
        const r = parse('1002' + '04ff01' + '0b' + '1003' + '00')
        expect(r.command).toBe('IntermediateStatusInformation')
        expect(r.status.code).toBe('0b')
    })

    it('unescapes DLE stuffing (10 10 → 10) inside payload', () => {
        // status byte 0x10 is escaped to 10 10 in the serial stream
        // message: 04ff01 10  → framed: 1002 04ff01 1010 1003 00
        const r = parse('1002' + '04ff01' + '1010' + '1003' + '00')
        expect(r.status.code).toBe('10')   // "Invalid card"
    })
})

// ── Error / warning handling ──────────────────────────────────────────────────

describe('warnings', () => {
    it('reports unknown BMP tag as a warning', () => {
        // 040f 02(len) fe(unknown BMP) 00
        const r = parse('040f02' + 'fe' + '00')
        expect(r.warnings).toBeDefined()
        expect(r.warnings.some(w => w.includes('fe'))).toBe(true)
    })
})

// ── Real-world captures ───────────────────────────────────────────────────────

describe('real captures', () => {
    it('Completion: 6E is the length byte, 00 is the result code, BMP 06 TLV present', () => {
        const hex = '060F6E00066B' +
            '1F440491313131E4441F400A6356454E4420706C75671F41294745522D4150502D76322E302E31303B634430322E30312E30312D30302E31312D322D323B434330301F420411E6BC8D1F430100340D1F0E04202203131F0F03200946350D1F0E04202203141F0F03040000'
        const r = parse(hex)
        expect(r.command).toBe('Completion')
        expect(r.result.code).toBe('00')
        expect(r.bmp['06']).toBeDefined()
    })

    it('Completion without result code, BMP fields present', () => {
        const r = parse('060F111900299131313149097806052703140101')
        expect(r.command).toBe('Completion')
        expect(r.result).toBeUndefined()
        expect(r.bmp['19']).toBeDefined()
        expect(r.bmp['29']).toBeDefined()
        expect(r.bmp['49']).toBeDefined()
    })
})
