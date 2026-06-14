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
];

export const messages = [
  "kemenkes punya pedoman gizi seimbang, apit punya pedoman sayang dedey: 1. kiss, 2. kiss, 3. kiss, banyak kiss😘😘😘😘",
  "jatuh paling ga sakit adalah falling in love with you🥰🥰",
  "hal yang paling apit suka dari dedey adalah, dedey itu sendiri💖💖🥰🥰🥰😘😘😘😘😋😋😃🤩🤗🤗"
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
