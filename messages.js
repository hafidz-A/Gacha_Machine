export const messages = [
  "MBG, mas bahlil ganten, buah apa yang paling manis buaHHlil. dedey makin cantik aja deh😏💖",
  "kalo jadi gunting, batu, dan kertas. aku mau jadi kertasnya dedey batunya. bukan pengen dedey kalah tapi kertas memenangkan batu, dengan cara memeluknya🤏🫠🤗",
  "ternyata aku selain suka manggil sayang, aku juga suka manggil kamu calon istri apit🥰😝"
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
