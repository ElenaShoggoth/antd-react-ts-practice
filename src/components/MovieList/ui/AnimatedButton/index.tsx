import React, { useState } from "react";
import "./AnimatedButton.css";

export const AnimatedButton = ({
  handleClickButton,
  title,
}: {
  handleClickButton: any;
  title: string;
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    handleClickButton();
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 500); // Длительность анимации в миллисекундах
  };

  return (
    <button
      className={`animated-button ${isAnimating ? "animate" : ""}`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};
