/**
 * @param {number} number
 * @param {number} bitPosition - zero based.
 * @return {number}
 */
function getBit(number, bitPosition) {
    return (number >> bitPosition) & 1;
}


// ECR-Interface ZVT-Protocol Revision 13.13, Date 17.06.2025
// Chapter 14 Summary of Commands
var zvtCommands = {
    '0101': { 'desc': 'RFU' },
    '0401': { 'desc': 'Set Date and Time' },
    '040d': { 'desc': 'Input-Request' },
    '040e': { 'desc': 'Menu-Request' },

    '040f': { 'desc': 'StatusInformation' },
    '04ff': { 'desc': 'IntermediateStatusInformation' },

    //[<password>[03<service-byte>][06<TLV-container>]]
    '0501': { 'desc': 'Status-Enquiry' },
    '05ff': { 'desc': 'RFU' },


    '0600': { 'desc': 'Registration' },
    '0601': { 'desc': 'Authorization' },
    '0602': { 'desc': 'LogOff' },
    '0603': { 'desc': 'AccountBalanceRequest' },
    '0604': { 'desc': 'ActivateCard' },
    '0605': { 'desc': 'Procurement' },
    //<prepaid-card-ID 2 byte, BCD> <payment-mode 1 byte> 04<amount>
    '0609': { 'desc': 'Top-Up Prepaid-Cards', 'bmpstartDefault': 12 },
    '060a': { 'desc': 'Tax Free' },
    '060b': { 'desc': 'RFU' },
    '060c': { 'desc': 'Book Tip' },
    '060f': { 'desc': 'Completion' },
    '0610': { 'desc': 'Send Turnover Totals' },
    '0611': { 'desc': 'RFU' },
    '0612': { 'desc': 'Print Turnover Receipts' },
    '0618': { 'desc': 'ResetTerminal' },
    '061a': { 'desc': 'PrintSystemConfiguration' },
    '061b': { 'desc': 'SetResetTerminalID' },
    '061e': { 'desc': 'Abort' },
    '0620': { 'desc': 'Repeat Receipt' },
    '0621': { 'desc': 'Telephonic Authorisation' },
    '0622': { 'desc': 'Reservation' },
    '0623': { 'desc': 'Partial-Reversal of a Pre-Authorisation / Booking of a Reservation' },
    '0624': { 'desc': 'Book Total' },

    '0625': { 'desc': 'Pre-Authorisation Reversal' },
    '0626': { 'desc': 'Reversal of external transaction (Reservation)' },
    '0630': { 'desc': 'Reversal' },
    '0631': { 'desc': 'Refund' },
    '0650': { 'desc': 'End-of-Day' },
    '0651': { 'desc': 'Send offline Transactions' },
    '0652': { 'desc': 'Partial reconciliation' },
    '0670': { 'desc': 'Diagnosis' },
    '0679': { 'desc': 'Selftest' },
    '0682': { 'desc': 'RFU' },
    '0685': { 'desc': 'Display Text (old version)' },
    '0686': { 'desc': 'Display Text with Numerical Input (old version)' },
    '0687': { 'desc': 'PIN-Verification for Customer-Card (old version)' },
    '0688': { 'desc': 'Display Text with Function-Key Input (old version)' },



    '0690': { 'desc': 'RFU' },
    '0691': { 'desc': 'Set Date and Time in PT' },
    '0693': { 'desc': 'Initialisation' },
    '0695': { 'desc': 'Change Password' },
    '06b0': { 'desc': 'Abort' },
    '06c0': { 'desc': 'Read Card', 'bmpstartDefault': 8 },
    '06c1': { 'desc': 'reserved' },
    '06c2': { 'desc': 'reserved' },
    '06c3': { 'desc': 'reserved' },
    '06c4': { 'desc': 'reserved' },
    '06c5': { 'desc': 'Close Card Session' },
    '06c6': { 'desc': 'Send APDUs' },
    '06ce': { 'desc': 'RFU' },
    '06d0': { 'desc': 'Menu selection with graphic display' },
    '06d1': { 'desc': 'Print Line on PT' },
    '06d3': { 'desc': 'PrintTextBloc' },
    '06d4': { 'desc': 'RFU' },
    '06d8': { 'desc': 'Dial-Up' },
    '06d9': { 'desc': 'Transmit Data via Dial-Up' },
    '06da': { 'desc': 'Receive Data via Dial-Up' },
    '06db': { 'desc': 'Hang-Up' },
    '06dd': { 'desc': 'Transparent-Mode' },
    '06e0': { 'desc': 'Display Text' },
    '06e1': { 'desc': 'Display Text with Function-Key Input' },
    '06e2': { 'desc': 'Display Text with Numerical Input' },
    '06e3': { 'desc': 'PIN-Verification for Customer-Card' },
    '06e4': { 'desc': 'Blocked-List Query to ECR' },
    '06e5': { 'desc': 'MAC calculation' },
    '06e6': { 'desc': 'Card Poll with Authorization' },
    '06e7': { 'desc': 'Display Text with Numerical Input with DUKPT Encryption' },
    '06f0': { 'desc': 'Display Image' },
    '06f1': { 'desc': 'Display Image with Function-Key Input' },

    '0801': { 'desc': 'Activate Service-Mode' },
    //0802 <protocol-type 1 byte>
    '0802': { 'desc': 'Switch Protocol' },
    //0803 <Service-PW> 06<TLV-container>
    '0803': { 'desc': 'Configure Power Management' },
    '0810': { 'desc': 'Software-Update' },
    '0811': { 'desc': 'Read File' },
    '0812': { 'desc': 'Delete File' },
    '0813': { 'desc': 'Change Configuration' },
    '0814': { 'desc': 'Write File' },
    '0820': { 'desc': 'Start OPT Action' },
    '0821': { 'desc': 'Set OPT Point-in-Time' },
    '0822': { 'desc': 'Start OPT Pre-Initialisation' },
    '0823': { 'desc': 'Output OPT-Data' },
    '0824': { 'desc': 'OPT Out-of-Order' },
    '0830': { 'desc': 'Select Language' },
    '0840': { 'desc': 'Change Baudrate' },
    '0850': { 'desc': 'Activate Card-Reader' },


    '0fca': { 'desc': 'ChipActivator' },

    '8000': { 'desc': 'Ack', 'bmpstartDefault': 6 },
    '8400': { 'desc': 'Ack' },
    //84xx NAK
    '8483': { 'desc': 'NAK unknown bitmaps' },
    '849c': { 'desc': 'Repeat Status Information' },
    '849d': { 'desc': 'Partial issue of goods' }

}


// ECR-Interface ZVT-Protocol Revision 13.13, Date 17.06.2025
// Chapter 13 Summary of utilised BMPs
var bmpStruct = {
    '01': { 'length': 1, 'format': 'binary', 'desc': 'timeout' },
    '02': { 'length': 1, 'format': 'binary', 'desc': 'Maximal number of status informations' },
    '03': { 'length': 1, 'format': 'binary', 'desc': 'Service byte' },
    '04': { 'length': 6, 'format': 'bcd', 'desc': 'Amount' },
    '05': { 'length': 1, 'format': 'binary', 'desc': 'Pump number' },
    '06': { 'length': 'TLV', 'format': 'TLVcontainer', 'desc': 'TLV-container' },
    '0b': { 'length': 3, 'format': 'bcd', 'desc': 'Trace number' },
    '0c': { 'length': 3, 'format': 'bcd', 'desc': 'Time' },
    '0d': { 'length': 2, 'format': 'bcd', 'desc': 'Date' },
    '0e': { 'length': 2, 'format': 'bcd', 'desc': 'ExpiryDate' },
    '17': { 'length': 2, 'format': 'bcd', 'desc': 'Card sequence-number' },
    '19': { 'length': 1, 'format': 'binary', 'desc': 'typ' },
    '22': { 'length': 'LL', 'format': 'bcd', 'desc': 'pan' },
    '23': { 'length': 'LL', 'format': 'binary', 'desc': 'Track 2 data' },
    '24': { 'length': 'LLL', 'format': 'binary', 'desc': 'Track 3 data' },
    '27': { 'length': 1, 'format': 'binary', 'desc': 'Result Code' },
    '29': { 'length': 4, 'format': 'bcd', 'desc': 'tid' },
    '2a': { 'length': 15, 'format': 'ASCII', 'desc': 'VU-number' },
    '2d': { 'length': 'LL', 'format': 'binary', 'desc': 'Track 1 data' },
    '2e': { 'length': 'LLL', 'format': 'binary', 'desc': 'Synchronous chip data' },
    '37': { 'length': 3, 'format': 'bcd', 'desc': 'Trace-number' },
    '3a': { 'length': 2, 'format': 'bcd', 'desc': 'CVV/CVC value' },
    '3b': { 'length': 8, 'format': 'binary', 'desc': 'AID authorisation-attribute' },
    '3c': { 'length': 'LLL', 'format': 'bcd', 'desc': 'additionalData...' },
    '3d': { 'length': 3, 'format': 'bcd', 'desc': 'Password' },
    '49': { 'length': 2, 'format': 'bcd', 'desc': 'currency' },
    '60': { 'length': 'LLL', 'format': 'bcd', 'desc': 'Individual totals...' },
    '70': { 'length': 4, 'format': 'binary', 'desc': 'Uniquely identifies Display Image request' },
    '71': { 'length': 4, 'format': 'binary', 'desc': 'Total size of the image that will be displayed' },
    '72': { 'length': 1, 'format': 'binary', 'desc': 'MIME type of the image.' },
    '73': { 'length': 1, 'format': 'binary', 'desc': 'image encoding type' },
    '74': { 'length': 1, 'format': 'binary', 'desc': 'Total number of chunks of the image to display' },
    '75': { 'length': 1, 'format': 'binary', 'desc': 'Index of the chunk of the image data' },
    '76': { 'length': 1, 'format': 'binary', 'desc': 'Image data persistence specifier (deprecated, use TLV 1F800A)' },
    '87': { 'length': 2, 'format': 'bcd', 'desc': 'Receipt-number' },
    '88': { 'length': 3, 'format': 'bcd', 'desc': 'Turnover record number' },
    '8a': { 'length': 1, 'format': 'binary', 'desc': 'Card-type' },
    '8b': { 'length': 'LL', 'format': 'bcd', 'desc': 'Card-name' },
    '8c': { 'length': 1, 'format': 'binary', 'desc': 'Card-type-ID' },
    '9a': { 'length': 'LLL', 'format': 'binary', 'desc': 'GeldKarte payments-/ failed-payment record/total record Geldkarte' },
    'a0': { 'length': 1, 'format': 'binary', 'desc': 'Result-code-AS' },
    'a7': { 'length': 'LL', 'format': 'binary', 'desc': 'Chip-data, EF_ID' },
    'aa': { 'length': 3, 'format': 'bcd', 'desc': 'Date' },
    'af': { 'length': 'LLL', 'format': 'binary', 'desc': 'EF_Info' },
    'ba': { 'length': 5, 'format': 'binary', 'desc': 'AID-parameter' },
    'd0': { 'length': 1, 'format': 'binary', 'desc': 'Algorithm key' },
    'd1': { 'length': 'LL', 'format': 'binary', 'desc': 'Card offset/PIN-data' },
    'd2': { 'length': 1, 'format': 'binary', 'desc': 'Card output direction' },
    'd3': { 'length': 1, 'format': 'binary', 'desc': 'DUKPT key identifier' },
    'e0': { 'length': 1, 'format': 'binary', 'desc': 'Minimal length of the input' },
    'e1': { 'length': 'LL', 'format': 'ASCII', 'desc': 'Text2 line 1' },
    'e2': { 'length': 'LL', 'format': 'ASCII', 'desc': 'Text2 line 2' },
    'e3': { 'length': 'LL', 'format': 'ASCII', 'desc': 'Text2 line 3' },
    'e4': { 'length': 'LL', 'format': 'ASCII', 'desc': 'Text2 line 4' },
    'e5': { 'length': 'LL', 'format': 'ASCII', 'desc': 'Text2 line 5' },
    'e6': { 'length': 'LL', 'format': 'ASCII', 'desc': 'Text2 line 6' },
    'e7': { 'length': 'LL', 'format': 'ASCII', 'desc': 'Text2 line 7' },
    'e8': { 'length': 'LL', 'format': 'ASCII', 'desc': 'Text2 line 8' },
    'e9': { 'length': 1, 'format': 'binary', 'desc': 'Maximal length of the input' },
    'ea': { 'length': 1, 'format': 'binary', 'desc': 'Echo the input' },
    'eb': { 'length': 8, 'format': 'binary', 'desc': 'MAC over text 1 and text 2' },
    'f0': { 'length': 1, 'format': 'binary', 'desc': 'Display-duration in seconds' },
    'f1': { 'length': 'LL', 'format': 'ASCII', 'desc': 'Text1 line 1' },
    'f2': { 'length': 'LL', 'format': 'ASCII', 'desc': 'Text1 line 2' },
    'f3': { 'length': 'LL', 'format': 'ASCII', 'desc': 'Text1 line 3' },
    'f4': { 'length': 'LL', 'format': 'ASCII', 'desc': 'Text1 line 4' },
    'f5': { 'length': 'LL', 'format': 'ASCII', 'desc': 'Text1 line 5' },
    'f6': { 'length': 'LL', 'format': 'ASCII', 'desc': 'Text1 line 6' },
    'f7': { 'length': 'LL', 'format': 'ASCII', 'desc': 'Text1 line 7' },
    'f8': { 'length': 'LL', 'format': 'ASCII', 'desc': 'Text1 line 8' },
    'f9': { 'length': 1, 'format': 'binary', 'desc': 'Number of beep-tones' },
    'fa': { 'length': 1, 'format': 'binary', 'desc': 'Card reader activation' },
    'fb': { 'length': 1, 'format': 'binary', 'desc': 'Confirmation the input with OK required' },
    'fc': { 'length': 1, 'format': 'binary', 'desc': 'Dialog-control' },
    'fd': { 'length': 1, 'format': 'binary', 'desc': 'Display device on which text should be shown' }
}


// ECR-Interface ZVT-Protocol Revision 13.13, Date 17.06.2025
// Chapter 12 List of ZVT-card-type IDs
var zvtCardType = {
    1: 'DouglasCard',
    2: 'ec-card (national, international, bank-customer card) - obsolete',
    3: 'Miles&More',
    4: '(RFU)',
    5: 'girocard',
    6: 'Mastercard',
    7: 'EAPS',
    8: 'American Express',
    9: 'Debit advice based on track 2 or EMV chip (e.g. EuroELV)',
    10: 'Visa',
    11: 'VISA electron',
    12: 'Diners',
    13: 'V PAY',
    14: 'JCB',
    15: 'REKA Card',
    16: 'Esso fleet-card',
    17: 'Happiness Cards',
    18: 'DKV/SVG',
    19: 'Transact Geschenkkarte',
    20: 'Shell fleet-card',
    21: 'Payeasy',
    22: 'DEA',
    23: 'boncard POINTS',
    24: 'Leaseplan',
    25: 'boncard PAY',
    26: 'OK',
    27: 'Klarmobil',
    28: 'UTA',
    29: 'Mobile World',
    30: 'Geldkarte (formerly also: ec-cash with Chip)',
    31: 'Ukash',
    32: 'Hessol',
    33: 'Wallie',
    34: 'Lomo',
    35: 'MyOne',
    36: 'Woehrl',
    37: 'Gutscheinkarte DOUGLAS Gruppe',
    38: 'Breuninger',
    39: 'ABO Card',
    40: 'BSW',
    41: 'BonusCard',
    42: 'Comfort Card',
    43: 'CCC Commit Card',
    44: 'YESSS',
    45: 'DataStandards (DAS)',
    46: 'Maestro (formerly: edc)',
    47: 'GiftCard',
    48: 'Easycard',
    49: 'Jelmoli Card',
    50: 'CitiShopping',
    51: 'J-Geschenkkarte',
    52: 'EuroReal (TeleCash)',
    53: 'Jubin',
    54: 'Hertie',
    55: 'ManorCard',
    56: 'Goertz',
    57: 'Power Card',
    58: 'Lafayette',
    59: 'Supercard plus',
    60: 'Heinemann',
    61: 'SwissBonus Card',
    62: 'Harley Davidson',
    63: 'SwissCadeau',
    64: 'Shopping Plus',
    65: 'Tetora',
    66: 'Family Dent Card',
    67: 'WIRcard',
    68: 'Karstadt Club',
    69: 'Postcard (Postfinance Card)',
    70: 'Hagebau Partner Card',
    71: 'Lebara',
    72: 'Lycamobile',
    73: 'GT Mobile',
    74: 'HP',
    75: 'epay Gutscheinkarte',
    76: 'IKEA Family Plus',
    77: 'Karstadt Bonus Card',
    78: 'Koch Card Plus',
    79: 'Yapital',
    80: 'XTRA Card',
    81: 'Pay-At-Match',
    82: 'Optimus',
    83: 'Lunch-Check Card',
    84: 'VW Club',
    85: 'Tankstellen-Netz-Deutschland',
    86: 'Scandlines',
    87: 'Bancontact-MisterCash',
    88: 'Cast Customer-Card, Payment-function',
    89: 'PAYBACK PAY',
    90: 'Cast Customer-Card, Bonus-capture',
    91: 'ValueMaster',
    92: 'ECMcard',
    93: 'Orlen Flottenkarte',
    94: 'Solitair Card',
    95: 'Orlen Star-Card',
    96: 'Blauworld',
    97: 'ALIPAY',
    98: 'REA Gutschein- und Bonuskarte',
    99: 'Roth',
    100: 'Roth TP',
    101: 'EuroWAG',
    102: 'Porsche-card',
    103: 'ARBÖ-card',
    104: 'ÖAMTC-card',
    105: 'Netto-App',
    106: 'GroupCard',
    107: 'ALIPAY @POS-Model 2',
    108: 'Cheque Dejeuner / UP Slovensko',
    109: 'Callio Gastro',
    110: 'DOXX',
    111: 'Instant Payment',
    112: 'AVIA PrePaid Karte',
    113: 'E100 fuel card',
    114: 'MyCard HEM',
    115: 'Vamed Vitality World Gutscheinkarte',
    116: 'HoyerCard.Europe',
    117: 'VARO/ept Card',
    118: 'Salamantex',
    119: 'PayPal',
    120: 'Klarna',
    121: 'OIL CARD',
    122: 'OIL CARD Prepaid',
    123: 'team Karte',
    124: 'European Diesel Card (EDC)',
    125: 'TWINT',
    126: 'Payconiq',
    127: 'AirPlus',
    128: 'Q1 Card',
    129: 'MOL Group Card',
    130: 'UNVERO FUNN Card',
    137: 'Hornbach Profi',
    138: 'Hornbach Projektwelt',
    142: 'Weat fleet-card',
    144: 'GDB fleet-card',
    146: 'DKV Card',
    148: 'Conoco/Jet fleet-card',
    149: 'Gulf card',
    150: 'Eurotrafic fleet-card',
    152: 'Westfalen fleet-card',
    154: 'Elf fleet-card',
    155: 'Präsentcard',
    156: 'Agip fleet-card',
    157: 'Hornbach Gutscheinkarte',
    158: 'Total fleet-card',
    160: 'AVIA',
    162: 'BFT fleet-card',
    164: 'Routex fleet-card',
    166: 'PAN-Diesel fleet-card',
    176: 'BayWa',
    177: 'GAZ-card/Roadrunner-Card',
    178: 'Go-Card',
    179: 'XNet-Card',
    180: 'PaysafeCard Blue',
    181: 'PaysafeCard Red',
    182: 'Tele 2',
    183: 'Sunrise',
    184: 'Sorena ZED',
    185: 'Quam now-card',
    186: 'Mox Universal',
    187: 'Mox Calling Card',
    188: 'Loop Card',
    189: 'Go Bananas',
    190: 'Free & Easy card',
    191: 'Callya-Card',
    192: 'VCS-DAFA',
    193: 'Caravaning-Card',
    194: 'AirPlus Cargo',
    195: 'HEM-card',
    196: 'Dankort',
    197: 'VISA/Dankort',
    198: 'CUP-card',
    199: 'Mango-card',
    200: 'Payback payment-card',
    201: 'Lunch Card',
    202: 'Payback (without payment function)',
    203: 'Micromoney',
    204: 'T-Card',
    205: 'Blau',
    206: 'BILDMobil',
    207: 'Congstar',
    208: 'C3 Bestminutes',
    209: 'C3 Bestcard',
    210: 'C3 Callingcard',
    211: 'EDEKAMOBIL',
    212: 'XTRA-PIN',
    213: 'Klimacard',
    214: 'ICP-International-Fleet-Card',
    215: 'ICP-Gutscheinkarte',
    216: 'ICP-Bonuskarte',
    217: 'Austria Card',
    218: 'ConCardis Geschenkkarte',
    219: 'TeleCash Gutscheinkarte',
    220: 'Shell private label credit card',
    221: 'ADAC',
    222: 'Shell Clubsmart',
    223: 'Shell Pre-Paid-Card',
    224: 'Shell Master-Card',
    225: 'bauMax Zahlkarte',
    226: 'Fiat-Lancia-Alfa Servicecard',
    227: 'Nissan-Karte',
    228: 'ÖBB Vorteilskarte',
    229: 'Österreich Ticket',
    230: 'Shopin-Karte',
    231: 'Tlapa-Karte',
    232: 'Discover Card',
    233: 'f+f-Karte (frei & flott - Karte)',
    234: 'Syrcon',
    235: 'Citybike Card',
    238: 'IKEA FAMILY Bezahlkarte',
    239: 'Ikano Shopping Card',
    240: 'Intercard Gutscheinkarte',
    241: 'Intercard Kundenkarte',
    242: 'M&M-Gutscheinkarte',
    243: 'Montrada card',
    244: 'CP Customer Card',
    245: 'AmexMembershipReward',
    246: 'FONIC',
    247: 'OTELO DE',
    248: 'SIMYO',
    249: 'Schlecker Smobil',
    250: 'Schlecker Zusatzprodukte',
    251: 'CHRIST Gutscheinkarte',
    252: 'IQ-Card',
    253: 'AVS Gutscheinkarte (Pontos)',
    254: 'Novofleet Card',
    255: 'Indication for ZVT-card-type ID in TLV tag 41',
    256: 'MiFare NFC cards',
    257: 'myCard4u',
    258: 'Ratenkauf',
    259: 'AVIA Prepaid',
    260: 'BlueCode',
    261: 'WeChat Pay',
    262: 'btLEO',
    263: 'Weat Classic Card',
    264: 'Weat Q1 Prepaid',
    265: 'HEM Gutschein',
    266: 'SODEXO',
    267: 'AXA Meal',
    268: 'redimi card',
    269: 'EDENRED',
    270: 'Orlen Gutschein',
    271: 'fusion ID',
    272: 'expatcard',
    273: 'bonuscard',
    274: 'Bezahlkarte',
    275: 'Sozialkarte',
    276: 'socialcard',
    277: 'citycard',
    278: 'fusion card',
    279: 'Jaeger Card',
    280: 'QRpay',
    281: 'LEO Gutschein',
    282: 'TFC Karte',
    283: 'Weat Classic Gutschein'
}
// ECR-Interface ZVT-Protocol Revision 13.13, Date 17.06.2025
// Chapter 10 Error-Messages
var errorMessage = {
    '00': 'no error',
    //01-63 errorcodes from network-operator system/authorisation-system
    '64': 'card not readable (LRC-/parity-error)',
    '65': 'card-data not present (neither track-data nor chip found)',
    '66': 'processing-error (also for problems with card-reader mechanism)',
    '67': 'function not permitted for ec- and Maestro-cards',
    '68': 'function not permitted for credit- and tank-cards',
    '6a': 'turnover-file full',
    '6b': 'function deactivated (PT not registered)',
    '6c': 'abort via timeout or abort-key',
    '6e': 'card in blocked-list (response to command 06 E4)',
    '6f': 'wrong currency',
    '71': 'credit not sufficient (chip-card)',
    '72': 'chip error',
    '73': 'card-data incorrect (e.g. country-key check, checksum-error)',
    '74': 'DUKPT engine exhausted',
    '75': 'text not authentic',
    '76': 'PAN not in white list',
    '77': 'end-of-day batch not possible',
    '78': 'card expired',
    '79': 'card not yet valid',
    '7a': 'card unknown',
    '7b': 'fallback to magnetic stripe for girocard not possible',
    '7c': 'fallback to magnetic stripe not possible (used for non girocard cards)',
    '7d': 'communication error (communication module does not answer or is not present)',
    '7e': 'fallback to magnetic stripe not possible, debit advice possible (used only for girocard)',
    '83': 'function not possible',
    '85': 'key missing',
    '89': 'PIN-pad defective',
    '9a': 'ZVT protocol error. e.g. parsing error, mandatory message element missing',
    '9b': 'error from dial-up/communication fault',
    '9c': 'please wait',
    'a0': 'receiver not ready',
    'a1': 'remote station does not respond',
    'a3': 'no connection',
    'a4': 'submission of Geldkarte not possible',
    'a5': 'function not allowed due to PCI-DSS/P2PE rules',
    'b1': 'memory full',
    'b2': 'merchant-journal full',
    'b4': 'already reversed',
    'b5': 'reversal not possible',
    'b7': 'pre-authorisation incorrect (amount too high) or amount wrong',
    'b8': 'error pre-authorisation',
    'bf': 'voltage supply to low (external power supply)',
    'c0': 'card locking mechanism defective',
    'c1': 'merchant-card locked',
    'c2': 'diagnosis required',
    'c3': 'maximum amount exceeded',
    'c4': 'card-profile invalid. New card-profiles must be loaded.',
    'c5': 'payment method not supported',
    'c6': 'currency not applicable',
    'c8': 'amount too small',
    'c9': 'max. transaction-amount too small',
    'cb': 'function only allowed in EURO',
    'cc': 'printer not ready',
    'cd': 'Cashback not possible',
    'd2': 'function not permitted for service-cards/bank-customer-cards',
    'dc': 'card inserted',
    'dd': 'error during card-eject (for motor-insertion reader)',
    'de': 'error during card-insertion (for motor-insertion reader)',
    'e0': 'remote-maintenance activated',
    'e2': 'card-reader does not answer / card-reader defective',
    'e3': 'shutter closed',
    'e4': 'Terminal activation required',
    'e7': 'min. one goods-group not found',
    'e8': 'no goods-groups-table loaded',
    'e9': 'restriction-code not permitted',
    'ea': 'card-code not permitted (e.g. card not activated via Diagnosis)',
    'eb': 'function not executable (PIN-algorithm unknown)',
    'ec': 'PIN-processing not possible',
    'ed': 'PIN-pad defective',
    'f0': 'open end-of-day batch present',
    'f1': 'ec-cash/Maestro offline error',
    'f5': 'OPT-error',
    'f6': 'OPT-data not available (= OPT personalisation required)',
    'fa': 'error transmitting offline-transactions (clearing error)',
    'fb': 'turnover data-set defective',
    'fc': 'necessary device not present or defective',
    'fd': 'baudrate not supported',
    'fe': 'register unknown',
    'ff': 'system error (= other/unknown error), See TLV tags 1F16 and 1F17'
}



// ECR-Interface ZVT-Protocol Revision 13.13, Date 14.03.2025
// Kapitel 9.4.1 Overview of tags used
var tlvStruct = {
    '01': { 'desc': 'reversal-ID' },
    '02': { 'desc': 'driver-number' },
    '03': { 'desc': 'auto-number' },
    '04': { 'desc': 'mileage' },
    '05': { 'desc': 'goods-group' },
    '06': { 'desc': 'restriction-code 1' },
    '07': { 'desc': 'text-lines', 'format': 'ASCII' },
    '08': { 'desc': 'receipt-number' },
    '09': { 'desc': 'attribute' },
    '0a': { 'desc': 'ZVT-command' },
    '0b': { 'desc': 'info-field' },
    '0c': { 'desc': 'info-field2' },
    '0d': { 'desc': 'restriction-code 2' },
    '0e': { 'desc': 'service-code' },
    '0f': { 'desc': 'assignment-number' },
    '10': { 'desc': 'number of columns and number of lines merchant-display' },
    '11': { 'desc': 'number of columns and number of lines customer-display' },
    '12': { 'desc': 'number of characters per line of the printer' },
    '13': { 'desc': 'extra result-code' },
    '14': { 'desc': 'ISO character set' },
    '15': { 'desc': 'Language-code' },
    '16': { 'desc': 'menu-type' },
    '17': { 'desc': 'context' },
    '18': { 'desc': 'destination' },
    '19': { 'desc': 'return-code' },
    '1a': { 'desc': 'maximum length of the APDU' },
    '1b': { 'desc': 'diagnosis-type' },
    '1c': { 'desc': 'file-block' },
    '1d': { 'desc': 'file-ID' },
    '1e': { 'desc': 'start-position' },
    '40': { 'desc': 'EMV-config-parameter' },
    '41': { 'desc': 'ZVT card-type-ID', format: 'zvtCardType' },
    '42': { 'desc': 'name of the application', 'format': 'ASCII' },
    '43': { 'desc': 'application-ID' },
    '44': { 'desc': 'application preferred name' },
    '45': { 'desc': 'receipt-parameter' },
    '46': { 'desc': 'EMV-print-data (customer-receipt)' },
    '47': { 'desc': 'EMV-print-data (merchant-receipt)' },
    '48': { 'desc': 'priority' },
    '49': { 'desc': 'network-operator card-type-ID' },
    '4a': { 'desc': 'DC POS 2.4 product display' },
    '4b': { 'desc': 'Issuer country code' },
    '4c': { 'desc': 'UID' },
    '4d': { 'desc': 'EF_ID GeldKarte girogo' },
    '4e': { 'desc': 'EMV PAR' },
    '50': { 'desc': 'Background-color' },
    '80': { 'desc': 'prepaid-PIN' },
    '81': { 'desc': 'telephone number' },
    '82': { 'desc': 'top-up text' },
    '83': { 'desc': 'prepaid type' },
    '84': { 'desc': 'minimal charge amount' },
    '85': { 'desc': 'maximal charge amount' },
    'c1': { 'desc': 'transaction-type' },
    'c2': { 'desc': 'number of bonus-points' },
    'c3': { 'desc': 'number of remaining bonus-points' },
    'c4': { 'desc': 'transaction-number of ECR' },
    'c5': { 'desc': 'Bonus points equivalent amount' },
    '1f00': { 'desc': 'total length of file' },
    '1f01': { 'desc': 'receipt-ID' },
    '1f02': { 'desc': 'from_TA-number' },
    '1f03': { 'desc': 'to_TA-number' },
    '1f04': { 'desc': 'receipt-parameter' },
    '1f05': { 'desc': 'transaction-parameter' },
    '1f06': { 'desc': 'reservation-parameter' },
    '1f07': { 'desc': 'receipt-type' },
    '1f08': { 'desc': 'data track 1 of the magnet-stripe' },
    '1f09': { 'desc': 'data track 2 of the magnet-stripe' },
    '1f0a': { 'desc': 'data track 3 of the magnet-stripe' },
    '1f0b': { 'desc': 'maximum pre-authorisation amount' },
    '1f0c': { 'desc': 'license plate number' },
    '1f0d': { 'desc': 'transparent data to host' },
    '1f0e': { 'desc': 'date' },
    '1f0f': { 'desc': 'time' },
    '1f10': { 'desc': 'cardholder authentication' },
    '1f11': { 'desc': 'online flag' },
    '1f12': { 'desc': 'card-technology' },
    '1f13': { 'desc': 'ECR function request' },
    '1f14': { 'desc': 'card identification item' },
    '1f15': { 'desc': 'card reading control' },
    '1f16': { 'desc': 'extended error code' },
    '1f17': { 'desc': 'extended error text', 'format': 'ASCII' },
    '1f18': { 'desc': 'card notification control' },
    '1f19': { 'desc': 'card acceptance' },
    '1f1a': { 'desc': 'PAN for card acceptance matching' },
    '1f1b': { 'desc': 'markup in % with 2 decimals' },
    '1f1c': { 'desc': 'card name' },
    '1f1d': { 'desc': 'currency information Type' },
    '1f1e': { 'desc': 'number of decimals' },
    '1f1f': { 'desc': 'Unique transaction identifier' },
    '1f20': { 'desc': 'Total amount' },
    '1f21': { 'desc': 'ISO currency code' },
    '1f22': { 'desc': 'Inverted rate display unit' },
    '1f23': { 'desc': 'Retrieval ID' },
    '1f24': { 'desc': 'Reference Number' },
    '1f25': { 'desc': 'Cashback Amount' },
    '1f26': { 'desc': 'End of Day mode' },
    '1f27': { 'desc': 'Extended product name (EuroELV DF8118)' },
    '1f28': { 'desc': 'Emergency mode (EuroELV)' },
    '1f29': { 'desc': 'Limit overridden (EuroELV)' },
    '1f2a': { 'desc': 'Additional card holder information (EuroELV DF8117)' },
    '1f2b': { 'desc': 'Trace number' },
    '1f2c': { 'desc': 'Profilename' },
    '1f2d': { 'desc': 'Card data input type' },
    '1f2e': { 'desc': 'Barcode type' },
    '1f2f': { 'desc': 'Product code' },
    '1f30': { 'desc': 'EPurse top up amount' },
    '1f31': { 'desc': 'Encrypted PIN' },
    '1f32': { 'desc': 'SMID value' },
    '1f33': { 'desc': 'Message data' },
    '1f34': { 'desc': 'MAC value' },
    '1f35': { 'desc': 'ECR Identification' },
    '1f36': { 'desc': 'TIP Amount' },
    '1f37': { 'desc': 'Receipt information' },
    '1f38': { 'desc': 'Input mode' },
    '1f39': { 'desc': 'Timeout' },
    '1f3a': { 'desc': 'Input result' },
    '1f3b': { 'desc': 'Transaction information' },
    '1f3c': { 'desc': 'Input' },
    '1f3d': { 'desc': 'Alphanumeric data' },
    '1f3e': { 'desc': 'Encrypted cardholder information' },
    '1f3f': { 'desc': 'Remaining balance' },
    '1f40': { 'desc': 'Device name', 'format': 'ASCII' },
    '1f41': { 'desc': 'Software version', 'format': 'ASCII' },
    '1f42': { 'desc': 'Serial number' },
    '1f43': { 'desc': 'Device state' },
    '1f44': { 'desc': 'Terminal identifier' },
    '1f45': { 'desc': 'ATS' },
    '1f46': { 'desc': 'Command APDUs' },
    '1f47': { 'desc': 'Card read error code' },
    '1f48': { 'desc': 'reserved' },
    '1f49': { 'desc': 'reserved' },
    '1f4a': { 'desc': 'reserved' },
    '1f4b': { 'desc': 'reserved' },
    '1f4c': { 'desc': 'Card type', format: 'Card_type' },
    '1f4d': { 'desc': 'Card subtype' },
    '1f4e': { 'desc': 'reserved' },
    '1f4f': { 'desc': 'MIFARE ATQA' },
    '1f50': { 'desc': 'MIFARE SAK' },
    '1f51': { 'desc': 'Debit mandate identifier' },
    '1f52': { 'desc': 'Debit creditor identifier' },
    '1f53': { 'desc': 'Debit pre-notification' },
    '1f54': { 'desc': 'Key generation number (GN)' },
    '1f55': { 'desc': 'Terminal locks' },
    '1f56': { 'desc': '4eye Customer identifier (CID)' },
    '1f57': { 'desc': 'Merchant SAM number' },
    '1f58': { 'desc': 'Merchant SAM expiry date' },
    '1f59': { 'desc': 'Payment application' },
    '1f5a': { 'desc': 'reserved' },
    '1f5b': { 'desc': 'Card poll timeout' },
    '1f5c': { 'desc': 'Encrypted key' },
    '1f5d': { 'desc': 'Plaintext key' },
    '1f5e': { 'desc': 'IBAN' },
    '1f5f': { 'desc': 'BIC' },
    '1f60': { 'desc': 'Allowed card technologies' },
    '1f61': { 'desc': 'Customer Index' },
    '1f62': { 'desc': 'BMP 60 identifier for the individual reference number' },
    '1f63': { 'desc': 'Individual reference number' },
    '1f64': { 'desc': 'Number of payments' },
    '1f65': { 'desc': 'Processing selection' },
    '1f66': { 'desc': 'Wallet data' },
    '1f67': { 'desc': 'Retailer identifier' },
    '1f68': { 'desc': 'Loyalty identifier' },
    '1f69': { 'desc': 'Voucher identifier' },
    '1f6a': { 'desc': 'Remaining Amount' },
    '1f6b': { 'desc': 'Age verification control' },
    '1f6c': { 'desc': 'Age verification result' },
    '1f6d': { 'desc': 'Mode control for command 06-E6' },
    '1f6e': { 'desc': 'Activation of status message 5E' },
    '1f6f': { 'desc': 'Payment type' },
    '1f70': { 'desc': 'Indicator for partial approval capability' },
    '1f71': { 'desc': 'TLV tags recognized by the PT' },
    '1f72': { 'desc': 'Extended CTLS card detection in status poll' },
    '1f73': { 'desc': 'Message sequence id (MsgSeqId)' },
    '1f74': { 'desc': 'Password' },
    '1f75': { 'desc': 'DUKPT encrypted input' },
    '1f76': { 'desc': 'Send tag 1F32, SMID of the DUKPT key ' },
    '1f77': { 'desc': 'Index of DUKPT engine' },
    '1f78': { 'desc': 'Request to send the 24 hour reboot information' },
    '1f79': { 'desc': 'Request to start an action' },
    '1f7a': { 'desc': 'Filename optional including path information' },
    '1f7b': { 'desc': 'MIME type of the file' },
    '1f7c': { 'desc': 'Wake sources' },
    '1f7d': { 'desc': 'Idle time' },
    '1f7e': { 'desc': 'Idle apps' },

    '9f5a': { 'desc': 'Membership Product Identifier' },
    '9f5b': { 'desc': 'Product Membership Number' },

    '1f8000': { 'desc': 'Indicator for purchase only approval' },
    '1f8001': { 'desc': 'IP address' },
    '1f8003': { 'desc': 'Indicator for partial reconciliation' },
    '1f8004': { 'desc': 'UAT indicator' },
    '1f8005': { 'desc': 'Set external modem' },
    '1f8006': { 'desc': 'ALIPAY_TRADE_ID' },
    '1f8007': { 'desc': 'Online Card Hash' },
    '1f8008': { 'desc': 'Online card reference' },
    '1f8009': { 'desc': 'HID PACS' },
    '1f800a': { 'desc': 'Image data persistence specifier' },
    '1f800b': { 'desc': 'Accessibillity mode on/off' },
    '1f800c': { 'desc': 'Accessibillity mode selection' },
    '1f800d': { 'desc': 'Color mode' },
    '1f800e': { 'desc': 'Audio volume' },
    '1f800f': { 'desc': 'QRpay card schema selection identifier' },
    '1f8010': { 'desc': 'QRpay reference identifier for refunds' },

    'ff01': { 'desc': 'Coupon data' },
    'ff02': { 'desc': 'Loyalty data' },
    'ff03': { 'desc': 'Parking ticket' },
    'ff04': { 'desc': 'Voucher data' },

    'df02': { 'desc': 'LS-Id' },
    'df03': { 'desc': 'LS-Text' },
    'df08': { 'desc': 'LS-Message-Type' },
    'df09': { 'desc': 'LS-Customer-No' },
    'df0a': { 'desc': 'LS-DSGVO-Flag' },
    'df0b': { 'desc': 'LS-DSGVO-Timestamp' },
    'df0c': { 'desc': 'LS-DSGVO-Location' },
    'df0d': { 'desc': 'LS-User-Flags' },
    'df0e': { 'desc': 'LS-AC' },

    '20': { 'desc': 'fleet-card container' },
    '21': { 'desc': 'list of permitted goods-groups' },
    '22': { 'desc': 'list of prohibited goods-groups' },
    '23': { 'desc': 'list of open pre-authorisations' },
    '24': { 'desc': 'display-texts', 'format': 'ASCII' },
    '25': { 'desc': 'print-texts', 'format': 'ASCII' },
    '26': { 'desc': 'list of permitted ZVT-Commands' },
    '27': { 'desc': 'list of supported character-sets' },
    '28': { 'desc': 'list of supported languages' },
    '29': { 'desc': 'list of menus' },
    '2a': { 'desc': 'list of menus' },
    '2b': { 'desc': 'menu' },
    '2c': { 'desc': 'menu-point' },
    '2d': { 'desc': 'file' },
    '2e': { 'desc': 'time-stamp' },
    '2f': { 'desc': 'payment-type' },
    '30': { 'desc': 'card acceptance matching, container' },
    '31': { 'desc': 'amount information' },
    '32': { 'desc': 'input container' },
    '33': { 'desc': 'DUKPT key container' },
    '34': { 'desc': 'Terminal date time' },
    '35': { 'desc': '24 hour reboot date time' },
    '36': { 'desc': 'Audio-texts' },
    '60': { 'desc': 'application' },
    '61': { 'desc': 'list of applications on magnet-stripe' },
    '62': { 'desc': 'list of applications on chip' },
    '63': { 'desc': 'prepaid-container' },
    '64': { 'desc': 'receipt header' },
    '65': { 'desc': 'receipt advertising text' },
    '66': { 'desc': 'receipt customer copy' },
    '67': { 'desc': 'receipt merchant copy' },
    '68': { 'desc': 'receipt transaction outcome' },
    '69': { 'desc': 'reference transaction' },
    '6a': { 'desc': 'invalid application' },
    'e1': { 'desc': 'bonus-points container' },
    'e2': { 'desc': 'DCC container' },
    'e3': { 'desc': 'Barcode Container' },
    'e4': { 'desc': 'Device information container' },
    'e5': { 'desc': 'Key Container' },
    'e6': { 'desc': 'Card type container' },
    'e7': { 'desc': 'Merchant SAM information container' },
    'e8': { 'desc': 'Value added services container' },
    'e9': { 'desc': 'Reference number container' },
    'ea': { 'desc': 'ExpressPay Membership data' },
    'eb': { 'desc': 'Power Management' },
    'ec': { 'desc': 'Container for End-of-day detailed data' },
    'ed': { 'desc': 'Container for End-of-day detailed data about one host' },
    'ee': { 'desc': 'Container for End-of-day detailed data about all hosts' },
    'ef': { 'desc': 'LS-Transaction-Data' },
    'f0': { 'desc': 'LS-Transaction-Data-Record' }
};

function getTlvLength(hex, tlvStart) {
    let tlvLength = {};

    let valueLen = parseInt(hex.substr(tlvStart, 2), 16);
    tlvLength['len'] = 2;
    tlvLength['valueLen'] = valueLen;

    if (valueLen <= 127) {
        //fieldLen = valueLen;
        tlvLength['valueLen'] = valueLen;
    } else if (valueLen == 129) {
        //one length-byte follows
        tlvLength['valueLen'] = parseInt(hex.substr(tlvStart, 2), 16);
        tlvLength['len'] += 2;
    } else if (valueLen == 130) {
        //tow length-byte follows
        let valueLenHigh = parseInt(hex.substr(tlvStart, 2), 16);
        tlvLength['len'] += 2;
        tlvStart += 2;
        let valueLenLow = parseInt(hex.substr(tlvStart, 2), 16);
        tlvLength['len'] += 2;
        //fieldLen = (valueLenHigh * 255) + valueLenLow;
        tlvLength['valueLen'] = (valueLenHigh * 255) + valueLenLow;;
    } else {
        // ERROR: valueLen not defined
        console.error('valueLen not defined: ' + valueLen);
        tlvLength['len'] = 1000;
        tlvLength['valueLen'] = 1000;
    }
    console.log('tlvLength ' + JSON.stringify(tlvLength));
    return tlvLength;
}

function getTlvTag(hex, tlvStart) {
    let tlvTagInfo = {
        tagNr: 0,
        bez: 'unknown',
        len: 0
    };

    // Read first tag byte
    let tag = hex.substr(tlvStart, 2);
    let firstByte = parseInt(tag, 16);
    tlvStart += 2;
    tlvTagInfo.len = 2;

    let tagNr = firstByte;

    // Check if this is a multi-byte tag (low 5 bits = 0x1F)
    if ((firstByte & 0x1F) === 0x1F) {
        // Multi-byte tag – keep reading until a byte with MSB = 0 is found
        while (true) {
            let nextByteHex = hex.substr(tlvStart, 2);
            if (!nextByteHex) {
                throw new Error("Invalid TLV tag: unexpected end during multi-byte tag processing");
            }

            let nextByte = parseInt(nextByteHex, 16);
            tag += nextByteHex;
            tlvStart += 2;
            tlvTagInfo.len += 2;

            // Append next byte value to tag number (shift left by 8 bits)
            tagNr = (tagNr << 8) | nextByte;

            // Stop when MSB (bit 8) = 0 (last byte of the tag)
            if ((nextByte & 0x80) === 0) {
                break;
            }
        }
    }

    // Check if the data object is constructed (bit 6 = 1)
    const constructedDataObject = (firstByte & 0x20) !== 0;
    tlvTagInfo['tag'] = tag;
    tlvTagInfo['tagNr'] = tagNr;
    tlvTagInfo['constructedDataObject'] = constructedDataObject;

    if (tag in tlvStruct) {
        tlvTagInfo['desc'] = tlvStruct[tag]['desc'];
        if ('format' in tlvStruct[tag]) {
            tlvTagInfo['format'] = tlvStruct[tag]['format'];
        }
    }

//    console.log('getTlvTag tag ' + tag + ' tagNr:' + tagNr + ' Bits: ' + tagNr.toString(2) + ' tlvTagInfo: ' + JSON.stringify(tlvTagInfo));

    return tlvTagInfo;
}

function getTLVBmpInfo(hex, tlvStart, absOff) {
    console.log('getTLVBmpInfo tlvStart:' + tlvStart + ' hex ' + hex);
    let items = [];

    let hasMore = true;
    while (hasMore) {
        let tlv = {};
        let tagHexStart = tlvStart;
        let tagInfo = getTlvTag(hex, tlvStart);
        tlvStart += tagInfo['len'];

        let tag = tagInfo['tag'];

        tlv[tag] = {};
        tlv[tag]['desc'] = tagInfo['desc'];

        if (tagInfo['desc'] == 'unknown') {
            console.error('unknown TLV tag: ' + tag);
        } else {
            tlv[tag]['desc'] = tagInfo['desc'];
        }
        //if (tag in tlvStruct) {
        //    tlv[tag]['desc'] = tlvStruct[tag]['desc'];
        //}

        let tlvLength = getTlvLength(hex, tlvStart);

        let valueLen = tlvLength['valueLen'];
        if (isNaN(valueLen) !== false) {
            console.error('unknown TLV length: ' + valueLen);
            hasMore = false;
        }

        tlvStart += tlvLength['len'];

        tlv[tag]['valueLen'] = valueLen;
        tlv[tag]['val'] = hex.substr(tlvStart, 2 * valueLen);

        //console.log('tlv tag ' + tag + ' (len ' + tlvLength['len'] + ') valueLen:' + valueLen + 'val ' + tlv[tag]['val']  +' tlvStart:'+tlvStart);

        if (tagInfo['constructedDataObject']) {
            //console.log('tag ' + tag + ' constructedDataObject tlvStart:' + tlvStart);
            tlv[tag]['val2'] = [];
            let hex2 = hex.substr(tlvStart, 2 * valueLen)

            let tlv2 = getTLVBmpInfo(hex2, 0, (absOff || 0) + tlvStart / 2);
            tlvStart += hex2.length;
            //console.log('tag ' + tag + ' constructedDataObject hex2.leng:' +hex2.length+'  tlvStart: ' +tlvStart);
            //console.log('getTLVBmpInfo val2.push :' + JSON.stringify(tlv2));
            tlv[tag]['val2'].push(tlv2);
            //console.log('constructedDataObject tag ' + tag + '  tlvStart: ' + tlvStart + ' ml: ' + hex.length  +' valueLen:'+valueLen);

            if (isNaN(tlvStart) !== false) {
                console.error('tlvStart invalid');
                hasMore = false;
            }
            if (tlvStart >= hex.length) {
                hasMore = false;
            }
        } else {


            if ('format' in tagInfo) {
                let val = tlv[tag]['val'];
                if (tagInfo['format'] == 'ASCII') {
                    tlv[tag]['format'] = tagInfo['format'];

                    var str = '';
                    for (var i = 0; i < val.length; i += 2) {
                        str += String.fromCharCode(parseInt(val.substr(i, 2), 16));
                    }
                    tlv[tag]['val'] = str;

                } else if (tagInfo['format'] == 'zvtCardType') {
                    let valNum = parseInt(val, 16);
                    console.error("val:" + val + " valNum:" + valNum);
                    if (valNum in zvtCardType) {
                        tlv[tag]['valDesc'] = zvtCardType[valNum];
                    }
                } else if (tagInfo['format'] == 'Card_type') {
                    switch (val) {
                        case "00":
                            tlv[tag]['valDesc'] = " ISO 7816-4";
                            break;
                        case "01":
                            tlv[tag]['valDesc'] = " MIFARE";
                            break;
                        case "02":
                            tlv[tag]['valDesc'] = " FeliCa";
                            break;
                    }
                }
            }





            tlvStart += (2 * valueLen);
            //console.log('primitiveDataObject tag ' + tag + ' tlvStart: ' + tlvStart + ' ml: ' + hex.length);
            if (tlvStart >= hex.length) {
                hasMore = false;
            }
        }

        tlv[tag]['_hexStart'] = (absOff || 0) + tagHexStart / 2;
        tlv[tag]['_hexLen']   = (tlvStart - tagHexStart) / 2;
        //console.log('getTLVBmpInfo items.push :' + JSON.stringify(tlv));
        items.push(tlv);
    }

    //console.log('getTLVBmpInfo return :' + JSON.stringify(items));
    return items;
}

function getZvtBmpInfo(hex, start, warnings) {
    console.info('getZvtBmpInfo(' + hex + ', ' + start + ')');
    let bmps = {};
    let keepParsing = true;
    while (keepParsing) {
        let bmpHexStart = start;
        let bmp = hex.substr(start, 2);
        start += 2;

        if (bmp.length == 0) {
            keepParsing = false;
            break;
        }
        console.log("bmp: " + bmp);
        bmps[bmp] = {};
        if (bmp in bmpStruct) {
            if (bmp == "00") {
                console.error('BMP 00 ????');
            }
            bmps[bmp]['desc'] = bmpStruct[bmp]['desc'];
            let fieldLen = bmpStruct[bmp]['length'];
            bmps[bmp]['format'] = bmpStruct[bmp]['format'];
            if (fieldLen == 'LL') {
                // 1-byte binary length (0–255)
                fieldLen = parseInt(hex.substr(start, 2), 16);
                start += 2;
            } else if (fieldLen == 'LLL') {
                // 2-byte big-endian binary length (0–65535)
                fieldLen = parseInt(hex.substr(start, 4), 16);
                start += 4;
            } else if (fieldLen == 'TLV') {

                let tlvLength = getTlvLength(hex, start);
                start += tlvLength['len'];
                let valueLen = tlvLength['valueLen'];
                fieldLen = valueLen;
                let val = hex.substr(start);
                bmps[bmp]['val'] = val;
            }

            bmps[bmp]['length'] = fieldLen;
            if (isNaN(fieldLen) !== false) {
                console.error('unknown BMP length: ' + fieldLen);
                warnings.push('unknown BMP length: ' + fieldLen);
                break;
            }

            if (bmpStruct[bmp]['format'] == 'binary') {
                fieldLen = 2 * fieldLen;
                let val = hex.substr(start, fieldLen);
                start += fieldLen;
                bmps[bmp]['val'] = val;

                if (bmp == '27') {
                    //Result Code
                    if (val in errorMessage) {
                        bmps[bmp]['valDesc'] = errorMessage[val];
                    }
                }


            } else if (bmpStruct[bmp]['format'] == 'bcd') {
                fieldLen = 2 * fieldLen;
                let val = hex.substr(start, fieldLen);
                start += fieldLen;
                bmps[bmp]['val'] = val;

                if (bmp == '04') {
                    //amount in x.xx Format wandeln
                    let amount = parseInt(val);
                    if (isNaN(amount) === false) {
                        bmps[bmp]['val'] = (amount / 100).toFixed(2);
                    }
                }
            } else if (bmpStruct[bmp]['format'] == 'ASCII') {
                fieldLen = 2 * fieldLen;
                let val = hex.substr(start, fieldLen);
                start += fieldLen;

                var str = '';
                for (var i = 0; i < val.length; i += 2) {
                    str += String.fromCharCode(parseInt(val.substr(i, 2), 16));
                }
                bmps[bmp]['val'] = str;
            } else if (bmpStruct[bmp]['format'] == 'TLVcontainer') {
                fieldLen = 2 * fieldLen;
                let tlv = getTLVBmpInfo(hex.substr(start), 0, start / 2);

                console.log('start = start (' + start + ') + fieldLen (' + fieldLen + ')');
                start += fieldLen;

                bmps[bmp]['tlv'] = tlv;

            } else {
                bmps[bmp]['ERROR'] = 'unknown BMP format';
                warnings.push('unknown BMP format: ' + bmp);
            }
            bmps[bmp]['_hexStart'] = bmpHexStart / 2;
            bmps[bmp]['_hexLen']   = (start - bmpHexStart) / 2;
        } else {
            warnings.push('unknown BMP: ' + bmp);
            bmps[bmp]['ERROR'] = 'unknown BMP';
            bmps[bmp]['_hexStart'] = bmpHexStart / 2;
            keepParsing = false;
        }
    }
    return bmps;
}

// Intermediate-status descriptions (Table 17). Declared here so cmdPrefixHandlers can reference it.
var istatusDesc = null;

// Command-specific prefix handlers.
// Parses fixed-format bytes (password, result-code, status-byte, …) that precede the BMP field list.
// Signature: (hex, bmpstart, zvtMessage) → new bmpstart
var cmdPrefixHandlers = (function () {

    function withPasswordPrefix(m, pos, msg) {
        if (m.length > 11) {
            msg['password'] = m.substr(6, 6);
            msg['_hexStart_password'] = 3; msg['_hexLen_password'] = 3;
            pos += 6;
        }
        return pos;
    }

    var handlers = {};

    handlers['0600'] = function (m, pos, msg) {
        // <password>(3B) <config-byte>(1B) <CC>(2B)
        if (m.length > 12) {
            msg['password'] = m.substr(6, 6);
            msg['_hexStart_password'] = 3; msg['_hexLen_password'] = 3;
        }
        if (m.length > 14) {
            msg['config-byte'] = m.substr(12, 2);
            msg['_hexStart_config-byte'] = 6; msg['_hexLen_config-byte'] = 1;
            msg['CC'] = m.substr(14, 4);
            msg['_hexStart_CC'] = 7; msg['_hexLen_CC'] = 2;
            pos += 12;
        }
        return pos;
    };

    handlers['0612'] = function (m, pos, msg) {
        // <password>(3B) <from-receipt>(3B) [<to-receipt>(3B)]
        pos = withPasswordPrefix(m, pos, msg);
        if (m.length > 17) {
            msg['from-receipt'] = m.substr(12, 6);
            msg['_hexStart_from-receipt'] = 6; msg['_hexLen_from-receipt'] = 3;
            pos += 6;
        }
        if (m.length > 23) {
            msg['to-receipt'] = m.substr(18, 6);
            msg['_hexStart_to-receipt'] = 9; msg['_hexLen_to-receipt'] = 3;
            pos += 6;
        }
        return pos;
    };

    handlers['060f'] = function (m, pos, msg) {
        // result-code is only present when first data byte is not a known BMP tag
        var firstDataByte = m.substr(6, 2);
        if (!(firstDataByte in bmpStruct)) {
            pos += 2;
            msg['result'] = { 'code': firstDataByte, '_hexStart': 3, '_hexLen': 1 };
            if (firstDataByte in errorMessage) msg['result']['desc'] = errorMessage[firstDataByte];
        }
        return pos;
    };

    handlers['061e'] = function (m, pos, msg) {
        var resultcode = m.substr(6, 2);
        pos += 2;
        msg['result'] = { 'code': resultcode, '_hexStart': 3, '_hexLen': 1 };
        if (resultcode in errorMessage) msg['result']['desc'] = errorMessage[resultcode];
        return pos;
    };

    handlers['04ff'] = function (m, pos, msg) {
        var istatus = m.substr(6, 2);
        msg['status'] = { 'code': istatus, '_hexStart': 3, '_hexLen': 1 };
        pos += 2;
        if (istatus in istatusDesc) {
            msg['status']['desc'] = istatusDesc[istatus]['desc'];
            if (istatusDesc[istatus]['error']) msg['error'] = istatusDesc[istatus]['desc'];
        }
        if (m.length >= 10) {
            msg['timeout'] = m.substr(8, 2);
            msg['_hexStart_timeout'] = 4; msg['_hexLen_timeout'] = 1;
            pos += 2;
        }
        return pos;
    };

    // Commands that start with a 3-byte BCD password followed by standard BMPs
    ['0650', '0630', '0620', '0631', '0651', '0652', '0691', '0693'].forEach(function (c) {
        handlers[c] = withPasswordPrefix;
    });

    return handlers;
})();

function getZvtMessage(hex) {
    hex = hex.toLowerCase().replace(/\s/g, '');

    if (hex.startsWith("1002")) {
        let result = "";
        // Remove "1002" from the beginning
        hex = hex.slice(4);

        // Cut off everything from the first occurrence of "1003" (including it)
        const cutIndex = hex.indexOf("1003");
        if (cutIndex !== -1) {
            hex = hex.slice(0, cutIndex);
        }

        // Replace "1010" with "10" at even positions
        let i = 0;
        while (i < hex.length) {
            if (i % 2 === 0 && hex.slice(i, i + 4) === "1010") {
                result += "10";
                i += 4;
            } else {
                result += hex[i];
                i += 1;
            }
        }
        hex = result;
    }

    if (!istatusDesc) istatusDesc = {
        '00': { 'desc': 'PT is waiting for amount-confirmation' },
        '01': { 'desc': 'Please watch PIN-Pad.' },
        '02': { 'desc': 'Please watch PIN-Pad' },
        '03': { 'desc': 'Not accepted', 'error': true },
        '04': { 'desc': 'PT is waiting for response from FEP' },
        '05': { 'desc': 'PT is sending auto-reversal' },
        '06': { 'desc': 'PT is sending post-bookings' },
        '07': { 'desc': 'Card not admitted', 'error': true },
        '08': { 'desc': 'Card unknown / undefined', 'error': true },
        '09': { 'desc': 'Expired card', 'error': true },
        '0a': { 'desc': 'Insert card' },
        '0b': { 'desc': 'Please remove card!' },
        '0c': { 'desc': 'Card not readable', 'error': true },
        '0d': { 'desc': 'Processing error', 'error': true },
        '0e': { 'desc': 'Please wait...' },
        '0f': { 'desc': 'PT is commencing an automatic end-of-day batch' },
        '10': { 'desc': 'Invalid card', 'error': true },
        '11': { 'desc': 'Balance display' },
        '12': { 'desc': 'System malfunction', 'error': true },
        '13': { 'desc': 'Payment not possible', 'error': true },
        '14': { 'desc': 'Credit not sufficient', 'error': true },
        '15': { 'desc': 'Incorrect PIN', 'error': true },
        '16': { 'desc': 'Limit not sufficient' },
        '17': { 'desc': 'Please wait...' },
        '18': { 'desc': 'PIN try limit exceeded', 'error': true },
        '19': { 'desc': 'Card-data incorrect', 'error': true },
        '1a': { 'desc': 'Service-mode' },
        '1b': { 'desc': 'Approved. Please fill-up' },
        '1c': { 'desc': 'Approved. Please take goods' },
        '1d': { 'desc': 'Declined', 'error': true },
        '26': { 'desc': 'PT is waiting for input of the mobile-number' },
        '27': { 'desc': 'PT is waiting for repeat of mobile number' },
        '28': { 'desc': 'Currency selection, please wait...' },
        '29': { 'desc': 'Language selection, please wait...' },
        '2a': { 'desc': 'For loading please insert card' },
        '2b': { 'desc': 'Emergency transaction, please wait' },
        '2c': { 'desc': 'Application selection, please wait' },
        '41': { 'desc': 'Please watch PIN-Pad / Please remove card!' },
        '42': { 'desc': 'Please watch PIN-Pad / Please remove card!' },
        '43': { 'desc': 'Not accepted / Please remove card!', 'error': true },
        '44': { 'desc': 'PT is waiting for response from FEP / Please remove card!' },
        '45': { 'desc': 'PT is sending auto-reversal / Please remove card!' },
        '46': { 'desc': 'PT is sending post-booking / Please remove card!' },
        '47': { 'desc': 'Card not admitted / Please remove card!', 'error': true },
        '48': { 'desc': 'Card unknown / undefined / Please remove card!', 'error': true },
        '49': { 'desc': 'Expired card / Please remove card!', 'error': true },
        '4a': { 'desc': 'Please remove card!' },
        '4b': { 'desc': 'Please remove card!' },
        '4c': { 'desc': 'Card not readable / Please remove card!', 'error': true },
        '4d': { 'desc': 'Processing error / Please remove card!', 'error': true },
        '4e': { 'desc': 'Please wait / Please remove card!' },
        '4f': { 'desc': 'PT is commencing an automatic end-of-day batch / Please remove card!' },
        '50': { 'desc': 'Invalid card / Please remove card!', 'error': true },
        '51': { 'desc': 'Balance display / Please remove card!' },
        '52': { 'desc': 'System malfunction / Please remove card!', 'error': true },
        '53': { 'desc': 'Payment not possible / Please remove card!', 'error': true },
        '54': { 'desc': 'Credit not sufficient / Please remove card!' },
        '55': { 'desc': 'Incorrect PIN / Please remove card!', 'error': true },
        '56': { 'desc': 'Limit not sufficient / Please remove card!' },
        '57': { 'desc': 'Please wait... / Please remove card!' },
        '58': { 'desc': 'PIN try limit exceeded / Please remove card!', 'error': true },
        '59': { 'desc': 'Card-data incorrect / Please remove card!', 'error': true },
        '5a': { 'desc': 'Service-mode / Please remove card!' },
        '5b': { 'desc': 'Approved. Please fill-up / Please remove card!' },
        '5c': { 'desc': 'Approved. Please take goods / Please remove card!', 'error': true },
        '5d': { 'desc': 'Declined / Please remove card!', 'error': true },
        '5e': { 'desc': 'Signal of Contactless Card access finished (2.contactless LED)' },
        '66': { 'desc': 'PT is waiting for input of the mobile-number / Please remove card!' },
        '67': { 'desc': 'PT is waiting for repeat of the mobile-number / Please remove card!' },
        '68': { 'desc': 'PT has detected customer card insertion' },
        '69': { 'desc': 'Please select DCC' },
        '6a': { 'desc': 'PIN digit entered' },
        '6b': { 'desc': 'PIN digit entered, confirmation possible' },
        '6c': { 'desc': 'Correction key entered, last digit deleted.' },
        '6d': { 'desc': 'PIN entered' },
        'c7': { 'desc': 'PT is waiting for input of the mileage' },
        'c8': { 'desc': 'PT is waiting for cashier' },
        'c9': { 'desc': 'PT is commencing an automatic diagnosis' },
        'ca': { 'desc': 'PT is commencing an automatic initialisation' },
        'cb': { 'desc': 'Merchant-journal full' },
        'cc': { 'desc': 'Debit advice not possible, PIN required' },
        'd2': { 'desc': 'Connecting dial-up' },
        'd3': { 'desc': 'Dial-up connection made' },
        'e0': { 'desc': 'PT is waiting for application-selection' },
        'e1': { 'desc': 'PT is waiting for language-selection' },
        'e2': { 'desc': 'PT requests to use the cleaning card' },
        'f1': { 'desc': 'Offline' },
        'f2': { 'desc': 'Online' },
        'f3': { 'desc': 'Offline transaction' },
        'ff': { 'desc': 'no appropriate ZVT status code matches' }
    }

    let zvtMessage = {};
    let ccrc = hex.substr(0, 2);
    let aprc = hex.substr(2, 2);

    zvtMessage['ccrc'] = ccrc;
    zvtMessage['aprc'] = aprc;
    let cmd = ccrc + aprc;
    if (cmd in zvtCommands) {
        console.log('zvtCommands exist:  ' + cmd);
        zvtMessage['command'] = zvtCommands[cmd]['desc'];

        let bmpstart = 'bmpstartDefault' in zvtCommands[cmd]
            ? zvtCommands[cmd]['bmpstartDefault']
            : 6;

        zvtMessage['msglen'] = hex.length;
        let lengthValue = parseInt(hex.substr(4, 2), 16);
        if (lengthValue == 255) {
            // Extended length field
            bmpstart += 4;
            lengthValue = parseInt(hex.substr(6, 4), 16);
        }
        zvtMessage['length'] = lengthValue;

        if (cmd in cmdPrefixHandlers) {
            bmpstart = cmdPrefixHandlers[cmd](hex, bmpstart, zvtMessage);
        }

        if (bmpstart) {
            let warnings = [];
            zvtMessage['bmp'] = getZvtBmpInfo(hex, bmpstart, warnings);
            if (warnings.length > 0) zvtMessage['warnings'] = warnings;
        }
    }
    return zvtMessage;
}

window.getZvtMessage = getZvtMessage;
