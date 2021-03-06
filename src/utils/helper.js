import * as _ from "lodash";
import cardInfo from "../utils/cardInfo";

export const populateCards = () => {
  let cards = [],
    decks, decks_part_2;
  cardInfo["rank"].forEach((rank) => {
    for (let i = 1; i <= 10; i++) {
      cards.push({
        rank: rank,
        suit: "spade",
        isDown: true,
        deck: i,
        isSelected: false,
        isHighlighted: false,
      });
    }
  });
  let shuffledCards = _.shuffle(cards);
  decks = _.chunk(shuffledCards.slice(0, 24), 6);
  decks_part_2 = _.chunk(shuffledCards.slice(24, 54), 5);
  decks  = decks.concat(decks_part_2);
  for (let i = 0; i <= 9; i++) {
    decks[i][decks[i].length - 1].isDown = false;
  }

  return {
    decks: decks,
    cards: shuffledCards,
  };
};

export const getRank = (rank) => {
  if (rank === "K" || rank === "Q" || rank === "J" || rank === "A") {
    switch (rank) {
      case "K":
        return 13;
      case "Q":
        return 12;
      case "J":
        return 11;
      case "A":
        return 1;
    }
  } else {
    return parseInt(rank);
  }
};

export const checkMovable = (card, deck) => {
  var tempDeck = [...deck];
  var movingCards = tempDeck.slice(deck.indexOf(card));
  var ranks = movingCards.map((curCard) => {
    return getRank(curCard.rank);
  });
  var curRank = getRank(card.rank);
  for (let i = 1; i < ranks.length; i++) {
    if (curRank - ranks[i] != 1) return false;
    curRank = ranks[i];
  }
  return true;
};

export const checkMove = (target, deck, game) => {
  if (
    target.suit == game.selectedCard.suit &&
    getRank(target.rank) - getRank(game.selectedCard.rank) == 1
  ) {
    if (deck.indexOf(target) == deck.length - 1) {
      return true;
    }
  }
  return false;
};

export const removeSelection = (game, setgame) => {
  if (game.selectedCard !== "" || game.highlightedCard !== "") {
    var decks = [...game.decks];
    for (let i = 0; i < decks.length; i++) {
      for (let j = 0; j < decks[i].length; j++) {
        decks[i][j].isSelected = false;
        decks[i][j].isHighlighted = false;
      }
    }
    setgame((prevState) => ({
      ...prevState,
      selected: [],
      decks: decks,
      selectedCard: "",
      selectedDeck: "",
      highlightedCard: "",
      highlightedDeck: "",
    }));
  }
};

export const dragStart = (event, card, deck, game, setgame) => {
  const x = event.pageX;
  const y = event.pageY;
  event.dataTransfer.setData("text", event.target.id);
  event.dataTransfer.setDragImage(new Image("0", "0"), -10, -10);
  setgame((prevState) => ({
    ...prevState,
    x: x,
    y: y,
  }));
  if (game.selectedCard === card) {
    return;
  }
  removeSelection(game, setgame);
  selectCard(card, deck, null, game, setgame);
};

export const drag = (event, card, game, setgame) => {
  game.selected.forEach((card) => {
    var child = document.getElementById(
      card.rank + " " + card.suit + " " + card.deck
    ).children[0];
    var movex = event.pageX - game.x;
    var movey = event.pageY - game.y;
    if (event.pageX == 0) {
      var css = "z-index:9999;transform:translate(0px,0px);display:none;";
    } else {
      var css =
        "z-index:9999;pointer-events: none; transform: scale(1.05, 1.05) rotate(0deg) translate(" +
        movex +
        "px, " +
        movey +
        "px);";
    }
    child.style.cssText = css;
  });
};

export const dragEnter = (event, game, setgame, card, deck) => {
  var tempDecks = [...game.decks];
  if (card === "" && game.selectedCard !== "") {
    tempDecks.forEach((deck) =>
      deck.forEach((tempCard) => (tempCard.isHighlighted = false))
    );
  } else if (card !== "" && card != game.selectedCard) {
    if (game.selected.indexOf(card) != -1) return;
    var deckIdx = tempDecks.indexOf(deck);
    var cardIdx = tempDecks[deckIdx].indexOf(card);
    if (cardIdx != tempDecks[deckIdx].length - 1) return;
    tempDecks.forEach((deck) =>
      deck.forEach((tempCard) => (tempCard.isHighlighted = false))
    );
    tempDecks[deckIdx][cardIdx].isHighlighted = true;
  }
  setgame((prevState) => ({
    ...prevState,
    highlightedCard: card,
    highlightedDeck: deck,
    decks: tempDecks,
  }));
};

export const moveCards = function (toDeck, fromDeck, fromCard, setgame, game) {
  var tempDeck = [...game.decks];
  var to = tempDeck.indexOf(toDeck);
  var from = tempDeck.indexOf(fromDeck);
  var cardIdx = tempDeck[from].indexOf(fromCard);

  var movedCards = tempDeck[from].splice(cardIdx);

  movedCards.forEach((card) => {
    tempDeck[to].push(card);
  });
  try {
    if (tempDeck[from][tempDeck[from].length - 1].isDown == true) {
      tempDeck[from][tempDeck[from].length - 1].isDown = false;
    }
  } catch (err) {
    console.log(err);
  }
  setgame((prevState) => ({
    ...prevState,
    decks: tempDeck,
  }));
};

export const selectCard = (card, deck, holder, game, setgame) => {
  // Handle drop of card on CardHolder(Blank) by click functionality
  if (holder && game.selectedCard !== "") {
    if (game.selectedCard.rank === "K") {
      moveCards(deck, game.selectedDeck, game.selectedCard, setgame, game);
      isHandComplete(deck, game, setgame);
      removeSelection(game, setgame);
    }
  }
  var tempCard = card;
  // Handling select card by on click and drag and drop
  if (game.selectedCard == "") {
    if (holder) return;
    if (card.isDown) {
      return;
    }

    if (checkMovable(card, deck)) {
      tempCard.isSelected = true;
      var tempDeck = [...deck];
      var selected = tempDeck.slice(deck.indexOf(card));
      selected.forEach((curCard) => {
        curCard.isSelected = true;
      });
      setgame((prevState) => ({
        ...prevState,
        selected: selected,
        selectedCard: card,
        selectedDeck: deck,
      }));
    }
  } else {
    // Handling moving of cards by click functionality
    if (checkMove(tempCard, deck, game)) {
      moveCards(deck, game.selectedDeck, game.selectedCard, setgame, game);
      isHandComplete(deck, game, setgame);
      removeSelection(game, setgame);
    } else {
      removeSelection(game, setgame);
    }
  }
};

// Function to handle when selected cards are dropped on some other cards
export const drop = (event, card, game, setgame) => {
  // Case when deck is empty ( Drop event occurs on CardHolder )
  if (game.highlightedCard == "") {
    if (card.rank == "K") {
      if (checkMovable(game.selectedCard, game.selectedDeck)) {
        moveCards(
          game.highlightedDeck,
          game.selectedDeck,
          game.selectedCard,
          setgame,
          game
        );
        isHandComplete(game.highlightedDeck, game, setgame);
        removeSelection(game, setgame);
      } else {
        removeSelection(game, setgame);
      }
    }
  }
  // Drop on cards Case
  if (checkMove(game.highlightedCard, game.highlightedDeck, game)) {
    if (checkMovable(game.selectedCard, game.selectedDeck)) {
      game.selected.forEach((card) => {
        var child = document.getElementById(
          card.rank + " " + card.suit + " " + card.deck
        ).children[0];
        var css = "z-index:0;pointer-events:auto;display:none;";
        child.style.cssText = css;
      });
      moveCards(
        game.highlightedDeck,
        game.selectedDeck,
        game.selectedCard,
        setgame,
        game
      );
      isHandComplete(game.highlightedDeck, game, setgame);
      removeSelection(game, setgame);
      return;
    } else {
      game.selected.forEach((card) => {
        var child = document.getElementById(
          card.rank + " " + card.suit + " " + card.deck
        ).children[0];
        var css = "z-index:0;pointer-events:auto;";
        child.style.cssText = css;
      });
      removeSelection(game, setgame);
    }
  } else {
    game.selected.forEach((card) => {
      var child = document.getElementById(
        card.rank + " " + card.suit + " " + card.deck
      ).children[0];
      var css = "z-index:0;pointer-events:auto;";
      child.style.cssText = css;
    });
    removeSelection(game, setgame);
  }
};

export const checkDeck = (deck) => {
  var ranks = deck.map((card) => {
    return getRank(card.rank);
  });
  const expectedArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  if (_.isEqual(expectedArray, ranks.slice(-13))) {
    return ranks.length - 13;
  }
  return false;
};

export const isHandComplete = (deck, game, setgame) => {
  var len = checkDeck(deck);
  if (len !== false) {
    var tempDecks = [...game.decks];
    var curDeckIdx = tempDecks.indexOf(deck);
    tempDecks[curDeckIdx].splice(len);
    var curHands = game.hands;
    if (tempDecks[curDeckIdx].length != 0) {
      tempDecks[curDeckIdx][tempDecks[curDeckIdx].length - 1].isDown = false;
    }
    setgame((prevState) => ({
      ...prevState,
      decks: tempDecks,
      hands: curHands + 1,
    }));
    // Game over case
    if (curHands + 1 === 8) console.log("Game Over");
  }
};

export const distributeRemCards = (game, setgame) => {
  if (game.decks[9].length !== 0) {
    var tempDecks = [...game.decks];
    tempDecks.forEach((tempDeck) => {
      if (tempDecks[9].length > 0) {
        var tempCard = tempDecks[9].pop();
        tempCard.isDown = false;
        tempDeck.push(tempCard);
      }
    });
    setgame((prevState) => ({
      ...prevState,
      decks: tempDecks,
    }));
    tempDecks.forEach((tempDeck) => {
      isHandComplete(tempDeck, game, setgame);
    });
  }
};
