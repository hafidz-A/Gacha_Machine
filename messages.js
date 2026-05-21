export const messages = [
  "Dedey sayang semangat kerjanya yaa! sebentar lagi pulang ke palembang🤗🫶",
  "Dari sekian banyak orang di dunia ini, hati aku malah milih kamu dan aku nggak menyesal sama sekali. 🩷",
  "Spin pertama mungkin keberuntungan, tapi bertahan sama kamu itu pilihan.💎",
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
