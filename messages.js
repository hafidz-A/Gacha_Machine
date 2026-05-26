export const messages = [
  "Kalau ada kata lebih daripada cantik, apit yakin dedey bisa dideskripsiin pake kata itu",
  "Semangat puasanya yaa 🌸",
];

export const openedMessages = new Set();

export function getRandomMessage(random = Math.random) {
  if (openedMessages.size >= messages.length) {
    openedMessages.clear();
  }

  const unopenedMessages = messages.filter((message) => !openedMessages.has(message));
  const selectedMessage = unopenedMessages[Math.floor(random() * unopenedMessages.length)];
  openedMessages.add(selectedMessage);
  return selectedMessage;
}
