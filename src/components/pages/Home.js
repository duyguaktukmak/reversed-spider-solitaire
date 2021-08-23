import React, { useEffect, useState } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {
  dragStart,
  drag,
  dragEnter,
  selectCard,
  drop,
  distributeRemCards,
  populateCards
} from "../../utils/helper"
import CardHolder from "../CardHolder";
import Card from "../Card";
import Back from "../Back";

import "./Home.css";

function Home() {
  const [cards, setcards] = useState({});
  const [game, setgame] = useState({
    cards: [],
    decks: [],
    selectedCard: "",
    selectedDeck: "",
    selected: [],
    hands: 0,
    x: -1,
    y: -1,
    highlightedDeck: "",
    highlightedCard: "",
  });
  useEffect(() => {
    const val = populateCards();
    setcards(val);
    setgame((prevState) => ({
      ...prevState,
      cards: val.cards,
      decks: val.decks,
    }));
  }, []);

  const x = list => {
    console.log(list.slice(0, 10))
  }

  const obj = [
    [
      {
        "rank": "8",
        "suit": "spade",
        "isDown": true,
        "deck": 6,
        "isSelected": false,
        "isHighlighted": false
      },
      {
        "rank": "4",
        "suit": "spade",
        "isDown": true,
        "deck": 3,
        "isSelected": false,
        "isHighlighted": false
      },
      {
        "rank": "10",
        "suit": "spade",
        "isDown": true,
        "deck": 5,
        "isSelected": false,
        "isHighlighted": false
      },
      {
        "rank": "K",
        "suit": "spade",
        "isDown": true,
        "deck": 6,
        "isSelected": false,
        "isHighlighted": false
      },
      {
        "rank": "10",
        "suit": "spade",
        "isDown": true,
        "deck": 7,
        "isSelected": false,
        "isHighlighted": false
      },
      {
        "rank": "A",
        "suit": "spade",
        "isDown": false,
        "deck": 8,
        "isSelected": false,
        "isHighlighted": false
      }
    ],
    [
      {
        "rank": "A",
        "suit": "spade",
        "isDown": true,
        "deck": 4,
        "isSelected": false,
        "isHighlighted": false
      },
      {
        "rank": "J",
        "suit": "spade",
        "isDown": true,
        "deck": 6,
        "isSelected": false,
        "isHighlighted": false
      },
      {
        "rank": "5",
        "suit": "spade",
        "isDown": true,
        "deck": 5,
        "isSelected": false,
        "isHighlighted": false
      },
      {
        "rank": "6",
        "suit": "spade",
        "isDown": true,
        "deck": 6,
        "isSelected": false,
        "isHighlighted": false
      },
      {
        "rank": "K",
        "suit": "spade",
        "isDown": true,
        "deck": 2,
        "isSelected": false,
        "isHighlighted": false
      },
      {
        "rank": "5",
        "suit": "spade",
        "isDown": false,
        "deck": 4,
        "isSelected": false,
        "isHighlighted": false
      }
    ],
    [
      {
        "rank": "J",
        "suit": "spade",
        "isDown": true,
        "deck": 3,
        "isSelected": false,
        "isHighlighted": false
      },
      {
        "rank": "2",
        "suit": "spade",
        "isDown": true,
        "deck": 1,
        "isSelected": false,
        "isHighlighted": false
      },
      {
        "rank": "8",
        "suit": "spade",
        "isDown": true,
        "deck": 4,
        "isSelected": false,
        "isHighlighted": false
      },
      {
        "rank": "8",
        "suit": "spade",
        "isDown": true,
        "deck": 5,
        "isSelected": false,
        "isHighlighted": false
      },
      {
        "rank": "A",
        "suit": "spade",
        "isDown": true,
        "deck": 5,
        "isSelected": false,
        "isHighlighted": false
      },
      {
        "rank": "6",
        "suit": "spade",
        "isDown": false,
        "deck": 7,
        "isSelected": false,
        "isHighlighted": false
      }
    ],
    [
      {
        "rank": "4",
        "suit": "spade",
        "isDown": true,
        "deck": 4,
        "isSelected": false,
        "isHighlighted": false
      },
      {
        "rank": "J",
        "suit": "spade",
        "isDown": true,
        "deck": 2,
        "isSelected": false,
        "isHighlighted": false
      },
      {
        "rank": "Q",
        "suit": "spade",
        "isDown": true,
        "deck": 4,
        "isSelected": false,
        "isHighlighted": false
      },
      {
        "rank": "Q",
        "suit": "spade",
        "isDown": true,
        "deck": 3,
        "isSelected": false,
        "isHighlighted": false
      },
      {
        "rank": "7",
        "suit": "spade",
        "isDown": true,
        "deck": 6,
        "isSelected": false,
        "isHighlighted": false
      },
      {
        "rank": "A",
        "suit": "spade",
        "isDown": false,
        "deck": 3,
        "isSelected": false,
        "isHighlighted": false
      }
    ],
    [
      {
        "rank": "2",
        "suit": "spade",
        "isDown": true,
        "deck": 6,
        "isSelected": false,
        "isHighlighted": false
      },
      {
        "rank": "3",
        "suit": "spade",
        "isDown": true,
        "deck": 6,
        "isSelected": false,
        "isHighlighted": false
      },
      {
        "rank": "2",
        "suit": "spade",
        "isDown": true,
        "deck": 2,
        "isSelected": false,
        "isHighlighted": false
      },
      {
        "rank": "7",
        "suit": "spade",
        "isDown": true,
        "deck": 8,
        "isSelected": false,
        "isHighlighted": false
      },
      {
        "rank": "K",
        "suit": "spade",
        "isDown": false,
        "deck": 7,
        "isSelected": false,
        "isHighlighted": false
      }
    ],
    [
      {
        "rank": "6",
        "suit": "spade",
        "isDown": true,
        "deck": 3,
        "isSelected": false,
        "isHighlighted": false
      },
      {
        "rank": "6",
        "suit": "spade",
        "isDown": true,
        "deck": 2,
        "isSelected": false,
        "isHighlighted": false
      },
      {
        "rank": "K",
        "suit": "spade",
        "isDown": true,
        "deck": 3,
        "isSelected": false,
        "isHighlighted": false
      },
      {
        "rank": "J",
        "suit": "spade",
        "isDown": true,
        "deck": 8,
        "isSelected": false,
        "isHighlighted": false
      },
      {
        "rank": "10",
        "suit": "spade",
        "isDown": false,
        "deck": 8,
        "isSelected": false,
        "isHighlighted": false
      }
    ],
    [
      {
        "rank": "4",
        "suit": "spade",
        "isDown": true,
        "deck": 1,
        "isSelected": false,
        "isHighlighted": false
      },
      {
        "rank": "8",
        "suit": "spade",
        "isDown": true,
        "deck": 2,
        "isSelected": false,
        "isHighlighted": false
      },
      {
        "rank": "9",
        "suit": "spade",
        "isDown": true,
        "deck": 5,
        "isSelected": false,
        "isHighlighted": false
      },
      {
        "rank": "3",
        "suit": "spade",
        "isDown": true,
        "deck": 8,
        "isSelected": false,
        "isHighlighted": false
      },
      {
        "rank": "Q",
        "suit": "spade",
        "isDown": false,
        "deck": 6,
        "isSelected": false,
        "isHighlighted": false
      }
    ],
    [
      {
        "rank": "7",
        "suit": "spade",
        "isDown": true,
        "deck": 4,
        "isSelected": false,
        "isHighlighted": false
      },
      {
        "rank": "10",
        "suit": "spade",
        "isDown": true,
        "deck": 3,
        "isSelected": false,
        "isHighlighted": false
      },
      {
        "rank": "2",
        "suit": "spade",
        "isDown": true,
        "deck": 4,
        "isSelected": false,
        "isHighlighted": false
      },
      {
        "rank": "5",
        "suit": "spade",
        "isDown": true,
        "deck": 7,
        "isSelected": false,
        "isHighlighted": false
      },
      {
        "rank": "10",
        "suit": "spade",
        "isDown": false,
        "deck": 2,
        "isSelected": false,
        "isHighlighted": false
      }
    ],
    [
      {
        "rank": "9",
        "suit": "spade",
        "isDown": true,
        "deck": 7,
        "isSelected": false,
        "isHighlighted": false
      },
      {
        "rank": "10",
        "suit": "spade",
        "isDown": true,
        "deck": 6,
        "isSelected": false,
        "isHighlighted": false
      },
      {
        "rank": "8",
        "suit": "spade",
        "isDown": true,
        "deck": 1,
        "isSelected": false,
        "isHighlighted": false
      },
      {
        "rank": "7",
        "suit": "spade",
        "isDown": true,
        "deck": 5,
        "isSelected": false,
        "isHighlighted": false
      },
      {
        "rank": "2",
        "suit": "spade",
        "isDown": false,
        "deck": 3,
        "isSelected": false,
        "isHighlighted": false
      }
    ],
    [
      {
        "rank": "4",
        "suit": "spade",
        "isDown": true,
        "deck": 5,
        "isSelected": false,
        "isHighlighted": false
      },
      {
        "rank": "10",
        "suit": "spade",
        "isDown": true,
        "deck": 4,
        "isSelected": false,
        "isHighlighted": false
      },
      {
        "rank": "2",
        "suit": "spade",
        "isDown": true,
        "deck": 8,
        "isSelected": false,
        "isHighlighted": false
      },
      {
        "rank": "3",
        "suit": "spade",
        "isDown": true,
        "deck": 3,
        "isSelected": false,
        "isHighlighted": false
      },
      {
        "rank": "4",
        "suit": "spade",
        "isDown": false,
        "deck": 8,
        "isSelected": false,
        "isHighlighted": false
      }
    ]
  ];

  return (
    <div className="onesuite">
      {cards.hasOwnProperty("decks") &&
        x(game.decks) &&
        obj.map((deck, index) => (
          <React.Fragment>
            {deck.length == 0 ? (
              <div
                id="holder"
                key={index + "0"}
                onClick={() => {
                  selectCard("", deck, true, game, setgame);
                }}
                onDragEnter={(e) => {
                  dragEnter(e, game, setgame, "", deck);
                }}
              >
                <CardHolder key={index + " 1"} deck={deck} />
              </div>
            ) : (
              <div key={index + " 2"} deck={deck}>
                <ReactCSSTransitionGroup
                  transitionName="card"
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={300}
                  key={index + " 3"}
                  deck={deck}
                >
                  {deck.map((card, key) => (
                    <div
                      key={card.rank + " " + card.suit + " " + card.deck + " 0"}
                      id={card.rank + " " + card.suit + " " + card.deck}
                      className="card__wrapper card__stack"
                      draggable={true}
                      onDragStart={(e) => {
                        dragStart(e, card, deck, game, setgame);
                      }}
                      onDrag={(e) => {
                        drag(e, card, game, setgame);
                      }}
                      onDragEnter={(e) => {
                        if (card.isDown == false) {
                          dragEnter(e, game, setgame, card, deck);
                        }
                      }}
                      onDragEnd={(e) => {
                        drop(e, card, game, setgame);
                      }}
                      onClick={(e) => {
                        selectCard(card, deck, null, game, setgame);
                      }}
                    >
                      <Card
                        key={card.rank + " " + card.suit + " " + card.deck}
                        card={card}
                        isSelected={card.isSelected}
                        isDown={card.isDown}
                        isHighlighted={card.isHighlighted}
                      />
                    </div>
                  ))}
                </ReactCSSTransitionGroup>
              </div>
            )}
          </React.Fragment>
        ))}
      {cards.hasOwnProperty("decks") && game.decks[10].length > 0 && (
        <div
          onClick={(e) => {
            distributeRemCards(game, setgame);
          }}
          className="card card__down card__remcards"
        ></div>
      )}
    </div>
  );
}

export default Home;
