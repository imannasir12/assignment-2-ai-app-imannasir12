import React, { useState } from 'react';
import FlashcardList from './FlashcardList';
import AddFlashcard from './AddFlashcard';
import './App.css';

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [quizMode, setQuizMode] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0); 
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(null);

  const colors = ['#FFDEE9', '#E6E6FA', '#DFF7FF', '#D4F8E8'];

  const addFlashcard = (question, answer) => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setFlashcards([
      ...flashcards,
      { id: Date.now(), question, answer, color: randomColor },
    ]);
  };

  const deleteFlashcard = (id) => {
    setFlashcards(flashcards.filter((flashcard) => flashcard.id !== id));
  };

  const shuffleFlashcards = () => {
    setFlashcards((prevFlashcards) => {
      const shuffled = [...prevFlashcards];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    });
  };

  const startQuiz = () => {
    setQuizMode(true);
    setCurrentCardIndex(0);
    setUserAnswer('');
    setFeedback('');
    setScore(0);
    setStartTime(Date.now());
  };

  const checkAnswer = () => {
    const currentCard = flashcards[currentCardIndex];
    if (userAnswer.toLowerCase() === currentCard.answer.toLowerCase()) {
      setFeedback('Correct!');
      setScore((prevScore) => prevScore + 1);
    } else {
      setFeedback('Incorrect! Try again or proceed.');
    }
  };

  const nextCard = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setUserAnswer('');
      setFeedback('');
    } else {
      setQuizMode(false);
      const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);
      setElapsedTime(totalTime);
      alert(`Quiz completed! Time taken: ${totalTime} seconds. Final Score: ${score}/${flashcards.length}`);
    }
  };

  return (
    <div className="App">
      <h1>Flash Wisdom</h1>
      {quizMode ? (
        <div>
          <h2>Quiz Mode</h2>
          <p>Timer is running...</p>
          <p>Score: {score}/{flashcards.length}</p> 
          <div className="quiz-card">
            <p>{flashcards[currentCardIndex].question}</p>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your answer"
            />
            <button onClick={checkAnswer}>Check Answer</button>
            {feedback && <p>{feedback}</p>}
            <button onClick={nextCard}>Next Card</button>
          </div>
        </div>
      ) : (
        <>
          <AddFlashcard addFlashcard={addFlashcard} />
          <button onClick={shuffleFlashcards}>Shuffle Flashcards</button>
          <button onClick={startQuiz} disabled={flashcards.length === 0}>
            Start Quiz
          </button>
          {elapsedTime && (
            <p>
              Your last quiz took <strong>{elapsedTime} seconds</strong> with a score of <strong>{score}/{flashcards.length}</strong>.
            </p>
          )}
          <FlashcardList flashcards={flashcards} deleteFlashcard={deleteFlashcard} />
        </>
      )}
    </div>
  );
}

export default App;
