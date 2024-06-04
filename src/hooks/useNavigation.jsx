import { useState, useEffect } from "react";

export const useNavigation = (rows, cols, buttonCount) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleKeyDown = (e) => {
    const totalItems = rows * cols + buttonCount;
    switch (e.key) {
      case "ArrowUp":
        setActiveIndex((prev) => (prev - cols + totalItems) % totalItems);
        break;
      case "ArrowDown":
        setActiveIndex((prev) => (prev + cols) % totalItems);
        break;
      case "ArrowLeft":
        setActiveIndex((prev) => (prev - 1 + totalItems) % totalItems);
        break;
      case "ArrowRight":
        setActiveIndex((prev) => (prev + 1) % totalItems);
        break;
      case "Enter":
        e.preventDefault();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return [activeIndex, setActiveIndex];
};
