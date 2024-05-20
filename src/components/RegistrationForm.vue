<template>
  <div class="authorization-form">
    <form class="authorization-form__border">
      <h2 class="authorization-form__title">Регистрация</h2>
      <div class="authorization-form__block">
        <input type="text" placeholder="Введите имя" class="authorization-form__input">
        <input type="email" placeholder="Введите email" class="authorization-form__input">
        <input type="password" placeholder="Введите пароль" class="authorization-form__input">
        <input type="password" placeholder="Повторите пароль" class="authorization-form__input">
        <button class="authorization-form__button">Зарегистрироваться</button>
      </div>
    </form>
  </div>
</template>
<script setup>
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