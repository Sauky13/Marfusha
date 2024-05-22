<template>
  <div class="authorization-form">
    <div v-if="token">
      <h2>Вы успешно авторизованны</h2>
    </div>
    <form v-else class="authorization-form__border" @submit.prevent="authorize">
      <h2 class="authorization-form__title">Авторизация</h2>
      <div class="authorization-form__block">
        <input v-model="email" type="tel" placeholder="Введите email" class="authorization-form__input" />
        <input v-model="password" type="password" placeholder="Введите пароль" class="authorization-form__input" />
        <button class="authorization-form__button">Авторизироваться</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const email = ref('');
const password = ref('');
const token = ref(null);

onMounted(() => {
  token.value = localStorage.getItem('token');
});

const authorize = async () => {
  try {
    const response = await fetch("https://0052e5635286382d.mokky.dev/auth", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    });

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    const data = await response.json();
    console.log(data);

    localStorage.setItem('token', data.token);
    token.value = data.token;
  } catch (error) {
    console.error(error);
  }
};
</script>











<style lang="scss">
.authorization-form {
  display: flex;
  align-items: center;
  justify-content: center;
  &__border {
    box-shadow: 0 20px 40px 0 #2a444b21;
    width: 479px;
    height: 467px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    justify-content: center;
  }
  &__title {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    color: #636363;
    font-size: 20px;
  }
  &__block {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }
  &__input {
    border: 2px solid #9e7d5d;
    width: 395px;
    height: 57px;
    padding: 10px;
  }
  &__button {
    background: #525252;
    font-size: 20px;
    color: rgb(255, 255, 255);
    border: none;
    width: 230px;
    height: 50px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  }
}
</style>
