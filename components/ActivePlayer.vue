<script setup lang="ts">
import { usePlayers } from "@/store/usePlayers";
import { BASE_URL, LEAVE, PLAYERS } from "@/utils/api";

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

const leaveAndGetInfo = async (positon: number) => {
  try {
    await leaveFromTable(positon);
    await getInfo();
  } catch (error) {
    console.error(error);
  }
};

const getBalance = () => {
  const balance = playersStore.players.find(
    (player) => player.name === props.name
  );
  return balance?.stack || 0;
};

const getLastBet = () => {
  const lastBet = playersStore.players.find(
    (player) => player.name === props.name
  );

  return lastBet?.lastBet || 0;
};

const getValueFirstCard = () => {
  const firstCard = playersStore.players.find(
    (player) => player.name === props.name
  );
  return firstCard?.cards[0]?.value;
};

const getSuiteFirstCard = () => {
  const firstCard = playersStore.players.find(
    (player) => player.name === props.name
  );
  return firstCard?.cards[0]?.suit;
};

const getValueSecondCard = () => {
  const firstCard = playersStore.players.find(
    (player) => player.name === props.name
  );
  return firstCard?.cards[1]?.value;
};

const getSuiteSecondCard = () => {
  const firstCard = playersStore.players.find(
    (player) => player.name === props.name
  );
  return firstCard?.cards[1]?.suit;
};

const getUserName = () => {
  const name = playersStore.players.find(
    (player) => player.name === props.name
  );
  return name?.name || " ";
};
</script>

<template>
  <div class="active-player-container">
    <div class="card-container">
      <div class="first-card">
        <div class="suit">
          {{ getSuiteSecondCard() }}
          <div class="card_number-container">
            <div class="card-number">{{ getValueSecondCard() }}</div>
          </div>
        </div>
      </div>
      <div class="second-card">
        {{ getSuiteFirstCard() }}
        <div class="card_number-container">
          <div class="card-number">{{ getValueFirstCard() }}</div>
        </div>
      </div>
    </div>
    <div class="player-footer">
      <div class="player-avatar"><NuxtImg src="/dealer.svg" /></div>
      <div class="first-block">
        <div class="player-balance">{{ getBalance() }}</div>
      </div>
      <div
        class="player-footer-info"
        v-if="
          playersStore.players.some(
            (player) => player.name === props.name && player.fold === false
          )
        "
      >
        <div class="name">{{ getUserName() }}</div>
        <div class="lastBet">{{ getLastBet() }} chips</div>
      </div>

      <div
        class="player-footer-infoFold"
        v-if="
          playersStore.players.some(
            (player) => player.name === props.name && player.fold === true
          )
        "
      >
        <div class="name">{{ getUserName() }}</div>
        <div class="lastBet">FOLD</div>
      </div>
    </div>
    <NuxtImg
      src="/del.svg"
      sizes="40"
      v-if="
        playersStore.players.find(
          (player) => player.position === 6 && player.name === props.name
        )
      "
    />
    <div class="leave">
      <NuxtImg
        src="/leave.svg"
        class="table-position"
        sizes="40"
        name="pepicons-pop:leave"
        @click="leaveAndGetInfo(props.position)"
      />
    </div>
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
      position: relative;
      width: 64px;
      height: 88px;
      font-size: 30px;
      border-radius: 3px;
      box-shadow: -1px 0px 2px 0px rgba(20, 28, 33, 0.56);
      background: radial-gradient(
        98% 100% at 50% 100%,
        rgb(69, 84, 95),
        rgb(44, 58, 68) 100%
      );

      .card_number-container {
        position: absolute;
        width: 100%;
        display: flex;
        justify-content: center;
        top: 40px;
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
      position: relative;
      width: 64px;
      height: 88px;
      font-size: 30px;
      border-radius: 3px;
      box-shadow: -1px 0px 2px 0px rgba(20, 28, 33, 0.56);
      background: radial-gradient(
        98% 100% at 50% 100%,
        rgb(69, 84, 95),
        rgb(44, 58, 68) 100%
      );
      .card_number-container {
        position: absolute;
        width: 100%;
        display: flex;
        justify-content: center;
        top: 40px;
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

    .player-footer-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding-left: 10px;
      padding-right: 10px;
    }

    .player-footer-infoFold {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding-left: 10px;
      padding-right: 10px;
      border-radius: 1px;
      backdrop-filter: blur(16px);
      background: linear-gradient(
        90deg,
        rgb(233, 123, 136) 6.289%,
        rgba(55, 71, 82, 0) 91.893%
      );
    }
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

      .player-balance {
        padding-right: 10px;
      }
    }
  }
}
</style>
