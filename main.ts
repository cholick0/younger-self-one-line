import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "That haircut you are hiding under a cap will grow out, kid — but the apology you owe your mother will not, so say it tonight.";

const OUT_PATH = "/output/entry.txt";
const MIN_CHARS = 1;
const MAX_CHARS = 200;
const SENTENCE_END = /[.!?]$/;

function validateEntry(text: string): void {
  if (text.length < MIN_CHARS || text.length > MAX_CHARS) {
    throw new Error(
      `entry must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${text.length}`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  if (text !== text.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  if (text.includes("  ")) {
    throw new Error("entry must not contain double spaces");
  }
  if (!SENTENCE_END.test(text)) {
    throw new Error("entry must end with terminal punctuation");
  }
}

function main(): void {
  validateEntry(ENTRY);
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUT_PATH, ENTRY, "utf8");
  const readBack = readFileSync(OUT_PATH, "utf8");
  if (readBack !== ENTRY) {
    throw new Error("read-back mismatch: entry.txt differs from ENTRY");
  }
  console.log(`wrote ${readBack.length} chars to ${OUT_PATH}`);
}

main();
