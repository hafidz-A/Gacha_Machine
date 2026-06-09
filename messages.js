export const messages = [
  "Aku sadar kalo aku udah mulai kebiasa buat tidur ditemenin kamu lewat call, aku seneng dan ga nyangka akan bareng sama dedey🥺",
  "melow... kalau bisa kata itu diotak atik maka akan begini alurnya (melovv) -> (me lov u)... love you sayang🫶💘"
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
