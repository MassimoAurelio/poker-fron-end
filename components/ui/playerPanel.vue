<script setup lang="ts">
import { usePlayers } from "@/store/usePlayers";
import { BASE_URL, NEXT_PLAYER, COLL, PLAYERS, FOLD, RAISE } from "@/utils/api";

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

const fold = async (name: string) => {
  try {
    const response = await fetch(`${BASE_URL}${FOLD}`, {
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

const sum = ref("");
const raise = async (name: string) => {
  try {
    const response = await fetch(`${BASE_URL}${RAISE}`, {
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
    playersStore.showInput = false;
    await userTern();
  } catch (error) {
    console.error(error);
  }
};
const coll = async (name: string) => {
  try {
    const response = await fetch(`${BASE_URL}${COLL}`, {
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

const userTern = async () => {
  try {
    const response = await fetch(`${BASE_URL}${NEXT_PLAYER}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Ошибка при выполнении запроса");
    }
    playersStore.showInput = false;
    await getInfo();
  } catch (error) {
    console.error(error);
  }
};

const check = async (name: string) => {
  try {
    const response = await fetch("http://localhost:5000/check", {
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
    console.error(error);
  }
};
</script>

<template>
  <div class="main-container">
    <div class="second-buttons">
      <button>MIN</button>
      <button>3/4</button>
      <button>POT</button>
      <button>MAX</button>
      <input class="input" type="number" />
    </div>
    <div class="main-buttons">
      <button @click="fold(props.name)">FOLD</button>
      <button @click="check(props.name)">CHECK</button>
      <button @click="coll(props.name)">CALL</button>
      <button @click="raise(props.name)">BET</button>
    </div>
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
    .input {
      width: 77px;
      height: 60px;
      left: 1901px;
      right: -1901px;
      top: 1148px;
      bottom: -1148px;
      border-radius: 1px;
      backdrop-filter: blur(2px);
      background: rgba(64, 82, 94, 0.24);
    }
    button {
      width: 61px;
      height: 32px;
      left: 1622px;
      right: -1622px;
      top: 1148px;
      bottom: -1148px;
      border-radius: 24px;
      backdrop-filter: blur(2px);
      border: none;
      background: rgba(64, 82, 94, 0.24);
    }
  }
  .main-buttons {
    display: flex;
    gap: 8px;
    button {
      width: 104px;
      height: 64px;
      left: 1762px;
      right: -1426px;
      top: 1232px;
      bottom: -1232px;
      border-radius: 16px;
      border: none;
      background: rgb(233, 123, 136);
    }
  }
}
</style>
