interface IPlayers {
  _id: string;
  name: string;
  position: number;
  stack: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const usePlayers = defineStore({
  id: "players",

  state: () => ({
    players: [] as IPlayers[],
  }),

  actions: {
    setPlayers(players: IPlayers[]) {
      this.players = players;
    },
  },
});
