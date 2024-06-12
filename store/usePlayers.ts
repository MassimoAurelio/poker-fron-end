interface ICard {
  value: string;
  suit: string;
  _id: string;
}

interface IPlayers {
  id: string;
  name: string;
  stack: number;
  position: number;
  roomId: string;
  currentPlayerId: boolean;
  fold: boolean;
  lastBet: number;
  preFlopLastBet: number;
  flopLastBet: number;
  turnLastBet: number;
  riverLastBet: number;
  makeTurn: boolean;
  cards: ICard[];
  roundStage: string;
}

interface IFlop {
  flop: {
    tableCards: ICard[];
  };
}

export const usePlayers = defineStore({
  id: "players",

  state: () => ({
    players: [] as IPlayers[],
    flop: { flop: { tableCards: [] } } as IFlop,
    cards: {} as IFlop,
    flopGiven: false,
  }),

  actions: {
    setPlayers(players: IPlayers[]) {
      this.players = players;
    },
    setFlop(flop: IFlop) {
      this.flop = flop;
    },
    setCards(cards: IFlop) {
      this.cards = cards;
    },
    markFlopGiven() {
      this.flopGiven = true;
    },
  },
});