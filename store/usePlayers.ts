interface IPlayers {
  id: string;
  name: string;
  position: number;
  stack: number;
  icon: string;
}

export const usePlayers = defineStore({
  id: "players",

  state: () => ({
    players: [] as IPlayers[],
    dealerPlayer: [] as IPlayers[],
    mbBBPlayers: [] as IPlayers[],
  }),

  actions: {
    setPlayers(players: IPlayers[]) {
      this.players = players;
    },

    setDealer(dealerPlayer: IPlayers[]) {
      this.dealerPlayer = dealerPlayer;
    },

    setMbBB(mbBBPlayers: IPlayers[]) {
      this.mbBBPlayers = mbBBPlayers;
    },
  },
});
