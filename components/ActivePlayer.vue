<script setup lang="ts">
import { usePlayers } from "@/store/usePlayers";
import { BASE_URL, NEXT_PLAYER, JOIN, LEAVE, PLAYERS } from "@/utils/api";

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
    const response = await fetch(`${BASE_URL}${JOIN}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        player: props.name,
        stack: 1000,
        position: position,
      }),
    });
    if (!response.ok) {
      throw new Error("Ошибка при отправке данных");
    }
  } catch (error) {
    console.error(error);
  }
};

const leaveFromTable = async (position: number) => {
  try {
    const response = await fetch(`${BASE_URL}${LEAVE}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        position: position,
      }),
    });
    if (!response.ok) {
      throw new Error("Ошибка при выполнении запроса");
    }
  } catch (error) {
    console.error(error);
  }
};

const getInfo = async () => {
  try {
    const response = await fetch(`${BASE_URL}${PLAYERS}`);
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

const leaveAndGetInfo = async (positon: number) => {
  try {
    await leaveFromTable(positon);
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

const getLastBet = () => {
  const player = playersStore.players.find(
    (player) => player.name === props.name
  );
  return player?.lastBet || 0;
};

const playerExists = () => {
  return playersStore.players.some((player) => player.name === props.name);
};

const playerAndCurrentPlayerId = () => {
  return playersStore.players.some(
    (player) => player.name === props.name && player.currentPlayerId === true
  );
};
</script>

<template>
  <div class="active-player-container">
    <div class="card-container">
      <div class="first-card">
        <div class="suit">
          <Icon name="bi:suit-club-fill" size="25" />
          <div class="card_number-container">
            <div class="card-number">3</div>
          </div>
        </div>
      </div>
      <div class="second-card">
        <Icon name="bi:suit-diamond-fill" size="25" />
        <div class="card_number-container">
          <div class="card-number">9</div>
        </div>
      </div>
    </div>
    <div class="player-footer">
      <div class="player-avatar"><NuxtImg src="/dealer.svg" /></div>
      <div class="first-block">
        <div>1000</div>
      </div>
      №2
    </div>
    <div class="leave">
      <NuxtImg
        src="/leave.svg"
        class="table-position"
        size="50"
        name="pepicons-pop:leave"
        @click="leaveAndGetInfo(props.position)"
      />
    </div>
  </div>
  <div class="panel" v-if="playerAndCurrentPlayerId()">
    <UiPlayerPanel :name="props.name" :position="props.position" />
  </div>
</template>

<style scoped lang="scss">
.active-player-container {
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
      width: 64px;
      height: 88px;
      border-radius: 3px;
      box-shadow: -1px 0px 2px 0px rgba(20, 28, 33, 0.56);
      background: radial-gradient(
        98% 100% at 50% 100%,
        rgb(69, 84, 95),
        rgb(44, 58, 68) 100%
      );

      .card_number-container {
        width: 100%;
        display: flex;
        justify-content: center;
        .card-number {
          width: 31px;
          height: 36px;
          color: rgb(122, 167, 255);
          font-family: Dela Gothic One;
          font-size: 36px;
          font-weight: 400;
          line-height: 100%;
          letter-spacing: -2%;
          text-align: center;
        }
      }
    }
    .second-card {
      width: 64px;
      height: 88px;
      border-radius: 3px;
      box-shadow: -1px 0px 2px 0px rgba(20, 28, 33, 0.56);
      background: radial-gradient(
        98% 100% at 50% 100%,
        rgb(69, 84, 95),
        rgb(44, 58, 68) 100%
      );
      .card_number-container {
        width: 100%;
        display: flex;
        justify-content: center;
        .card-number {
          width: 31px;
          height: 36px;
          color: rgb(122, 167, 255);
          font-family: Dela Gothic One;
          font-size: 36px;
          font-weight: 400;
          line-height: 100%;
          letter-spacing: -2%;
          text-align: center;
        }
      }
    }
  }

  .player-footer {
    width: 265px;
    height: 80px;
    background-color: #33414bcc;
    border-radius: 10px;
    .player-avatar {
      position: absolute;
      z-index: 1000;
      top: 0;
      margin-top: 50px;
      width: 72px;
      height: 72px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .first-block {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 264px;
      height: 48px;
      border-radius: 1px;
      backdrop-filter: blur(16px);
      background-color: #40525ecc;
    }
  }
}
.panel {
  position: absolute;
  right: 0;
  bottom: 0;
  margin-bottom: 150px;
  margin-right: 300px;
}
</style>
