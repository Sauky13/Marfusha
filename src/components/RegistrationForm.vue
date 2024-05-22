<template>
  <div class="authorization-form">
    <div v-if="token">
      <h2>Вы успешно зарегистрированны</h2>
    </div>
    <form v-else class="authorization-form__border" @submit.prevent="register">
      <h2 class="authorization-form__title">Регистрация</h2>
      <div class="authorization-form__block">
        <input v-model="fullName" type="text" placeholder="Введите имя" class="authorization-form__input">
        <input v-model="email" type="email" placeholder="Введите email" class="authorization-form__input">
        <input v-model="password" type="password" placeholder="Введите пароль" class="authorization-form__input">
        <input type="password" placeholder="Повторите пароль" class="authorization-form__input">
        <button class="authorization-form__button">Зарегистрироваться</button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const fullName = ref('');
    const email = ref('');
    const password = ref('');
    const token = ref(null);

    onMounted(() => {
      token.value = localStorage.getItem('token');
    });

    const register = async () => {
      try {
        const response = await fetch("https://0052e5635286382d.mokky.dev/register", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            fullName: fullName.value,
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

    return {
      fullName,
      email,
      password,
      register,
      token
    };
  }
};
</script>









<style lang="scss">
.authorization-form {
  &__border {
    box-shadow: 0 20px 40px 0 #2A444B21;
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
    border: 2px solid #9E7D5D;
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