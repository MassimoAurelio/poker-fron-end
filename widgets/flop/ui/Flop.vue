<script setup lang="ts">
import { usePlayers } from '~/store/usePlayers'
const playersStore = usePlayers()

const totalPot = () => {
	const returnLastBet = () => {
		return playersStore.players.map(item => item.lastBet)
	}

	const lastBet = returnLastBet()
	return lastBet.reduce((acc, bet) => acc + bet, 0)
}

function getColorForSuit(suit: string) {
	if (suit === '♥') {
		return 'rgb(233, 123, 136)'
	} else if (suit === '♣') {
		return 'rgb(122, 167, 255)'
	} else if (suit === '♦') {
		return 'rgb(234, 166, 128)'
	} else if (suit === '♠') {
		return 'rgb(152, 222, 227)'
	}
}
</script>

<template>
	<div class="total-pot">TOTAL POT: {{ totalPot() }}</div>
	<div class="flop-container">
		<div
			class="flop-card"
			v-if="playersStore?.tableCards.length"
			v-for="(card, index) in playersStore.tableCards"
			:key="index"
		>
			<div :style="{ color: getColorForSuit(card.suit) }" class="flop-suite">
				{{ card.suit }}
			</div>
			<div class="flop-value" :style="{ color: getColorForSuit(card.suit) }">
				{{ card.value }}
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.flop-container {
	display: flex;
	gap: 10px;
	width: auto;
	height: 168px;

	.flop-card {
		position: relative;
		display: flex;
		flex-direction: column;
		width: 80px;
		height: 120px;
		border-radius: 3px;
		background: radial-gradient(
			98% 100% at 50% 100%,
			rgb(69, 84, 95),
			rgb(44, 58, 68) 100%
		);

		.flop-suite {
			position: absolute;
			width: 24px;
			height: 24px;
			top: 0;
			font-size: 30px;
			color: #e97b88;
		}
		.flop-value {
			position: absolute;
			width: 47px;
			height: 48px;
			font-size: 48px;
			font-weight: 400;
			top: 55px;
			right: 0px;
			color: #e97b88;
		}
	}
}
</style>
