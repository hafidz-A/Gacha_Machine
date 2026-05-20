import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { messages, getRandomMessage } from "../messages.js";

assert.ok(Array.isArray(messages), "messages should be an array");
assert.ok(messages.length >= 15, "messages should contain at least 15 entries");
assert.ok(
  messages.every((message) => typeof message === "string" && message.trim().length > 8),
  "every message should be a meaningful string",
);

const seen = new Set(Array.from({ length: 60 }, () => getRandomMessage()));

assert.ok(seen.size > 1, "random message selector should return varied messages");
assert.ok(
  [...seen].every((message) => messages.includes(message)),
  "random message selector should only return configured messages",
);

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");

assert.match(html, /id="barba-wrapper"/, "index should include the Barba wrapper");
assert.match(html, /id="scene-canvas"/, "index should include the Three.js canvas");
assert.match(html, /type="importmap"/, "index should use an importmap for CDN modules");
