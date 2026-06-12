export const pastMessages = [
  "dedeyy makin hari makin disayang apit lhoo🥰💗😖😖😖😖😖",
  "tidak ada hari tanpa sayang dedeyy💯💯😎😘",
  "4 kata baru kita -> apit sayang dedey muah😽😽😽😽😽😽😽😽😽😽😽😽😽😽😽😽",
];

export const messages = [
  "Kamu terlalu manis untuk diabaikan 🍬",
  "Hari ini pun, aku masih mikirin kamu 💭",
  "Selamat pagi, semoga harimu seindah senyummu ☀️",
  "Capek? Sandar aja dulu, ada aku di sini 🫂",
  "Kamu nggak perlu jadi sempurna, yang penting ada 🩷",
  "Diam-diam ngerinduin kamu, dan itu nyata 🌙",
  "Kalau boleh jujur, kamu yang paling aku suka 🫶",
  "Semoga hari ini ada hal kecil yang bikin kamu senyum 💌",
  "Nggak ada yang bisa gantiin kamu, percaya deh 💎",
  "Makasih ya, udah mau ada 🌸",
  "Kamu tahu nggak, lihat kamu bahagia itu cukup buat aku 🥹",
  "Peluk dari jauh, sampai nggak? 🤗",
  "Satu hal yang pasti: kamu selalu ada di pikiranku 💗",
  "Kamu bukan hanya 'seseorang' — kamu spesial 🌟",
  "Jangan lupa makan ya, yang penting kamu sehat 🍱",
  "Aku simpan satu doa kecil: semoga kamu selalu merasa dicintai ✨",
  "Kalau dunia ramai, sini dulu, aku tenangin pelan-pelan 🫧",
  "Apit sayang dea sepuluh juta ribu kali 🌸🤗",
  "eh apit kangen tau nggak, diem-diem udah lama banget 😭",
  "udah makan? kalau belum makan dulu ya, baru boleh kangen 😤🍜",
  "nanti kalau ketemu apit mau peluk lama, jangan kabur ya 🥺💗",
  "dea tuh bikin susah fokus seharian, tapi lucu banget sih 🫠",
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
