<script setup lang="ts">
import { usePlayers } from "~/store/usePlayers";
const playersStore = usePlayers();

useSeoMeta({
  title: "POKER",
});

const showInput = ref(false);

const toggleInput = () => {
  showInput.value = !showInput.value;
};

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
  } catch (error) {
    console.error(error);
  }
};

const updatepos = async () => {
  try {
    const response = await fetch("http://localhost:5000/updatepos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Ошибка при выполнении запроса");
    }
    await mbbb();
    await getInfo();
  } catch (error) {
    console.error(error);
  }
};

const mbbb = async () => {
  try {
    const response = await fetch("http://localhost:5000/mbbb", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Ошибка при выполнении запроса");
    }
  } catch (error) {
    console.error(error);
  }
};

const userTern = async () => {
  try {
    const response = await fetch("http://localhost:5000/nextplayer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Ошибка при выполнении запроса");
    }
    await getInfo();
  } catch (error) {
    console.error(error);
  }
};

const sum = ref("");

const raise = async (name: string) => {
  try {
    const response = await fetch("http://localhost:5000/raise", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        raiseAmount: sum.value,
      }),
    });
    if (!response.ok) {
      throw new Error("Ошибка при выполнении запроса");
    }
    showInput.value = false;
    await userTern();
  } catch (error) {
    console.error(error);
  }
};

const fold = async (name: string) => {
  try {
    const response = await fetch("http://localhost:5000/fold", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
      }),
    });
    if (!response.ok) {
      throw new Error("Ошибка при выполнении запроса");
    }
    await userTern();
    await getInfo();
  } catch (error) {
    console.error(error);
  }
};

const coll = async (name: string) => {
  try {
    const response = await fetch("http://localhost:5000/coll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
      }),
    });
    if (!response.ok) {
      throw new Error("Ошибка при выполнении запроса");
    }
    await userTern();
  } catch (error) {
    console.log(error);
  }
};

function createIconComputed(position: number) {
  return computed(() => {
    return playersStore.players.some((player) => player.position === position)
      ? "fluent-emoji-flat:wheelchair-symbol"
      : "flat-color-icons:plus";
  });
}

onMounted(async () => {
  await getInfo();
});
</script>

<template>
  <div class="info-container">
    <h1 v-if="playersStore.players.length === 0">Стол пуст</h1>
    <h1 v-else>За столом сидят</h1>

    <div
      class="table-info"
      v-for="item in playersStore.players"
      :key="item.position"
    >
      <p>{{ item?.name }},</p>
      <p>Stack: {{ item.stack }},</p>
      <p>Position{{ item.position }},</p>
    </div>
  </div>

  <button @click="updatepos">NEXT ROUND</button>

  <div class="main-container">
    <div class="table">
      <div class="first">
        <div class="player">
          <Icon
            class="table-position"
            :name="createIconComputed(1).value"
            @click="joinAndGetInfo(1)"
          />
          <Icon
            class="table-position"
            name="pepicons-pop:leave"
            @click="leaveAndGetInfo('Player 1')"
            v-if="
              playersStore.players.some((player) => player.name === 'Player 1')
            "
          />
          <Icon
            name="ph:poker-chip-fill"
            size="25"
            v-if="
              playersStore.players.some(
                (player) => player.name === 'Player 1' && player.position === 6
              )
            "
          />
          <div>{{ playersStore?.players[0]?.lastBet }}</div>
          <div
            v-if="
              playersStore.players.some(
                (player) =>
                  player.name === 'Player 1' && player.currentPlayerId === true
              )
            "
          >
            <div class="buttons">
              <button @click="fold('Player 1')">Fold</button>
              <div class="input">
                <button @click="toggleInput">Raise</button>
                <input v-if="showInput" v-model="sum" type="text" size="1" />

                <button v-if="showInput" @click="raise('Player 1')">
                  Raise
                </button>
              </div>
              <button @click="coll('Player 1')">Coll</button>

              <button @click="userTern">Bet</button>
            </div>
          </div>
        </div>

        <div class="player">
          <Icon
            class="table-position"
            :name="createIconComputed(2).value"
            @click="joinAndGetInfo(2)"
          ></Icon>
          <Icon
            class="table-position"
            name="pepicons-pop:leave"
            @click="leaveAndGetInfo('Player 2')"
            v-if="
              playersStore.players.some((player) => player.name === 'Player 2')
            "
          />

          <Icon
            name="ph:poker-chip-fill"
            size="25"
            v-if="
              playersStore.players.some(
                (player) => player.name === 'Player 2' && player.position === 6
              )
            "
          />

          <div>{{ playersStore?.players[1]?.lastBet }}</div>
          <div
            v-if="
              playersStore.players.some(
                (player) =>
                  player.name === 'Player 2' && player.currentPlayerId === true
              )
            "
          >
            <button @click="fold('Player 2')">Fold</button>
            <div class="input">
              <button @click="toggleInput">Raise</button>
              <input v-if="showInput" v-model="sum" type="text" size="1" />

              <button v-if="showInput" @click="raise('Player 2')">Raise</button>
            </div>
            <button @click="coll('Player 2')">Coll</button>

            <button @click="userTern">Bet</button>
          </div>
        </div>

        <div class="player">
          <Icon
            class="table-position"
            :name="createIconComputed(3).value"
            @click="joinAndGetInfo(3)"
          ></Icon>
          <Icon
            class="table-position"
            name="pepicons-pop:leave"
            @click="leaveAndGetInfo('Player 3')"
            v-if="
              playersStore.players.some((player) => player.name === 'Player 3')
            "
          />

          <Icon
            name="ph:poker-chip-fill"
            size="25"
            v-if="
              playersStore.players.some(
                (player) => player.name === 'Player 3' && player.position === 6
              )
            "
          />

          <div>{{ playersStore?.players[2]?.lastBet }}</div>

          <div
            v-if="
              playersStore.players.some(
                (player) =>
                  player.name === 'Player 3' && player.currentPlayerId === true
              )
            "
          >
            <button @click="fold('Player 3')">Fold</button>
            <div class="input">
              <button @click="toggleInput">Raise</button>
              <input v-if="showInput" v-model="sum" type="text" size="1" />

              <button v-if="showInput" @click="raise('Player 3')">Raise</button>
            </div>
            <button @click="coll('Player 3')">Coll</button>

            <button @click="userTern">Bet</button>
          </div>
        </div>
      </div>

      <div class="second">
        <div class="player">
          <Icon
            class="table-position"
            :name="createIconComputed(4).value"
            @click="joinAndGetInfo(4)"
          ></Icon>
          <Icon
            class="table-position"
            name="pepicons-pop:leave"
            @click="leaveAndGetInfo('Player 4')"
            v-if="
              playersStore.players.some((player) => player.name === 'Player 4')
            "
          ></Icon>

          <Icon
            name="ph:poker-chip-fill"
            size="25"
            v-if="
              playersStore.players.some(
                (player) => player.name === 'Player 4' && player.position === 6
              )
            "
          />

          <div>{{ playersStore?.players[3]?.lastBet }}</div>
          <div
            v-if="
              playersStore.players.some(
                (player) =>
                  player.name === 'Player 4' && player.currentPlayerId === true
              )
            "
          >
            <button @click="fold('Player 4')">Fold</button>
            <div class="input">
              <button @click="toggleInput">Raise</button>
              <input v-if="showInput" v-model="sum" type="text" size="1" />

              <button v-if="showInput" @click="raise('Player 4')">Raise</button>
            </div>
            <button @click="coll('Player 4')">Coll</button>

            <button @click="userTern">Bet</button>
          </div>
        </div>

        <div class="player">
          <Icon
            class="table-position"
            :name="createIconComputed(5).value"
            @click="joinAndGetInfo(5)"
          ></Icon>
          <Icon
            class="table-position"
            name="pepicons-pop:leave"
            @click="leaveAndGetInfo('Player 5')"
            v-if="
              playersStore.players.some((player) => player.name === 'Player 5')
            "
          ></Icon>

          <Icon
            name="ph:poker-chip-fill"
            size="25"
            v-if="
              playersStore.players.some(
                (player) => player.name === 'Player 5' && player.position === 6
              )
            "
          />
          <div>{{ playersStore?.players[4]?.lastBet }}</div>
          <div
            v-if="
              playersStore.players.some(
                (player) =>
                  player.name === 'Player 5' && player.currentPlayerId === true
              )
            "
          >
            <button @click="fold('Player 5')">Fold</button>
            <div class="input">
              <button @click="toggleInput">Raise</button>
              <input v-if="showInput" v-model="sum" type="text" size="1" />

              <button v-if="showInput" @click="raise('Player 5')">Raise</button>
            </div>
            <button @click="coll('Player 5')">Coll</button>

            <button @click="userTern">Bet</button>
          </div>
        </div>

        <div class="player">
          <Icon
            class="table-position"
            :name="createIconComputed(6).value"
            @click="joinAndGetInfo(6)"
          ></Icon>
          <Icon
            class="table-position"
            name="pepicons-pop:leave"
            @click="leaveAndGetInfo('Player 6')"
            v-if="
              playersStore.players.some((player) => player.name === 'Player 6')
            "
          ></Icon>
          <Icon
            name="ph:poker-chip-fill"
            size="25"
            v-if="
              playersStore.players.some(
                (player) => player.name === 'Player 6' && player.position === 6
              )
            "
          />
          <div>{{ playersStore?.players[5]?.lastBet }}</div>
          <div
            v-if="
              playersStore.players.some(
                (player) =>
                  player.name === 'Player 6' && player.currentPlayerId === true
              )
            "
          >
            <button @click="fold('Player 6')">Fold</button>
            <div class="input">
              <button @click="toggleInput">Raise</button>
              <input v-if="showInput" v-model="sum" type="text" size="1" />

              <button v-if="showInput" @click="raise('Player 6')">Raise</button>
            </div>
            <button @click="coll('Player 6')">Coll</button>

            <button @click="userTern">Bet</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.info-container {
  min-height: 200px;
  height: auto;
  .table-info {
    display: flex;
    align-items: center;
    gap: 5px;
  }
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
      align-items: flex-end;
      width: 470px;
      gap: 35px;

      .player {
        display: flex;
        justify-content: center;
        align-items: center;

        .buttons {
          display: grid;
          grid-template-columns: 2fr 2fr;
          max-width: 50px;

          .input {
            display: flex;
            max-width: 10px;
          }
        }
      }
    }
    .second {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      width: 470px;
      gap: 35px;
      flex-direction: row-reverse;

      .player {
        display: flex;
        justify-content: center;
        align-items: center;

        .buttons {
          display: grid;
          grid-template-columns: 2fr 2fr;
          max-width: 50px;

          .input {
            display: flex;
            max-width: 10px;
          }
        }
      }
    }
  }
}
</style>
