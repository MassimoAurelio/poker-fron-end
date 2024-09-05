<script setup lang="ts">
import { useAuthStore } from '@/store/auth'
import socket from '@/utils/socket'

useSeoMeta({
	title: 'ROOMS PAGE',
})

const authStore = useAuthStore()
const router = useRouter()

const authField = {
	name: '',
	password: '',
}

const createRoom = (name: string, password: string) => {
	const formData = {
		name: name,
		password: password,
	}
	socket.emit('createRoom', formData)
}
const enterRoom = async (name: string, password: string) => {
	try {
		const formData = {
			name: name,
			password: password,
		}
		socket.emit('enterRoom', formData)
	} catch (error) {
		console.error(error)
	}
}

onMounted(() => {
	const token = localStorage.getItem('token')
	const username = localStorage.getItem('username')
	if (token && username) {
		authStore.login(token, { username: username })
	}

	socket.on('roomEnter', room => {
		router.push(`/room/${room.id}`)
	})
})
</script>

<template>
	<div class="main-container">
		<div class="create-room">
			<h1>Create Room</h1>
			<form @submit.prevent="createRoom(authField.name, authField.password)">
				<input type="text" placeholder="Room name" v-model="authField.name" />
				<input
					type="password"
					placeholder="Room password"
					v-model="authField.password"
				/>
				<button type="submit">Create</button>
			</form>
		</div>

		<div class="enter-room">
			<h1>Enter Room</h1>
			<form @submit.prevent="enterRoom(authField.name, authField.password)">
				<input type="text" placeholder="Room name" v-model="authField.name" />
				<input
					type="password"
					placeholder="Room password"
					v-model="authField.password"
				/>
				<button type="submit">Enter</button>
			</form>
		</div>
	</div>
</template>

<style scoped lang="scss">
.main-container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 15vh;

	.create-room,
	.enter-room {
		width: 300px;
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
}
</style>
