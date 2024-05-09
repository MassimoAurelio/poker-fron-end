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
  stack: number;
  icon: string;
  fold: boolean;
  lastBet: number;
  cards: ICard[];
}

export const usePlayers = defineStore({
  id: "players",

  state: () => ({
    players: [] as IPlayers[],
    showInput: false,
  }),

  actions: {
    setPlayers(players: IPlayers[]) {
      this.players = players;
    },
    toggleInput() {
      this.showInput = !this.showInput;
    },
    
  },
});
