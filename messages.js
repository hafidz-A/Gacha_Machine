export const messages = [
  "haii duta kesayangan apit... gapapa ga jadi juara 1 atau 2 atau 3 waktu itu, tapi sekarang jadi juara 1 di hati apitt💘💯💯",
  "maafin apit ya sayang, apit akhir2 ini tidak bisa bangunin dedey jam 6... terlalu nyaman bobo ditemenin dedey 🥺",
  "aku punya parfum namana ANI dan aku suka. kaya the way ANId you everyday🫶🫶🫶🫶🫶🫶🫶"
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
