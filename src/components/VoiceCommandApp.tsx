'use client';

import React, { useEffect, useState } from 'react';

// speech-recognition.d.ts
interface SpeechRecognition extends EventTarget {
  new (): SpeechRecognition;
  start(): void;
  stop(): void;
  abort(): void;
  grammars: SpeechGrammarList;
  interimResults: boolean;
  maxAlternatives: number;
  lang: string;
  onresult: (event: SpeechRecognitionEvent) => void;
  onend: () => void;
  onsoundstart: () => void;
  onsoundend: () => void;
  onspeechstart: () => void;
  onspeechend: () => void;
  onnomatch: (event: SpeechRecognitionEvent) => void;
  onstart: () => void;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  item(index: number): SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  transcript: string;
  confidence: number;
}

interface SpeechGrammarList {
  // Add any necessary methods or properties if needed
}

const VoiceCommandApp: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [clickCount, setClickCount] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const newRecognition = new SpeechRecognition();
    newRecognition.interimResults = false;
    newRecognition.lang = 'id-ID'; // Set language to Indonesian

    newRecognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      if (transcript.toLowerCase() === 'klik tombol') {
        setClickCount(prevCount => prevCount + 1); // Increment the counter
        setAnimate(true); // Trigger animation
        setTimeout(() => setAnimate(false), 300); // Reset animation after 300ms
      }
    };

    newRecognition.onend = () => {
      setIsListening(false);
      newRecognition.start(); // Restart listening
    };

    setRecognition(newRecognition);
    newRecognition.start(); // Start listening immediately on component mount

    return () => {
      newRecognition.stop(); // Clean up on unmount
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800">Voice Command App</h1>
      <p className="mt-4 text-lg">Ucapkan "klik tombol" untuk mengklik tombol di sini.</p>
      
      <button
        className={`mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-transform duration-300 ${animate ? 'transform scale-110' : ''}`}
      >
        Klik tombol di sini dengan suara
      </button>

      {isListening && <p className="mt-4 text-green-500">Mendengarkan...</p>}
      <div className="mt-4">
        <p className="text-xl">Tombol diklik <span className="font-bold">{clickCount}</span> kali</p>
      </div>
    </div>
  );
};

export default VoiceCommandApp;