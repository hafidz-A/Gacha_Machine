export const messages = [
  "Pengen deh... pengen kamu 😖",
  "Excuse me? Why are you so beautful.🫠",
  "Ihh itu kamu udah lama dedeyy? cantik kaya gitu?🔫🔫",
  "Kamu setiap hari mundurr terus ya dedey? cantiknya kelewatan bangeeett...🤗"
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
