export const messages = [
  "Hari ini kamu dapet gacha dan sayang 161116111611 kali dari apit 😻",
  "dari mata turun ke hati? apit liat dedey mau dari mata, hidung, mulut, pipi semua turun ke hati apitt 💗💗",
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
