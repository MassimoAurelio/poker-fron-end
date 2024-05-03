<script setup lang="ts">
import { usePlayers } from "~/store/usePlayers";
const playersStore = usePlayers();

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: Number,
    required: true,
  },
});

const joinTable = async (position: number) => {
  try {
    const response = await fetch("http://localhost:5000/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        player: `Player ${position}`,
        stack: 1000,
        position: position,
      }),
    });

    if (!response.ok) {
      throw new Error("Ошибка при отправке данных");
    }
    const data = await response.json();

    playersStore.setPlayers(data);
  } catch (error) {
    console.error(error);
  }
};

const getInfo = async () => {
  try {
    const response = await fetch("http://localhost:5000/players");
    if (!response.ok) {
      throw new Error("Ошибка при получении данных");
    }
    const data = await response.json();
    playersStore.setPlayers(data);
  } catch (error) {
    console.error(error);
  }
};

const joinAndGetInfo = async (position: number) => {
  try {
    await joinTable(position);
    await getInfo();
  } catch (error) {
    console.error(error);
  }
};

const leaveFromTable = async (player: string) => {
  try {
    const response = await fetch("http://localhost:5000/leave", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        player: player,
      }),
    });
    if (!response.ok) {
      throw new Error("Ошибка при выполнении запроса");
    }
  } catch (error) {
    console.error(error);
  }
};

const leaveAndGetInfo = async (player: string) => {
  try {
    await leaveFromTable(player);
    await getInfo();
  } catch (error) {
    console.error(error);
  }
};

function createIconComputed(position: number) {
  return computed(() => {
    return playersStore.players.some((player) => player.position === position)
      ? "fluent-emoji-flat:wheelchair-symbol"
      : "flat-color-icons:plus";
  });
}
</script>

<template>
  <div class="player">
    <Icon
      class="table-position"
      size="50"
      :name="createIconComputed(props.position).value"
      @click="joinAndGetInfo(props.position)"
    />
    <Icon
      class="table-position"
      size="50"
      name="pepicons-pop:leave"
      @click="leaveAndGetInfo(props.name)"
      v-if="playersStore.players.some((player) => player.name === props.name)"
    />
  </div>
</template>

<style scoped lang="scss">
.player {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
