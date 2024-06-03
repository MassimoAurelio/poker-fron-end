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
  currentPlayerId: boolean;
  fold: boolean;
  lastBet: number;
  preFlopLastBet: number;
  flopLastBet: number;
  turnLastBet: number;
  riverLastBet: number;
  cards: ICard[];
  roundStage: string;
}
interface IFlop {
  flopCards: ICard[];
}

export const usePlayers = defineStore({
  id: "players",

  state: () => ({
    players: [] as IPlayers[],
    flop: {} as IFlop,
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
    setTurn(flop: IFlop) {
      this.flop = flop;
    },
    setRiver(flop: IFlop) {
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
