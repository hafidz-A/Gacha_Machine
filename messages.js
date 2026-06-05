export const messages = [
  "DAR DER DOR! ituu bukan suara tembakan, tapi suara hati apit ketemu dedeyy cantik kyut manis lovlov💘",
  "lapangan kerja ga nambah saya diam, dolar naik juga saya diam, tapi hari ini saya yang kangen sampaikan: saya akan sayang dedey 😾😽",
  "ingaat ingaat, apit sayang dedeeyyy😾💘💘💘💘💘💘💘💘💘",
  "izinkan aku jatuh ya kak, jatuh cinta denganmu🫰"
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
