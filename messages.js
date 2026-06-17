export const pastMessages = [
  "belum genap sehari, tapi aku udah kangen sekali😢💖💖💖😢😢😢",
  "dedeyy makin hari makin disayang apit lhoo🥰💗😖😖😖😖😖",
  "tidak ada hari tanpa sayang dedeyy💯💯😎😘",
  "4 kata baru kita -> apit sayang dedey muah😽😽😽😽😽😽😽😽😽😽😽😽😽😽😽😽",
  "haii duta kesayangan apit... gapapa ga jadi juara 1 atau 2 atau 3 waktu itu, tapi sekarang jadi juara 1 di hati apitt💘💯💯",
  "maafin apit ya sayang, apit akhir2 ini tidak bisa bangunin dedey jam 6... terlalu nyaman bobo ditemenin dedey 🥺",
  "aku punya parfum namana ANI dan aku suka. kaya the way ANId you everyday🫶🫶🫶🫶🫶🫶🫶",
  "sebelum meeting, ini ada gacha lucu buat dedey yang lucuuu💌💌​",
  "Makasih ya dedey sayang, udah mau ada buat apit🌸",
  "Peluk dari jauh, kerasa nggak maa dedeyy? 🤗",
  "Kamu bukan hanya 'seseorang' — kamu spesial 🌟",
  "Aku simpan satu doa kecil: semoga kamu selalu merasa dicintai ✨",
  "Kalau dunia ramai, sini dulu, aku tenangin pelan-pelan 🫧",
  "Apit sayang dedey sepuluh juta ribu kali 🌸🤗",
  "nanti kalau ketemu apit mau peluk lama, jangan kabur ya 🥺💗",
  "kemenkes punya pedoman gizi seimbang, apit punya pedoman sayang dedey: 1. kiss, 2. kiss, 3. kiss, banyak kiss😘😘😘😘",
  "jatuh paling ga sakit adalah falling in love with you🥰🥰",
  "hal yang paling apit suka dari dedey adalah, dedey itu sendiri💖💖🥰🥰🥰😘😘😘😘😋😋😃🤩🤗🤗",
  "akhir2 ini lagi berlangsung piala dunia sepak bola... di saat yang sama juga apit tergocek2 oleh cinta dedey kepada apit😽🥰🥰",
  "cookies kamu enak banget sayang, tapi cookiss kamuu apit paling sukaa 💘😽💘😽",
  "tiba2 keinget kita sudah kis 10010298374711 kali sampe hari ini😙😽🐥💋",
  "meng apa yang apit paling sukaa? mengcintai dedey tiap hari😘💕🤗 #ripbahasabaku",
  "ternyata apit sudah sesayang ini, sampe2 dedey nangis aja apit pengen ikutan nangis😞😟😘"
];

export const messages = [
  "sejauh ini subscription apit banyaknya cuma yang 1 bulan aja, tapi kalau sama dedey maunya seumur hidup🥺🥺💘💘",
  "pointing antenna susah2, tetap aja hati apit pointingnya banyak ke dedey🫠😎🥰",
  "love u baby <3"
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
