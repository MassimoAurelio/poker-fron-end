<script setup lang="ts">
import Button from '@/shared/ui/BaseButton.vue'
import { usePlayers } from '@/store/usePlayers'
import { checkResponse, sendRequestWithBody } from '@/utils/api'
import socket from '@/utils/socket'

const route = useRoute()
const roomId = route.params.id

const props = defineProps({
	name: {
		type: String,
		required: true,
	},
	position: {
		type: Number,
		required: true,
	},
})

const sum = ref<number>(50)
const playersStore = usePlayers()

const makeFold = (name: string) => {
	socket.emit('fold', name)
}

const raise = async (name: string) => {
	try {
		const body = {
			name: name,
			raiseAmount: sum.value,
		}
		const response = await sendRequestWithBody(
			`${BASE_URL}${RAISE}`,
			'POST',
			body
		)
		checkResponse(response)

		await userTern()
	} catch (error) {
		console.error(error)
	}
}
const coll = async (name: string) => {
	try {
		const body = {
			name: name,
		}
		const response = await sendRequestWithBody(
			`${BASE_URL}${COLL}`,
			'POST',
			body
		)
		checkResponse(response)

		await userTern()
	} catch (error) {
		console.log(error)
	}
}

const userTern = async () => {
	try {
		const response = await sendRequest(`${BASE_URL}${NEXT_PLAYER}`, 'POST')
		checkResponse(response)
	} catch (error) {
		console.error(error)
	}
}

const check = async (name: string) => {
	try {
		const body = {
			name: name,
		}
		const response = await sendRequestWithBody(
			`${BASE_URL}${CHECK}`,
			'POST',
			body
		)
		checkResponse(response)

		await userTern()
	} catch (error) {
		console.error(error)
	}
}
const stack = () => {
	const player = playersStore.players.find(player => player.name === props.name)
	if (!player) {
		return 0
	}
	if (player?.roundStage === 'preflop') {
		return player.stack + player.lastBet
	} else {
		return player.stack
	}
}
/*
const time = ref(30)
let timer: NodeJS.Timeout | null = null

const tick = () => {
	time.value--
	if (time.value === 0) {
		fold(props.name)

		time.value = 30
	}
} */

onMounted(() => {
	/* 	timer = setInterval(tick, 1000) */
	socket.on('foldPlayer', foldUser => {
		playersStore.setPlayers(foldUser)
	})
})

onBeforeUnmount(() => {
	/* 	if (timer) {
		clearInterval(timer)
	} */
})
</script>

<template>
	<div class="main-container">
		<div class="second-buttons">
			<div class="up_buttons">
				<div class="buttons_">
					<Button color="default" size="S" radius="M">MIN</Button>
					<Button color="default" size="S" radius="M">3/4</Button>
					<Button color="default" size="S" radius="M">POT</Button>
					<Button color="default" size="S" radius="M">MAX</Button>
				</div>
				<input
					class="range_input"
					type="range"
					min="0"
					:max="stack()"
					v-model="sum"
				/>
			</div>
			<input class="input" type="number" v-model="sum" />
		</div>
		<div class="main-buttons">
			<Button @click="makeFold(props.name)" color="fold" size="M" radius="M"
				>FOLD</Button
			>
			<Button @click="check(props.name)" color="check" size="M" radius="M"
				>CHECK</Button
			>
			<Button @click="coll(props.name)" color="check" size="M" radius="M"
				>CALL</Button
			>
			<Button @click="raise(props.name)" color="bet" size="M" radius="M"
				>BET</Button
			>
		</div>
		<!-- <div class="timer">
			<p class="text">Time: {{ time }}</p>
		</div> -->
	</div>
</template>

<style scoped lang="scss">
.main-container {
	position: absolute;
	display: flex;
	flex-direction: column;
	gap: 24px;
	align-items: flex-end;
	width: 440px;
	height: 148px;
	left: 100px;
	top: 234px;
	bottom: 279px;

	.second-buttons {
		display: flex;
		gap: 10px;

		.up_buttons {
			display: flex;
			flex-direction: column;
			gap: 10px;

			cursor: pointer;
			.range_input {
				-webkit-appearance: none;
				width: 100%;
				height: 5px;
				outline: none;
				opacity: 0.7;
				transition: opacity 0.2s;
				border-radius: 26px;
				background: rgb(152, 222, 227);
			}
			.range_input::-webkit-slider-thumb {
				-webkit-appearance: none;
				appearance: none;
				width: 15px;
				height: 15px;
				background: rgb(214, 233, 253);
				border-radius: 50%;
				cursor: pointer;
			}
		}
		.input {
			width: 77px;
			height: 60px;
			left: 1901px;
			cursor: pointer;
			right: -1901px;
			top: 1148px;
			bottom: -1148px;
			border-radius: 1px;
			border: none;
			color: rgb(214, 233, 253);
			backdrop-filter: blur(2px);
			background: rgba(64, 82, 94, 0.24);

			.buttons_ {
				display: flex;
			}
		}
	}
	.main-buttons {
		display: flex;
		gap: 8px;
	}
}
</style>
