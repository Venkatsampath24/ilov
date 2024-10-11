import React, { useState, useEffect, useRef } from 'react';
import Heart from './component/Heart'; // Ensure this path is correct
import './App.css';
import './index.css';

const App = () => {
  const [hearts, setHearts] = useState([]);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef(new Audio('/assets/Rojalove.mp3')); // Update this path as necessary

  const quotes = [
    "I like you.",
    "You are sunshine.",
    "In your smile, I see something more beautiful than the stars.",
    "Every moment with you is a dream."
  ];

  const [quote, setQuote] = useState(quotes[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const generateHearts = () => {
    const newHearts = [];
    const heartCount = Math.floor(Math.random() * 5) + 3;

    for (let i = 0; i < heartCount; i++) {
      const randomLeft = Math.random() * 100;
      const duration = Math.random() * 3 + 2;
      const delay = Math.random() * 3;

      newHearts.push(
        <Heart
          key={`${hearts.length}-${i}`}
          style={{
            left: `${randomLeft}%`,
            animation: `fall ${duration}s linear ${delay}s forwards`,
            position: 'absolute',
            top: '0',
            fontSize: '24px',
            opacity: 1,
            zIndex: 10,
          }}
        />
      );
    }

    setHearts((prevHearts) => [...prevHearts, ...newHearts]);
  };

  const playMusic = () => {
    audioRef.current.play()
      .then(() => {
        setIsMusicPlaying(true);
      })
      .catch((error) => {
        console.error('Error playing music:', error);
      });
  };

  useEffect(() => {
    const interval = setInterval(generateHearts, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-pink-200 via-pink-300 to-purple-400 overflow-hidden">
      <div className="absolute inset-0 z-10 pointer-events-none">
        {hearts.map((heart, index) => (
          <React.Fragment key={index}>{heart}</React.Fragment>
        ))}
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center z-1">
        <img
          src={require('./assets/RImg.jpg')}
          alt="Art"
          className="w-80 h-auto rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-4 border-pink-500"
        />
        <h2 className="mt-4 text-2xl font-semibold text-gray-800 text-center font-dancing">
          🌹 your art inspires me every day!
        </h2>

        <h3 className="mt-4 text-xl font-dancing text-center text-pink-700">
          {quote}
        </h3>

        <button
          className={`mt-4 px-6 py-3 ${isMusicPlaying ? 'bg-red-500' : 'bg-pink-500'} text-white font-semibold text-lg rounded-full hover:bg-pink-600 transition duration-300`}
          onClick={playMusic}
        >
          {isMusicPlaying ? "Music Playing!" : "Click Me to Start the Music!"}
        </button>
      </div>

      <audio ref={audioRef} src="/assets/Rojalove.mp3" loop controls />
    </div>
  );
};

export default App;
