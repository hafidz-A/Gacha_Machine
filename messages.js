export const messages = [
  "tiap hari aku kaya dapet hadiah, kamu udah jadi surprise aku tiap hari 🎁💐",
  "kamu masih kalah sama hammilton dan schumander. soalnya kamu menangin hati apit tiap harii🤏🏼🫶🏻🐥",
  "my 3 most favourites word: apit sayang dedey"
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
