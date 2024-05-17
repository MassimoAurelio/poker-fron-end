<script setup lang="ts">
import { usePlayers } from "~/store/usePlayers";
const playersStore = usePlayers();
import { useAuthStore } from "@/store/auth";

const authStore = useAuthStore();

useSeoMeta({
  title: "POKER",
});

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

const joinAndGetInfo = async (position: number) => {
  try {
    await joinTable(position);
    await getInfo();
  } catch (error) {
    console.error(error);
  }
};

const giveCards = async () => {
  try {
    const response = await fetch("http://localhost:5000/deal", {
      method: "GET",
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

onMounted(() => {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  if (token && username) {
    authStore.login(token, { username: username });
  }
  getInfo();
});
</script>

<template>
  <button @click="updatepos">NEXT ROUND</button>
  <button @click="giveCards">Give Card</button>

  <div class="main-container">
    <div class="table">
      <div class="first">
        <NewPlayer name="Player 1" :position="1" />
        <NewPlayer name="Player 2" :position="2" />
        <NewPlayer name="Player 3" :position="3" />
      </div>
      <div class="second">
        <NewPlayer name="Player 4" :position="4" />
        <NewPlayer name="Player 5" :position="5" />
        <NewPlayer name="Player 6" :position="6" />
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
  position: relative;
  padding: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 25px;
  border: 1px solid rgb(255, 255, 255);
  border-radius: 33px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background: url(),
    radial-gradient(76% 100% at 50% 0%, rgb(54, 68, 78), rgb(16, 25, 30) 100%);

  .table {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 150px;
    width: 800px;
    background: radial-gradient(
        55% 100% at 50% 0%,
        rgba(47, 60, 69, 0),
        rgba(7, 12, 15, 0.48) 100%
      ),
      url(), rgba(52, 66, 77, 0.56);
    opacity: 0.88;
    border: solid black;
    border-width: 15px;
    border-radius: 200px;

    .table-position {
      width: 25px;
      height: 25px;
      text-align: center;
      line-height: 50px;
      z-index: 1;
    }

    .first {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 900px;
      gap: 35px;

      .player {
        display: flex;
        justify-content: center;
        align-items: center;

        .cards {
          display: flex;
          flex-direction: column;
          align-items: center;
          .first_card {
            display: flex;
          }
          .second_card {
            display: flex;
          }
        }

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
      align-items: center;
      flex-direction: row-reverse;
      width: 900px;
      gap: 35px;

      .player {
        display: flex;
        justify-content: center;
        align-items: center;

        .cards {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

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
