import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

type MachineState = 'idle' | 'dispensing' | 'opening';

const loveMessages = [
  "Kamu terlalu manis untuk diabaikan 🍬",
  "Hari ini pun, aku mikirin kamu 💌",
  "Senyummu bikin hariku cerah ☀️",
  "Kamu spesial banget buat aku 💝",
  "Tanpamu, hari ini hambar 🌸",
  "Kamu cantik, tau nggak? 🌺",
  "Terimakasih udah ada di hidupku 💖",
  "Kamu bikin aku bahagia terus 🦋",
  "Aku sayang kamu, selamanya 💕",
  "Kamu adalah hadiah terindahku 🎁"
];

const capsuleColors = [
  'from-pink-300 to-pink-500',
  'from-red-300 to-red-500',
  'from-purple-300 to-purple-500',
  'from-rose-300 to-rose-500'
];

export function GachaMachine() {
  const [state, setState] = useState<MachineState>('idle');
  const [message, setMessage] = useState('');
  const [capsuleColor, setCapsuleColor] = useState('');
  const [isButtonGlowing, setIsButtonGlowing] = useState(true);

  const handleSpin = () => {
    if (state !== 'idle') return;

    setState('dispensing');
    setIsButtonGlowing(false);

    // Pick random message and capsule color
    const randomMessage = loveMessages[Math.floor(Math.random() * loveMessages.length)];
    const randomColor = capsuleColors[Math.floor(Math.random() * capsuleColors.length)];
    setMessage(randomMessage);
    setCapsuleColor(randomColor);

    // Trigger confetti after capsule appears
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFB5C8', '#D4BAFF', '#B5EAD7', '#FFC0CB']
      });
    }, 800);

    // Move to opening state
    setTimeout(() => {
      setState('opening');
    }, 2000);
  };

  const handlePlayAgain = () => {
    setState('idle');
    setIsButtonGlowing(true);
    setMessage('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF9F0] via-[#FFE5EC] to-[#E8DEF8] p-4 sm:p-8 overflow-hidden relative"
      style={{ fontFamily: "'Nunito', sans-serif" }}>

      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-300 opacity-20"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 50
            }}
            animate={{
              y: -100,
              x: Math.random() * window.innerWidth
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          >
            <Heart className="w-6 h-6 sm:w-8 sm:h-8 fill-current" />
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {state === 'idle' && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="relative"
          >
            {/* Floating sparkles around machine */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  top: `${20 + Math.sin(i) * 60}%`,
                  left: `${20 + Math.cos(i) * 60}%`
                }}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              >
                <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-400 fill-yellow-400" />
              </motion.div>
            ))}

            {/* Gacha Machine */}
            <div className="relative z-10">
              {/* Machine Dome */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto">
                {/* Glass dome */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 to-pink-100/30 border-8 border-[#FFB5C8] shadow-2xl backdrop-blur-sm">
                  {/* Glow effect inside dome */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-200/20 to-pink-200/20 animate-pulse" />

                  {/* Capsule balls inside */}
                  <div className="absolute inset-8 flex flex-wrap gap-2 p-4 justify-center items-center">
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br ${
                          capsuleColors[i % capsuleColors.length]
                        } shadow-lg`}
                        animate={{
                          y: [0, -5, 0],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                          duration: 2 + Math.random(),
                          repeat: Infinity,
                          delay: i * 0.1
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Highlight on glass */}
                <div className="absolute top-8 left-8 w-20 h-20 rounded-full bg-white/50 blur-xl" />
              </div>

              {/* Machine Body */}
              <div className="relative -mt-8 w-72 sm:w-96 mx-auto">
                <div className="bg-gradient-to-b from-[#FFB5C8] to-[#FF9AB5] rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-pink-300">
                  {/* Coin slot */}
                  <div className="flex items-center justify-center mb-6">
                    <div className="bg-pink-900/30 rounded-full px-6 py-2 flex items-center gap-2">
                      <Heart className="w-4 h-4 text-white fill-white" />
                      <span className="text-white text-sm">Insert Love</span>
                      <Heart className="w-4 h-4 text-white fill-white" />
                    </div>
                  </div>

                  {/* Big spin button */}
                  <motion.button
                    onClick={handleSpin}
                    className="w-full bg-gradient-to-br from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600
                      text-white py-6 rounded-full shadow-xl border-4 border-white/50
                      transform transition-transform active:scale-95 relative overflow-hidden"
                    style={{ fontFamily: "'Pacifico', cursive" }}
                    animate={isButtonGlowing ? {
                      boxShadow: [
                        '0 0 20px rgba(255, 181, 200, 0.5)',
                        '0 0 40px rgba(255, 181, 200, 0.8)',
                        '0 0 20px rgba(255, 181, 200, 0.5)'
                      ]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="relative z-10 text-xl sm:text-2xl flex items-center justify-center gap-2">
                      💖 Putar!
                    </span>
                    {isButtonGlowing && (
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </motion.button>

                  {/* Dispenser slot */}
                  <div className="mt-6 h-16 bg-pink-900/40 rounded-2xl flex items-center justify-center">
                    <div className="w-3/4 h-12 bg-black/30 rounded-xl" />
                  </div>
                </div>

                {/* Machine base */}
                <div className="h-4 bg-gradient-to-b from-pink-300 to-pink-400 rounded-b-3xl -mt-1 border-4 border-t-0 border-pink-300" />
              </div>

              {/* Floating hearts */}
              <div className="absolute -left-12 top-1/2 transform -translate-y-1/2">
                <motion.div
                  animate={{ y: [0, -20, 0], x: [0, 5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Heart className="w-8 h-8 text-pink-400 fill-pink-400 opacity-60" />
                </motion.div>
              </div>
              <div className="absolute -right-12 top-1/2 transform -translate-y-1/2">
                <motion.div
                  animate={{ y: [0, -15, 0], x: [0, -5, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                >
                  <Heart className="w-6 h-6 text-pink-400 fill-pink-400 opacity-60" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {state === 'dispensing' && (
          <motion.div
            key="dispensing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative w-full max-w-md"
          >
            {/* Machine during dispensing (simplified view) */}
            <div className="relative">
              <div className="w-64 h-64 sm:w-80 sm:h-80 mx-auto rounded-full bg-gradient-to-br from-white/40 to-pink-100/30 border-8 border-[#FFB5C8] shadow-2xl" />

              {/* Capsule being dispensed */}
              <motion.div
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2"
                initial={{ y: -100, scale: 0.5, opacity: 0 }}
                animate={{
                  y: 200,
                  scale: [0.5, 1.2, 1],
                  opacity: [0, 1, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 1.5,
                  times: [0, 0.6, 1],
                  ease: "easeOut"
                }}
              >
                <div className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br ${capsuleColor}
                  shadow-2xl border-4 border-white/50 relative`}>
                  {/* Shine effect */}
                  <div className="absolute top-2 left-2 w-8 h-8 rounded-full bg-white/60 blur-sm" />
                </div>
              </motion.div>

              {/* Sparkles burst */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute left-1/2 top-1/2"
                  initial={{
                    x: 0,
                    y: 0,
                    scale: 0,
                    opacity: 1
                  }}
                  animate={{
                    x: Math.cos(i * 30 * Math.PI / 180) * 150,
                    y: Math.sin(i * 30 * Math.PI / 180) * 150,
                    scale: [0, 1, 0],
                    opacity: [1, 1, 0]
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.8
                  }}
                >
                  <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {state === 'opening' && (
          <motion.div
            key="opening"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="relative w-full max-w-md px-4"
          >
            {/* Capsule opening animation */}
            <div className="relative mb-8">
              <div className="flex justify-center items-center gap-4">
                {/* Left half */}
                <motion.div
                  className={`w-16 h-32 sm:w-20 sm:h-40 bg-gradient-to-br ${capsuleColor}
                    rounded-l-full shadow-xl border-4 border-r-2 border-white/50`}
                  initial={{ x: 0, rotate: 0 }}
                  animate={{ x: -30, rotate: -15 }}
                  transition={{ duration: 0.6, type: "spring" }}
                >
                  <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-white/60 blur-sm" />
                </motion.div>

                {/* Right half */}
                <motion.div
                  className={`w-16 h-32 sm:w-20 sm:h-40 bg-gradient-to-br ${capsuleColor}
                    rounded-r-full shadow-xl border-4 border-l-2 border-white/50`}
                  initial={{ x: 0, rotate: 0 }}
                  animate={{ x: 30, rotate: 15 }}
                  transition={{ duration: 0.6, type: "spring" }}
                >
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/60 blur-sm" />
                </motion.div>
              </div>

              {/* Sparkles from opening */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{
                    scale: [0, 1.5, 0],
                    opacity: [1, 1, 0],
                    x: Math.cos(i * 60 * Math.PI / 180) * 80,
                    y: Math.sin(i * 60 * Math.PI / 180) * 80
                  }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <Sparkles className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                </motion.div>
              ))}
            </div>

            {/* Message card */}
            <motion.div
              initial={{ y: 50, opacity: 0, rotateX: -90 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              transition={{ duration: 0.6, delay: 0.4, type: "spring" }}
              className="relative"
            >
              {/* Parchment-style card */}
              <div className="bg-gradient-to-br from-[#FFF9F0] to-[#FFE8D6] rounded-3xl p-8 sm:p-10
                shadow-2xl border-4 border-pink-200 relative overflow-hidden">
                {/* Decorative corners */}
                <div className="absolute top-3 left-3">
                  <Heart className="w-6 h-6 text-pink-300 fill-pink-300 opacity-40" />
                </div>
                <div className="absolute top-3 right-3">
                  <Heart className="w-6 h-6 text-pink-300 fill-pink-300 opacity-40" />
                </div>
                <div className="absolute bottom-3 left-3">
                  <Heart className="w-6 h-6 text-pink-300 fill-pink-300 opacity-40" />
                </div>
                <div className="absolute bottom-3 right-3">
                  <Heart className="w-6 h-6 text-pink-300 fill-pink-300 opacity-40" />
                </div>

                {/* Message text */}
                <p
                  className="text-center text-pink-900 text-xl sm:text-2xl leading-relaxed relative z-10"
                  style={{ fontFamily: "'Pacifico', cursive" }}
                >
                  {message}
                </p>

                {/* Decorative line */}
                <div className="mt-6 flex justify-center gap-2">
                  <div className="w-12 h-0.5 bg-pink-300 rounded" />
                  <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
                  <div className="w-12 h-0.5 bg-pink-300 rounded" />
                </div>
              </div>

              {/* Play again button */}
              <motion.button
                onClick={handlePlayAgain}
                className="mt-8 w-full bg-gradient-to-r from-[#FFB5C8] to-[#D4BAFF] hover:from-[#FF9AB5] hover:to-[#C9A5FF]
                  text-white py-4 px-8 rounded-full shadow-xl
                  transform transition-all hover:scale-105 active:scale-95 border-4 border-white/50"
                style={{ fontFamily: "'Pacifico', cursive" }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <span className="text-lg sm:text-xl flex items-center justify-center gap-2">
                  ✨ Putar Lagi?
                </span>
              </motion.button>
            </motion.div>

            {/* Floating hearts around message */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  top: `${10 + Math.random() * 80}%`,
                  left: `${Math.random() * 100}%`
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.7, 0.3],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 2 + Math.random(),
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              >
                <Heart className="w-4 h-4 sm:w-6 sm:h-6 text-pink-300 fill-pink-300" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
