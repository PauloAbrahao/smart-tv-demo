import React from "react";
import "./App.css";
import SingleCard from "./component/SingleCard";
import { useNavigation } from "./hooks/useNavigation";

const cardImages = [
  { src: "./img/helmet-1.png", matched: false },
  { src: "./img/potion-1.png", matched: false },
  { src: "./img/ring-1.png", matched: false },
  { src: "./img/scroll-1.png", matched: false },
  { src: "./img/shield-1.png", matched: false },
  { src: "./img/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = React.useState([]);
  const [turns, setTurns] = React.useState(0);
  const [choiceOne, setChoiceOne] = React.useState(null);
  const [choiceTwo, setChoiceTwo] = React.useState(null);
  const [disabled, setDisabled] = React.useState(false);
  const rows = 3;
  const cols = 4;
  const [activeIndex, setActiveIndex] = useNavigation(rows, cols, 1);

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  React.useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurns();
      } else {
        setTimeout(() => resetTurns(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const resetTurns = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  React.useEffect(() => {
    shuffleCards();
  }, []);

  React.useEffect(() => {
    const handleEnterPress = (e) => {
      if (e.key === "Enter") {
        if (activeIndex < rows * cols) {
          handleChoice(cards[activeIndex]);
        } else {
          shuffleCards();
        }
      }
    };

    window.addEventListener("keydown", handleEnterPress);
    return () => {
      window.removeEventListener("keydown", handleEnterPress);
    };
  }, [activeIndex, cards, choiceOne]);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button
        onClick={shuffleCards}
        className={activeIndex === rows * cols ? "active" : ""}
      >
        Novo jogo
      </button>

      <div className="card-grid">
        {cards.map((card, index) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
            active={index === activeIndex}
          />
        ))}
      </div>
      <p>{turns}</p>
    </div>
  );
}

export default App;
