export const messages = [
  "tictactoe! omg i love you 🥰",
  "dedey kayanya cocok kl jadi taylor swift, soalnya aku london boy nya🫰🤓😖😽"
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
