<script setup lang="ts">
import BaseCard from '@/shared/ui/BaseCard.vue'
import { useAuthStore } from '@/store/auth'
import { usePlayers } from '@/store/usePlayers'
import { NotActivePlayer, PlayerFooterInfo } from '@/widgets/player'
import { io } from 'socket.io-client'
import BaseLeaveButton from '~/shared/ui/BaseLeaveButton.vue'

const playersStore = usePlayers()
const authStore = useAuthStore()
const route = useRoute()
const roomId = route.params.id
const socket = io('http://localhost:5001')

const props = defineProps<{
	name: string
	roomId: string
}>()

const leaveFromTable = (name: string, roomId: string) => {
	const body = {
		name: name,
		roomId: roomId,
	}
	socket.emit('leaveUser', body)
}

socket.on('userLeave', leaveUser => {
	playersStore.removePlayer(leaveUser.name)
})

const isActivePlayer = computed(() => {
	return authStore.user?.username === props.name
})

const losers = computed(() => {
	return playersStore.players.filter(player => player.loser === true)
})

watch(
	losers,
	newLosers => {
		newLosers.forEach(newLoser => {
			leaveFromTable(newLoser.name, '666067c6d4a06d920d4cc7a5')
		})
	},
	{ immediate: true }
)
</script>

<template>
	<div class="active-player-container" v-if="isActivePlayer">
		<BaseCard :name="props.name" />
		<PlayerFooterInfo :name="props.name" />
		<BaseLeaveButton @click="leaveFromTable(props.name, props.roomId)" />
	</div>
	<NotActivePlayer :name="props.name" v-else />
</template>

<style scoped lang="scss">
.active-player-container {
	position: relative;
	display: flex;
	align-items: flex-end;
	width: 264px;
	height: 160px;

	.timer {
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 48px;
		height: 48px;
		left: -50px;
		top: 120px;
		border-radius: 80px;
	}
}

.Not-active-player-container {
	position: relative;
	display: flex;
	align-items: flex-end;
	width: 264px;
	height: 160px;

	.card-container {
		position: absolute;
		right: 0;
		top: 0;
		margin-right: 50px;
		display: flex;
		.first-card {
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
			width: 64px;
			height: 88px;
			font-size: 30px;
			padding: 5%;
			border-radius: 3px;
			box-shadow: -1px 0px 2px 0px rgba(20, 28, 33, 0.56);
			background: radial-gradient(
				98% 100% at 50% 100%,
				rgb(17, 92, 146),
				rgb(44, 58, 68) 100%
			);

			.foo {
				width: 100%;
				height: 100%;
				transform: rotate(180deg);
			}
		}
		.second-card {
			position: relative;
			width: 64px;
			height: 88px;
			font-size: 30px;
			border-radius: 3px;
			box-shadow: -1px 0px 2px 0px rgba(20, 28, 33, 0.56);
			background: radial-gradient(
				98% 100% at 50% 100%,
				rgb(17, 92, 146),
				rgb(44, 58, 68) 100%
			);
		}
	}
}
</style>
