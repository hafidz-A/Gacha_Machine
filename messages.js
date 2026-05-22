export const messages = [
  "Jika aku diberi satu permintaan ajaib hari ini, aku hanya ingin terus mengulang tawa yang sama bersamamu sampai kita menua nanti.🤗",
  "Senyummu adalah keajaiban kecil yang selalu berhasil membuat hariku yang paling berantakan sekalipun menjadi sempurna. 🩷",
  "Tolong tanggung jawab! Kamu resmi bikin aku amnesia sama yang namanya sedih. 🥰",
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
