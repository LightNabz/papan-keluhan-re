"use client";
import React, { useState, useEffect } from "react";
import { RotateCcw, Trophy, Clock } from "lucide-react";

interface Card {
  id: number;
  type: string;
  icon: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const complaintTypes = [
  { type: "Pelayanan", icon: "👨‍⚕️" },
  { type: "Kebersihan", icon: "🧹" },
  { type: "Administrasi", icon: "📋" },
  { type: "Fasilitas", icon: "🏥" },
  { type: "Parkir", icon: "🚗" },
  { type: "Antrian", icon: "👥" }
];

export default function ComplaintMatchingGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [time, setTime] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  // Initialize game
  const initializeGame = () => {
    const gameCards: Card[] = [];
    let id = 1;

    // Create pairs for each complaint type
    complaintTypes.forEach((complaint) => {
      gameCards.push(
        { id: id++, type: complaint.type, icon: complaint.icon, isFlipped: false, isMatched: false },
        { id: id++, type: complaint.type, icon: complaint.icon, isFlipped: false, isMatched: false }
      );
    });

    // Shuffle cards
    const shuffledCards = gameCards.sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setFlippedCards([]);
    setMoves(0);
    setGameOver(false);
    setTime(0);
    setGameStarted(true);
  };

  // Handle card click
  const handleCardClick = (index: number) => {
    if (!gameStarted) {
      setGameStarted(true);
    }

    if (flippedCards.length === 2 || cards[index].isFlipped || cards[index].isMatched) {
      return;
    }

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      checkForMatch(newFlippedCards);
    }
  };

  // Check if flipped cards match
  const checkForMatch = (flippedIndices: number[]) => {
    const [firstIndex, secondIndex] = flippedIndices;
    const firstCard = cards[firstIndex];
    const secondCard = cards[secondIndex];

    if (firstCard.type === secondCard.type) {
      const newCards = [...cards];
      newCards[firstIndex].isMatched = true;
      newCards[secondIndex].isMatched = true;
      setCards(newCards);
      setFlippedCards([]);

      if (newCards.every(card => card.isMatched)) {
        setGameOver(true);
      }
    } else {
      setTimeout(() => {
        const newCards = [...cards];
        newCards[firstIndex].isFlipped = false;
        newCards[secondIndex].isFlipped = false;
        setCards(newCards);
        setFlippedCards([]);
      }, 1000);
    }
  };

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameStarted && !gameOver) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted, gameOver]);

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">🎮 Matching Game - Jenis Keluhan</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Temukan pasangan jenis keluhan yang sama! Latih ingatan Anda tentang kategori keluhan.
        </p>

        <div className="flex justify-center gap-6 mb-4 text-sm">
          <div className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900 px-3 py-2 rounded-lg">
            <Clock size={16} />
            <span>Waktu: {formatTime(time)}</span>
          </div>
          <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900 px-3 py-2 rounded-lg">
            <Trophy size={16} />
            <span>Langkah: {moves}</span>
          </div>
        </div>

        <button
          onClick={initializeGame}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mx-auto mb-4"
        >
          <RotateCcw size={16} />
          {gameStarted ? "Mulai Ulang" : "Mulai Game"}
        </button>
      </div>

      {gameOver && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg mb-6 text-center">
          <h3 className="font-bold text-lg mb-2">🎉 Selamat!</h3>
          <p>Anda menyelesaikan game dalam {moves} langkah dan {formatTime(time)}!</p>
        </div>
      )}

      {/* Card Grid */}
      <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(index)}
            className="aspect-square cursor-pointer [perspective:1000px]"
          >
            <div
              className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
                card.isFlipped || card.isMatched ? '[transform:rotateY(180deg)]' : ''
              }`}
            >
              {/* FRONT */}
              <div className="absolute inset-0 flex items-center justify-center border-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-400 [backface-visibility:hidden]">
                ❓
              </div>

              {/* BACK */}
              <div className={`absolute inset-0 flex flex-col items-center justify-center border-2 rounded-lg text-2xl font-bold [backface-visibility:hidden] [transform:rotateY(180deg)]
                ${card.isMatched 
                  ? 'bg-green-200 dark:bg-green-800 border-green-400' 
                  : 'bg-blue-200 dark:bg-blue-800 border-blue-400'
                }`}
              >
                <div className="text-3xl mb-1">{card.icon}</div>
                <div className="text-xs">{card.type}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">Jenis-jenis Keluhan:</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
          {complaintTypes.map((complaint, index) => (
            <div key={index} className="flex items-center gap-2">
              <span>{complaint.icon}</span>
              <span>{complaint.type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}