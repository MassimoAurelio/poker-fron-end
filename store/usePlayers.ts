interface ICard {
	value: string
	suit: string
	_id: string
}

interface IPlayers {
	id: string
	name: string
	stack: number
	position: number
	roomId: string
	currentPlayerId: boolean
	fold: boolean
	lastBet: number
	preFlopLastBet: number
	flopLastBet: number
	turnLastBet: number
	riverLastBet: number
	makeTurn: boolean
	cards: ICard[]
	roundStage: string
	allIn: boolean
	allInColl: boolean
	loser: boolean
}

interface IFlop {
	flop: {
		tableCards: ICard[]
	}
}

export const usePlayers = defineStore({
	id: 'players',

	state: () => ({
		players: [] as IPlayers[],
		flop: { flop: { tableCards: [] } } as IFlop,
		cards: {} as IFlop,
		flopGiven: false,
	}),

	actions: {
		setPlayers(players: IPlayers[]) {
			this.players = players
			localStorage.setItem('players', JSON.stringify(players))
		},
		getPlayers() {
			return this.players
		},

		removePlayer(nickname: string) {
			this.players = this.players.filter(player => player.name !== nickname)
		},
		removePlayerAndUpdateStorage(nickname: string) {
			this.removePlayer(nickname)
			const players = localStorage.getItem('players')
			if (players) {
				let parsePlayers = JSON.parse(players)
				parsePlayers = parsePlayers.filter(
					(player: IPlayers) => player.name !== nickname
				)
				localStorage.setItem('players', JSON.stringify(parsePlayers))
			}
		},
		setFlop(flop: IFlop) {
			this.flop = flop
		},
		setCards(cards: IFlop) {
			this.cards = cards
		},
		markFlopGiven() {
			this.flopGiven = true
		},
		clearFlop() {
			this.flop.flop.tableCards = []
		},
	},
})
