import type { IConfigApiMethods } from '@/shared/interfaces/apiInterfaces.ts'

export const BASE_URL: string = 'http://localhost:5001/'

export const apiPaths = {
	NEXT_PLAYER: 'nextplayer',
	COLL: 'coll',
	JOIN: 'join',
	LEAVE: 'leave',
	PLAYERS: 'players',
	FOLD: 'fold',
	RAISE: 'raise',
	UPDATEPOSITION: 'updatepos',
	MBBB: 'mbbb',
	DEAL: 'deal',
	GIVEFLOP: 'giveflop',
	TURN: 'turn',
	RIVER: 'river',
	WINNER: 'winner',
	CHECK: 'check',
}

export const methods: IConfigApiMethods = {
	nextPlayer: {
		path: BASE_URL + apiPaths.NEXT_PLAYER,
		cache: false,
		method: 'GET',
	},
	coll: {
		path: BASE_URL + apiPaths.COLL,
		cache: false,
		method: 'GET',
	},
	join: {
		path: BASE_URL + apiPaths.JOIN,
		cache: false,
		method: 'GET',
	},
	leave: {
		path: BASE_URL + apiPaths.LEAVE,
		cache: false,
		method: 'POST',
	},
	fold: {
		path: BASE_URL + apiPaths.FOLD,
		cache: false,
		method: 'POST',
	},
}
