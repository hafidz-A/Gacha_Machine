export const messages = [
  "ANGKAT TANGAN! Kamu resmi ditahan karena terbukti bersalah mencuri hatiku tanpa izin!🔫💘",
  "Sayang coba buka ini, tapi harus dicopy paste. trus slidernya geser2 deh https://www.geogebra.org/graphing/wwdtsquw. Salam cinta dari apit 😘😘",
  "Belum genap sehari, apit sudah rindu sekaliii.... 😖😖💗",
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
