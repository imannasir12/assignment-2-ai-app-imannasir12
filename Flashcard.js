import React, { useState } from 'react';

function Flashcard({ flashcard, deleteFlashcard }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="flashcard"
      style={{
        backgroundColor: flipped ? 'black' : flashcard.color, 
        color: flipped ? 'white' : 'black',
      }}
      onClick={() => setFlipped(!flipped)}
    >
      {flipped ? flashcard.answer : flashcard.question}
      <button
        className="delete-btn"
        onClick={(e) => {
          e.stopPropagation(); 
          deleteFlashcard(flashcard.id);
        }}
      >
        ×
      </button>
    </div>
  );
}

export default Flashcard;
