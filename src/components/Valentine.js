import React, { useState } from 'react';
import '../App.css';
import noImg from './angry-cats-v0-37n6eeti7j5b1-removebg-preview.png';
import yesGif from './output-onlinegiftools (1).gif'; // add your provided gif here

export default function Valentine() {
  const [yesScale, setYesScale] = useState(1);
  const [noClicks, setNoClicks] = useState(0);
  const [showSadMessage, setShowSadMessage] = useState(false);

  // YES overlay state
  const [showYesGif, setShowYesGif] = useState(false);
  const [yesMessage, setYesMessage] = useState('');
  const [overlayHearts, setOverlayHearts] = useState([]);

  // NEW: romantic theme flag
  const [romanticTheme, setRomanticTheme] = useState(false);

  // replaced confetti with softer rose-petal emit
  function spawnConfetti(amount = 20) {
    const colors = ['#c85a6b','#ff9fb1','#ffd8d8','#e8b7c6','#d4af37'];
    for (let i = 0; i < amount; i++) {
      const el = document.createElement('div');
      el.className = 'petal';
      const w = 8 + Math.random() * 18;
      const h = Math.max(10, w * (1.1 + Math.random() * 0.6));
      el.style.width = `${w}px`;
      el.style.height = `${h}px`;
      el.style.left = `${Math.random() * 100}vw`;
      el.style.background = colors[Math.floor(Math.random() * colors.length)];
      el.style.borderRadius = `${50 + Math.random() * 30}% ${40 + Math.random() * 30}% ${50 + Math.random() * 30}% ${40 + Math.random() * 30}% / 60% 40% 60% 40%`;
      el.style.transform = `translateY(-10vh) rotate(${Math.random() * 360}deg)`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 3200);
    }
  }

  function generateHearts(count = 8) {
    return Array.from({ length: count }).map((_, i) => {
      const style = {
        left: `${10 + Math.random() * 80}%`,
        animationDelay: `${Math.random() * 1}s`,
        fontSize: `${12 + Math.random() * 20}px`,
        color: Math.random() > 0.5 ? '#ff6b9f' : '#ff8fc6'
      };
      return <div key={i} className="heart" style={style}>❤️</div>;
    });
  }

  // 50 sweet messages (short, valentine acceptance themed)
  const sweetMessages = [
    "Yes! You light up my world 🌟",
    "I'm over the moon — I'll be yours 🌙❤️",
    "My heart just did a happy dance for you 💃❤️",
    "You make every day feel like spring 🌸",
    "I can't wait to hold your hand 🤝💕",
    "You've got my whole heart, forever 💖",
    "This is the start of something beautiful ✨",
    "You + me = my favorite equation ❤️",
    "Say yes and let's make memories 🥰",
    "My cheeks hurt — you make me smile so much 😊",
    "I'll cherish you every single day 🌹",
    "Best decision ever — yes! 🥳💘",
    "With you, everything feels right 🌈",
    "You turned my maybe into a yes 💞",
    "I'll be your biggest fan and your home 🏠💗",
    "My heart chose you — glad it did 💓",
    "You make ordinary moments magical ✨",
    "Yes — to adventures, cuddles and us 🧭❤️",
    "I promise to laugh with you every day 😄💖",
    "You are my favorite hello and hardest goodbye 💕",
    "Accepted! Let's be cute together 🐾❤️",
    "Yes! Let's write our love story 📖💘",
    "You make my heart skip like a song 🎶💖",
    "I'm yours — no returns, all love 🥰",
    "Yes! More smiles, more love, more us 😊💕",
    "You had me at hello, you keep me at yes 💌",
    "A thousand yesses wouldn't be enough 🌟💓",
    "You make my world brighter — yes! ☀️❤️",
    "Yes — I'll be your cozy, silly, loving partner 🧸💕",
    "You turned my heart into a home 🏡💗",
    "I'm so happy you asked — yes! 😍",
    "Yes! Let's grow together 🌱❤️",
    "You make everything better just by being you 🌼",
    "Yes — I pick you, every single time 💘",
    "You make my heart feel loud and proud 🎉💖",
    "Yes! I'll be the reason you smile today 😁💞",
    "Let's be each other's favorite hello 💕",
    "Yes — the best yes I've ever said 🥂❤️",
    "You are my little forever plan 🌟💓",
    "My heart says yes and my hands want yours 🤝💗",
    "Yes! I'll be the one who loves you daily 🌅💖",
    "You make ordinary days extraordinary ✨❤️",
    "Yes — adventure partner and snuggle buddy 🧭🛌",
    "My whole heart says yes to you 💝",
    "Yes! Let's be cute embarrassingly in love 😳💘",
    "Your yes is my favorite sound — I'll echo it back 🎶💞",
    "Yes — because you already have my heart 💓"
  ];

  function handleNo() {
    const next = noClicks + 1;
    setNoClicks(next);
    setYesScale(s => Math.min(3, +(s + 0.18).toFixed(2)));

    // show a static preview only after several NO clicks (no GIF)
    if (next >= 3) {
      // removed setShowCat - unused variable
    }

    // when reaching 10 NOs switch to final sad full-screen mode
    if (next >= 10) {
      setShowSadMessage(true);
      // clear other transient states
      setShowYesGif(false);
      return;
    }
  }

  function handleYes() {
    // pick a random sweet message from the pool of 50
    const idx = Math.floor(Math.random() * sweetMessages.length);
    const msg = sweetMessages[idx];
    setYesMessage(msg);

    // create some overlay heart positions for the floating hearts
    const hearts = Array.from({ length: 10 }).map(() => ({
      left: `${10 + Math.random() * 80}%`,
      size: 12 + Math.floor(Math.random() * 22),
      delay: `${Math.random() * 0.9}s`,
      color: Math.random() > 0.5 ? '#ff6b9f' : '#ff8fc6'
    }));
    setOverlayHearts(hearts);

    // show overlay-only GIF + message (petals instead of squares)
    setShowYesGif(true);
    spawnConfetti(26);

    // hide the overlay after a short time
    setTimeout(() => {
      setShowYesGif(false);
      setOverlayHearts([]);
    }, 2600);
  }

  // NEW: reset and apologize handlers for nicer final-sad behavior
  function resetAll() {
    setNoClicks(0);
    setShowSadMessage(false);
    setYesScale(1);
    setRomanticTheme(false); // clear theme on reset
  }

  function apologize() {
    // show a gentle YES overlay with a caring message
    const apologyMsg = "I'm sorry — please give my heart another chance 💖";
    setYesMessage(apologyMsg);
    setShowSadMessage(false);
    setShowYesGif(true);
    setYesScale(1);           // reset enlarged YES button
    setNoClicks(0);           // reset NO clicks counter
    setRomanticTheme(true);   // enable romantic color theme
    spawnConfetti(18);
    setTimeout(() => setShowYesGif(false), 2600);
  }

  // If final sad state, render refined full-screen sad view
  if (showSadMessage) {
    return (
      <div className="final-sad refined-sad" role="dialog" aria-modal="true" aria-label="Sad View">
        <img src={noImg} alt="sad" className="final-sad-img refined-sad-img" />
        <h3 className="final-sad-title">Don't want to?</h3>
        <p className="final-sad-text refined-sad-text">My heart hoped you'd say yes — this makes me a little broken 💔😿</p>

        <div className="final-sad-actions">
          <button className="btn btn-yes" onClick={apologize} aria-label="Apologize and try again">
            Apologize & Try Again
          </button>
          <button className="btn btn-no" onClick={resetAll} aria-label="Reset">
            Reset
          </button>
        </div>
      </div>
    );
  }

  // WHEN overlay is active, render ONLY the overlay (everything else hidden)
  if (showYesGif) {
    return (
      <div
        className="yes-fullscreen"
        role="dialog"
        aria-modal="true"
        aria-label="Celebration"
        onClick={() => {
          // allow click to dismiss early
          setShowYesGif(false);
          setOverlayHearts([]);
        }}
      >
        <img src={yesGif} alt="celebrate" className="yes-gif" />
        {/* announce message to assistive tech */}
        <div className="yes-message" role="status" aria-live="polite">
          {yesMessage} 🎉😘
        </div>

        {/* floating overlay hearts */}
        {overlayHearts.map((h, i) => (
          <div
            key={i}
            className="overlay-heart"
            style={{
              left: h.left,
              fontSize: `${h.size}px`,
              color: h.color,
              animationDelay: h.delay
            }}
          >
            ❤️
          </div>
        ))}
      </div>
    );
  }

  // default UI — apply romantic theme class when enabled
  return (
    <div className={`valentine${romanticTheme ? ' romantic' : ''}`}>
      <div className="card" role="dialog" aria-label="Valentine">
        <h2>Will you be my Valentine?</h2>
        <div className="subtitle">A small question — a forever answer.</div>

        {/* romantic message */}
        <div className="message">
          My heart whispers your name — say you'll be mine ✨
        </div>

        <div className="buttons" aria-hidden={false}>
          <button
            className="btn btn-yes"
            onClick={handleYes}
            style={{ transform: `scale(${yesScale})` }}
            aria-label="Yes"
          >
            YES
          </button>

          <button
            className="btn btn-no"
            onClick={handleNo}
            aria-label="No"
          >
            NO
          </button>
        </div>

        <div className="counter">
          NO clicks: {noClicks}
        </div>


        <div className="hearts" aria-hidden>{generateHearts(10)}</div>
      </div>
    </div>
  );
}
