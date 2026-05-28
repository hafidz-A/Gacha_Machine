export const messages = [
  "Jangan gerak! Kamu sudah dikepung oleh cintaku dari segala arah.🤗🥰",
  "PERINGATAN! Kamu kena denda satu pelukan ekstra karena hari ini terdeteksi terlalu gemas.🤏🤏🤏🤏🤏",
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
