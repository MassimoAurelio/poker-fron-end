<script setup lang="ts">
import { useTogglePopup } from "@/store/useTogglePopup";
import { usePlayers } from "~/store/usePlayers";
const playersStore = usePlayers();

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

const leaveAndGetInfo = async (player: string) => {
  try {
    await leaveFromTable(player);
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
    const data = await response.json();
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  await getInfo();
});
</script>

<template>
  <p>За столом сидят</p>
  <div
    class="table-info"
    v-for="item in playersStore.players"
    :key="item.position"
  >
    <p>{{ item?.name }}</p>
  </div>
  <div class="main-container">
    <div class="table">
      <div class="first">
        <!-- Player 1 -->
        <Icon
          class="table-position"
          name="fluent-emoji-flat:wheelchair-symbol"
          @click="joinAndGetInfo(1)"
          v-if="
            playersStore.players.some((player) => player.name === 'Player 1')
          "
        ></Icon>
        <Icon
          class="table-position"
          name="flat-color-icons:plus"
          @click="joinAndGetInfo(1)"
          v-if="
            !playersStore.players.some((player) => player.name === 'Player 1')
          "
        ></Icon>
        <Icon
          class="table-position"
          name="pepicons-pop:leave"
          @click="leaveAndGetInfo(`Player 1`)"
          v-if="
            playersStore.players.some((player) => player.name === 'Player 1')
          "
        ></Icon>

        <!-- Player 2 -->

        <Icon
          class="table-position"
          name="fluent-emoji-flat:wheelchair-symbol"
          @click="joinAndGetInfo(2)"
          v-if="
            playersStore.players.some((player) => player.name === 'Player 2')
          "
        ></Icon>
        <Icon
          class="table-position"
          name="flat-color-icons:plus"
          @click="joinAndGetInfo(2)"
          v-if="
            !playersStore.players.some((player) => player.name === 'Player 2')
          "
        ></Icon>
        <Icon
          class="table-position"
          name="pepicons-pop:leave"
          @click="leaveAndGetInfo(`Player 2`)"
          v-if="
            playersStore.players.some((player) => player.name === 'Player 2')
          "
        ></Icon>

        <!-- Player 3 -->

        <Icon
          class="table-position"
          name="fluent-emoji-flat:wheelchair-symbol"
          @click="joinAndGetInfo(3)"
          v-if="
            playersStore.players.some((player) => player.name === 'Player 3')
          "
        ></Icon>
        <Icon
          class="table-position"
          name="flat-color-icons:plus"
          @click="joinAndGetInfo(3)"
          v-if="
            !playersStore.players.some((player) => player.name === 'Player 3')
          "
        ></Icon>
        <Icon
          class="table-position"
          name="pepicons-pop:leave"
          @click="leaveAndGetInfo(`Player 3`)"
          v-if="
            playersStore.players.some((player) => player.name === 'Player 3')
          "
        ></Icon>
      </div>

      <!--  Player 4 -->
      <div class="second">
        <Icon
          class="table-position"
          name="fluent-emoji-flat:wheelchair-symbol"
          @click="joinAndGetInfo(4)"
          v-if="
            playersStore.players.some((player) => player.name === 'Player 4')
          "
        ></Icon>
        <Icon
          class="table-position"
          name="flat-color-icons:plus"
          @click="joinAndGetInfo(4)"
          v-if="
            !playersStore.players.some((player) => player.name === 'Player 4')
          "
        ></Icon>
        <Icon
          class="table-position"
          name="pepicons-pop:leave"
          @click="leaveAndGetInfo(`Player 4`)"
          v-if="
            playersStore.players.some((player) => player.name === 'Player 4')
          "
        ></Icon>

        <!-- Player 5 -->
        <Icon
          class="table-position"
          name="fluent-emoji-flat:wheelchair-symbol"
          @click="joinAndGetInfo(5)"
          v-if="
            playersStore.players.some((player) => player.name === 'Player 5')
          "
        ></Icon>
        <Icon
          class="table-position"
          name="flat-color-icons:plus"
          @click="joinAndGetInfo(5)"
          v-if="
            !playersStore.players.some((player) => player.name === 'Player 5')
          "
        ></Icon>
        <Icon
          class="table-position"
          name="pepicons-pop:leave"
          @click="leaveAndGetInfo(`Player 5`)"
          v-if="
            playersStore.players.some((player) => player.name === 'Player 5')
          "
        ></Icon>

        <!--  'Player 6 -->
        <Icon
          class="table-position"
          name="fluent-emoji-flat:wheelchair-symbol"
          @click="joinAndGetInfo(6)"
          v-if="
            playersStore.players.some((player) => player.name === 'Player 6')
          "
        ></Icon>
        <Icon
          class="table-position"
          name="flat-color-icons:plus"
          @click="joinAndGetInfo(6)"
          v-if="
            !playersStore.players.some((player) => player.name === 'Player 6')
          "
        ></Icon>
        <Icon
          class="table-position"
          name="pepicons-pop:leave"
          @click="leaveAndGetInfo(`Player 6`)"
          v-if="
            playersStore.players.some((player) => player.name === 'Player 6')
          "
        ></Icon>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.table-info {
  display: flex;
  flex-direction: column;
}
.main-container {
  padding: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 25px;

  .table {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 150px;
    width: 500px;
    height: 250px;
    background-color: rgb(35, 110, 54);

    border: solid orange;
    border-width: 15px;
    border-radius: 90px;

    .table-position {
      width: 50px;
      height: 50px;
      text-align: center;
      line-height: 50px;
      z-index: 1;
    }

    .first {
      display: flex;
      justify-content: space-between;
      gap: 35px;
    }
    .second {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 35px;
    }
  }
}
</style>
