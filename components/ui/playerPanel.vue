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

const sliderValue = ref<number>(50);

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
      <div class="up_buttons">
        <div class="buttons_">
          <button>MIN</button>
          <button>3/4</button>
          <button>POT</button>
          <button>MAX</button>
        </div>
        <div class="range_input_container">
          <input
            class="range_input"
            type="range"
            min="0"
            max="1000"
            v-model="sliderValue"
          />
        </div>
      </div>
      <input class="input" type="number" v-model="sliderValue" />
    </div>
    <div class="main-buttons">
      <button @click="fold(props.name)" class="fold_button">FOLD</button>
      <button @click="check(props.name)" class="check_button">CHECK</button>
      <button @click="coll(props.name)" class="call_button">CALL</button>
      <button @click="raise(props.name)" class="bet_button">BET</button>
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
    gap: 10px;

    .up_buttons {
      display: flex;
      flex-direction: column;
      gap: 10px;
      .buttons_ {
        display: flex;
      }
      .range_input_container {
        display: flex;
        align-items: center;

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
    }
    .input {
      width: 77px;
      height: 60px;
      left: 1901px;
      right: -1901px;
      top: 1148px;
      bottom: -1148px;
      border-radius: 1px;
      border: none;
      color: rgb(214, 233, 253);
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
      color: rgb(4, 7, 6);
      border: none;
      border-radius: 16px;
      background: rgb(152, 222, 227);
    }
  }
}
</style>
