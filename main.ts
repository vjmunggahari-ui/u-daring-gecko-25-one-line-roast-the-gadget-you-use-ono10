// One-Line Roast: The Gadget You Use Every Day
// Writes the entry line to /output/entry.txt (MAKEFUN_OUTPUT_DIR when set,
// otherwise a local output/ dir next to this file).
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const LINE =
  "My robot vacuum mapped my whole house perfectly, then chose the one gap it can't fit through as its forever home.";

const root = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR || join(root, "output");
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Self-check: one line, UTF-8, 1-200 chars, not only whitespace.
const back = readFileSync(outPath, "utf8");
const bytes = Buffer.byteLength(back, "utf8");
if (back !== LINE) throw new Error("read-back mismatch");
if (back.includes("\n")) throw new Error("entry must be a single line");
if (bytes < 1 || bytes > 200) throw new Error(`entry must be 1-200 chars, got ${bytes}`);
if (!back.trim()) throw new Error("entry must not be only whitespace");
// Extended read-back: byte-level second read, exact length, no trailing space.
const raw = readFileSync(outPath);
if (raw.length !== bytes) throw new Error("byte read-back length mismatch");
if (!raw.equals(Buffer.from(LINE, "utf8"))) throw new Error("byte read-back mismatch");
if (back.length !== 113) throw new Error(`expected exactly 113 chars, got ${back.length}`);
if (back !== back.trimEnd()) throw new Error("entry must not end with whitespace");
console.log(`wrote entry.txt (${back.length} chars, ${bytes} bytes)`);
