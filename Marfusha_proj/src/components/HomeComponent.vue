<template>
  <div class="intro">
    <img src="@/assets/img/girl.jpg" alt="girl" id="girl" class="rounded-bl" />
    <div class="container__text">
      <div class="text">
        <h1>
          СКИДКА НА<br />ПЕРВОЕ<br />
          ПОСЕЩЕНИЕ!
        </h1>
        <p>Дополнительная информация по номеру +79138214554</p>
      </div>
      <div class="btn">
        <button id="btn" @click="goToRecords">ЗАПИСАТЬСЯ</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goToRecords = () => {
  router.push("/records");
};
</script>

<style scoped>
#girl {
  width: 620px;
  height: 620px;
}

.intro {
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 34px;
}

h1 {
  font-size: 55px;
  color: rgba(75, 65, 44, 1);
}

p {
  font-size: 18px;
  color: rgba(75, 65, 44, 1);
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}

.text {
  display: flex;
  flex-direction: column;
}

.container__text {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

#btn {
  background: #525252;
  font-size: 20px;
  color: rgb(255, 255, 255);
  border: none;
  width: 230px;
  height: 50px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  transition: transform 0.3s ease;
}

#btn:hover {
  transform: scale(1.1);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
</style>
