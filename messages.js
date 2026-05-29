export const messages = [
  "Perahu apa yang bisa bawa kita ke bahtera yang lebih besar kak? 😞💗",
  "Pengen peluk tapi jauh, but i offer you peluk jauh 🤗",
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
