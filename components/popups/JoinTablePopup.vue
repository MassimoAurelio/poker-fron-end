<script setup lang="ts">
import { useTogglePopup } from "@/store/useTogglePopup";
const togglePopupStore = useTogglePopup();

const joinTableForm = {
  nickname: "",
  stack: 0,
  position: 0,
};

const joinTable = async () => {
  try {
    const response = await fetch("http://localhost:5000/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        player: joinTableForm.nickname,
        stack: joinTableForm.stack,
        position: joinTableForm.position,
      }),
    });

    if (!response.ok) {
      throw new Error("Ошибка при отправке данных");
    }

    const data = await response.json();
    console.log(data);
    togglePopupStore.togglePopup();
  } catch (error) {
    console.error(error);
  }
};



</script>

<template>
  <div class="popup" v-if="togglePopupStore.visible">
    <button @click="togglePopupStore.togglePopup">ClOSE</button>
    <p>NickName</p>
    <input
      type="text"
      placeholder="nickname"
      v-model="joinTableForm.nickname"
    />
    <p>Stack</p>
    <input type="number" placeholder="stack" v-model="joinTableForm.stack" />
    <p>Position</p>
    <input
      type="number"
      placeholder="position"
      v-model="joinTableForm.position"
    />
    <button @click="joinTable">Сесть за стол</button>
  </div>
</template>

<style scoped lang="scss">
.popup {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 5px;
  background-color: rgb(139, 108, 108);
  width: 250px;
  height: 250px;
  padding: 5vh;

  button {
    background-color: black;
  }
}
</style>
