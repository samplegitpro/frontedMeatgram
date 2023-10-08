import React from 'react';

function capitalizeFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function ScrollButton({ items }) {
  return (
    <div className="scroll-button">
      {items && items.map((item, index) => (
        <a key={index} href={`#${item.id}`}>
          {item.label.split(' ').map(capitalizeFirstLetter).join(' ')}
        </a>
      ))}
    </div>
  );
}

export default ScrollButton;
