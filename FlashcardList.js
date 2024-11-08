import React from 'react';
import Flashcard from './Flashcard';

function FlashcardList({ flashcards, deleteFlashcard }) { 
  return (
    <div className="flashcard-list">
      {flashcards.map((flashcard, index) => (
        <Flashcard 
          key={flashcard.id} 
          flashcard={flashcard} 
          index={index} 
          deleteFlashcard={deleteFlashcard}
        />
      ))}
    </div>
  );
}

export default FlashcardList;
