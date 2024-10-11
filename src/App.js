import React, { useState, useEffect, useRef } from 'react';
import Heart from './component/Heart'; // Ensure this path is correct
import './App.css';
import './index.css';

const App = () => {
  const [hearts, setHearts] = useState([]); // State to store heart components
  const [isMusicPlaying, setIsMusicPlaying] = useState(false); // To track if music is playing
  const [showRose, setShowRose] = useState(false); // State for rose symbol visibility

  // Update the audio file path to be in the public directory
  const backgroundMusic = '/assets/Rojalove.mp3'; 
  const audioRef = useRef(new Audio(backgroundMusic)); // Create a new Audio object

  const quotes = [
    "I like you.",
    "You are sunshine.",
    "In your smile, I see something more beautiful than the stars.",
    "Every moment with you is a dream."
  ];

  const [quote, setQuote] = useState(quotes[0]);

  useEffect(() => {
    // Rotate the love quotes every 5 seconds
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex]);
    }, 5000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  // Function to generate multiple hearts with random position and animation
  const generateHearts = () => {
    const newHearts = [];
    const heartCount = Math.floor(Math.random() * 5) + 3; // Randomly generate 3 to 7 hearts at once

    for (let i = 0; i < heartCount; i++) {
      const randomLeft = Math.random() * 100; // Random left position (viewport width)
      const duration = Math.random() * 3 + 2; // Random fall duration (2-5 seconds)
      const delay = Math.random() * 3; // Random delay before falling

      newHearts.push(
        <Heart
          key={`${hearts.length}-${i}`} // Unique key based on current length and index
          style={{
            left: `${randomLeft}%`,
            animation: `fall ${duration}s linear ${delay}s forwards`,
            position: 'absolute',
            top: '0', // Start at the top of the screen
            fontSize: '24px',
            opacity: 1,
            zIndex: 10, // Ensures hearts are rendered above everything
          }}
        />
      );
    }

    // Add new hearts to the existing hearts state
    setHearts((prevHearts) => [...prevHearts, ...newHearts]);
  };

  // Function to handle music play on user interaction
  const playMusic = () => {
    audioRef.current.play()
      .then(() => {
        setIsMusicPlaying(true); // Update the state to reflect that music is playing
        setShowRose(true); // Show the rose symbol
      })
      .catch((error) => {
        console.error('Error playing music:', error);
      });
  };

  useEffect(() => {
    // Start generating hearts as soon as the app loads
    const interval = setInterval(generateHearts, 300);
    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-pink-200 via-pink-300 to-purple-400 overflow-hidden">
      {/* Full-screen hearts */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {hearts.map((heart, index) => (
          <React.Fragment key={index}>{heart}</React.Fragment>
        ))}
      </div>

      {/* Main content, including the image */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-1">
        <img
          src={require('./assets/RImg.jpg')} // Change to your image path
          alt="Art"
          className="w-80 h-auto rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-4 border-pink-500"
        />
        <h2 className="mt-4 text-2xl font-semibold text-gray-800 text-center font-dancing">
          🌹 your art inspires me every day!
        </h2>

        {/* Rotating love quotes */}
        <h3 className="mt-4 text-xl font-dancing text-center text-pink-700">
          {quote}
        </h3>

        {/* Button to start the music */}
        {!isMusicPlaying && (
          <button
            className="mt-4 px-6 py-3 bg-pink-500 text-white font-semibold text-lg rounded-full hover:bg-pink-600 transition duration-300 animate-pulse"
            onClick={playMusic}
          >
            Click Me to Start the Music!
          </button>
        )}

        {isMusicPlaying && (
          <button
            className="mt-4 px-6 py-3 bg-red-500 text-white font-semibold text-lg rounded-full hover:bg-red-600 transition duration-300 animate-bounce"
            onClick={() => alert("You are amazing!..Roja❤️🩷")}
          >
            Click Me for a Surprise!
          </button>
        )}

        {/* Show Rose Symbol when music is playing */}
        {/* {showRose && <RoseSymbol show={showRose} onAnimationEnd={() => setShowRose(false)} />} */}
      </div>

      {/* Audio element */}
      <audio ref={audioRef} src={backgroundMusic} loop />
    </div>
  );
};

export default App;
