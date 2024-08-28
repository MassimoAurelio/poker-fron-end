interface ICard {
	value: string
	suit: string
	_id: string
}

interface IPlayer {
	id: string
	name: string
	stack: number
	position: number
	roomId: string
	isDealer: boolean
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
	allIn: boolean | null
	allInColl: boolean | null
	loser: boolean
	winner: boolean
	createdAt: string
	updatedAt: string
}

interface IFlop {
	tableCards: ICard[]
}

export const usePlayers = defineStore({
	id: 'players',

	state: () => ({
		players: [] as IPlayer[],
		tableCards: [] as ICard[],
		cards: {} as IFlop,
		flopGiven: false,
	}),

	actions: {
		setPlayers(players: IPlayer[]) {
			this.players = players
		},
		getPlayers() {
			return this.players
		},
		getTableCards() {
			return this.tableCards
		},
		removePlayer(name: string) {
			this.players = this.players.filter(player => player.name !== name)
		},
		setFlop(tableCards: ICard[]) {
			this.tableCards = tableCards
		},
		setCards(cards: IFlop) {
			this.cards = cards
		},
		markFlopGiven() {
			this.flopGiven = true
		},
		clearFlop() {
			this.tableCards = []
		},
		updatePlayerFoldStatus(playerData: IPlayer) {
			const playerIndex = this.players.findIndex(
				player => player.id === playerData.id
			)
			if (playerIndex !== -1) {
				this.players.splice(playerIndex, 1, { ...playerData })
			} else {
				this.players.push(playerData)
			}
		},
	},
})
