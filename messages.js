export const messages = [
  "dedeyy makin hari makin disayang apit lhoo🥰💗😖😖😖😖😖",
  "tidak ada hari tanpa sayang dedeyy💯💯😎😘",
  "4 kata baru kita -> apit sayang dedey muah😽😽😽😽😽😽😽😽😽😽😽😽😽😽😽😽"
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
