export const messages = [
  "Waktu paling berharga yang aku punya adalah waktu yang apit habiskan bersama dedey 🕰️",
  "Capek boleh, tapi jangan lupa kamu dicintai dengan sepenuh hati ya 💌",
  "Makasih ya, udah mau jadi bagian dari cerita hidupku yang paling aku sukai 🌸",
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
