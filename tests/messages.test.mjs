import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const messageModule = await import(`../messages.js?test=${Date.now()}`);
const { messages, getRandomMessage, openedMessages } = messageModule;

assert.ok(Array.isArray(messages), "messages should be an array");
assert.ok(messages.length >= 15, "messages should contain at least 15 entries");
assert.ok(
  messages.every((message) => typeof message === "string" && message.trim().length > 8),
  "every message should be a meaningful string",
);

assert.ok(openedMessages instanceof Set, "openedMessages should track messages opened in this session");

openedMessages.clear();
const pulledWithoutRepeats = Array.from({ length: messages.length }, () => getRandomMessage(() => 0));

assert.equal(
  new Set(pulledWithoutRepeats).size,
  messages.length,
  "messages should not repeat until every message has been opened",
);
assert.deepEqual(
  pulledWithoutRepeats,
  messages,
  "when random picks the first slot, selector should keep moving to the next unopened message",
);
assert.equal(openedMessages.size, messages.length, "openedMessages should contain every opened message");

const nextCycleMessage = getRandomMessage(() => 0);
assert.equal(nextCycleMessage, messages[0], "after all messages are opened, a new in-memory cycle can begin");
assert.equal(openedMessages.size, 1, "new cycle should restart openedMessages tracking");

openedMessages.clear();
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
