import React, { useState, useEffect, useRef } from 'react';
import Heart from './component/Heart'; // Ensure this path is correct
import './App.css';
import './index.css';

const App = () => {
  const [hearts, setHearts] = useState([]);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isRoseVisible, setIsRoseVisible] = useState(false);
  const audioRef = useRef(null); // Just a ref for the audio element

  const quotes = [
    "I like you.",
    "You are sunshine.",
    "In your smile, I see something more beautiful than the stars.",
    "Every moment with you is a dream."
  ];

  const [quote, setQuote] = useState(quotes[0]);

  // Update the quote every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex]);
    }, 5000);

    return () => clearInterval(interval);
  }, [quotes]);

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

  // Play music function
  const playMusic = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => {
          console.log('Music is playing');
          setIsMusicPlaying(true);
        })
        .catch((error) => {
          console.error('Error playing music:', error);
        });
    }
  };

  // Stop music function
  const stopMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset to start
      setIsMusicPlaying(false);
      console.log('Music stopped');
    }
  };

  // Handle showing the rose and playing music
  const handleShowRose = () => {
    setIsRoseVisible(true);
    playMusic();
  };

  // Handle hiding the rose and stopping the music
  const handleHideRose = () => {
    setIsRoseVisible(false);
    stopMusic();
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
          src="/assets/RImg.jpg" // Ensure this path is correct for your image
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
          onClick={handleShowRose}
        >
          {isMusicPlaying ? "Music Playing!" : "Click Me to Start the Surprise!"}
        </button>

        {/* Rose modal with close button */}
        {isRoseVisible && (
          <div className="modal">
            <span className="close" onClick={handleHideRose}>&times;</span>
            <img src="/assets/rose-bloomed.gif.gif" alt="Animated Rose" className="rose-gif" />
            <h1>Just like this rose blooms beautifully!</h1>
          </div>
        )}
      </div>

      {/* Always render the audio player */}
      <audio
        ref={audioRef}
        src="/Rojalove.mp3"
        loop
        style={{ display: 'none' }}
        onLoadedData={() => console.log('Audio loaded successfully')}
        onError={(error) => console.error('Error loading audio:', error)}
      />
    </div>
  );
};

export default App;
