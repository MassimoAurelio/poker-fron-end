<script setup lang="ts">
import { usePlayers } from "~/store/usePlayers";
import { useAuthStore } from "@/store/auth";

const route = useRoute();
const authStore = useAuthStore();
const playersStore = usePlayers();
const username = computed(() => authStore.getUsername()?.username);

useSeoMeta({
  title: `Комната ${route.params.id}`,
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
  getInfo()
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
  <button @click="giveCards">Give Card</button>

  <div class="main-container">
    <div class="table">
      <div class="first">
        <Player :name="username || ''" :position="1" />
        <Player :name="username || ''" :position="2" />
        <Player :name="username || ''" :position="3" />
      </div>
      <div class="second">
        <Player :name="username || ''" :position="4" />
        <Player :name="username || ''" :position="5" />
        <Player :name="username || ''" :position="6" />
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

    border: solid black;
    border-width: 15px;
    border-radius: 90px;

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
      width: 470px;
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
      width: 470px;
      gap: 35px;
      flex-direction: row-reverse;

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