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
];

export function getRandomMessage(random = Math.random) {
  return messages[Math.floor(random() * messages.length)];
}
