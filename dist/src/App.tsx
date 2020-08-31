import * as React from "react";
import shuffle from "lodash/shuffle";
import "./App.css";

// image for the pokemon
// https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png
interface Pokemon {
  id: number;
  name: string;
}
let pokemon: Pokemon[] = [];
pokemon = [
  { id: 4, name: "charizard" },
  { id: 10, name: "caterpie" },
  { id: 77, name: "ponyta" },
  { id: 108, name: "lickitung" },
  { id: 132, name: "ditto" },
  { id: 133, name: "eevee" },
];

const doublePokemon = shuffle([...pokemon, ...pokemon]);

export default function App() {
  const [opened, setOpened] = React.useState<number[]>([]); //using index
  const [matched, setMatched] = React.useState<number[]>([]); // pokemon.id
  const [moves, setMoves] = React.useState<number>(0);

  //check if there is a match for the flipped card
  React.useEffect(() => {
    //if there are two in the opened array, check if they match
    if (opened.length < 2) return;
    const firstPokemon = doublePokemon[opened[0]];
    const secondPokemon = doublePokemon[opened[1]];

    if (firstPokemon.name === secondPokemon.name)
      setMatched((matched) => [...matched, firstPokemon.id]);
  }, [opened]);

  //clear card, after cards have been flipped
  React.useEffect(() => {
    if (opened.length === 2) setTimeout(() => setOpened([]), 800);
  }, [opened]);

  //check if ther is a winner
  React.useEffect(() => {
    if ((matched.length = pokemon.length)) alert("You Won!");
  }, [matched]);

  function flipCard(index: number) {
    // if same card was clicked
    if (opened.includes(index)) return;

    setMoves((moves) => moves + 1);
    setOpened((opened) => [...opened, index]);
  }

  return (
    <div className="app">
      <>
        <span>
          <h1>Find the matching Pokemon</h1>
          <p>
            {moves} <strong>moves</strong>
          </p>
        </span>
      </>
      <div className="cards">
        {doublePokemon.map((pokemon, index) => {
          let isFlipped: boolean = false;
          //do some logic to check if flipped
          if (opened.includes(index)) isFlipped = true;
          if (matched.includes(pokemon.id)) isFlipped = true;

          return (
            <PokemonCard
              key={index}
              index={index}
              pokemon={pokemon}
              isFlipped={isFlipped}
              flipCard={flipCard}
            />
          );
        })}
      </div>
    </div>
  );
}
interface IProps {
  index: number;
  pokemon: Pokemon;
  isFlipped: boolean;
  flipCard: (index: number) => void;
}
const PokemonCard: React.FC<IProps> = ({
  index,
  pokemon,
  isFlipped,
  flipCard,
}) => {
  return (
    <button
      className={`pokemon-card ${isFlipped ? "flipped" : ""}`}
      onClick={() => flipCard(index)}
    >
      <div className="inner">
        <div className="front">
          <img
            src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`}
            alt={pokemon.name}
            width="100"
          />
        </div>
        <div className="back">?</div>
      </div>
    </button>
  );
};
