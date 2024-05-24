interface ICard {
  value: string;
  suit: string;
  _id: string;
}

interface IPlayers {
  id: string;
  name: string;
  position: number;
  currentPlayerId: boolean;
  preflopEnd: boolean;
  flopEnd: boolean;
  ternEnd: boolean;
  riverEnd: boolean;
  stack: number;
  icon: string;
  fold: boolean;
  lastBet: number;
  roundStage: string;
  cards: ICard[];
}
interface IFlop {
  flopCards: ICard[];
}
export const usePlayers = defineStore({
  id: "players",

  state: () => ({
    players: [] as IPlayers[],
    flop: {} as IFlop,
  }),

  actions: {
    setPlayers(players: IPlayers[]) {
      this.players = players;
    },
    setFlop(flop: IFlop) {
      this.flop = flop;
    },
  },
});
