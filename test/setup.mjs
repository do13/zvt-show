// Load zvt.mjs as a plain script into the jsdom window.
// The file is not an ES module (no exports), it sets window.getZvtMessage.
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { runInThisContext } from 'vm'

const __dirname = dirname(fileURLToPath(import.meta.url))
const src = readFileSync(join(__dirname, '../zvt.mjs'), 'utf8')

// Execute in this context so that window (= jsdom globalThis) is reachable
runInThisContext(src)
