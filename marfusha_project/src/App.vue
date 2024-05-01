<script setup>
import MyHello from './components/MyHello.vue'
</script>

<template>
  <header>
    <div class="header_container">
      <div class="logo">
        <img src="./assets/img/logo.svg" alt="logo" id="logo" />
      </div>
      <div class="nav">
        <a href="#">О нас</a>
        <a href="#">Каталог услуг</a>
        <a href="#">Войти</a>
        <a href="#">Регистрация</a>
      </div>
    </div>
  </header>
  <MyHello />
</template>

<style scoped>
.nav a {
  text-decoration: none;
  color: rgba(99, 99, 99, 1);
  font-size: 14px;
  font-family: sans-serif;
}
.nav {
  display: flex;
  gap: 30px;
}
#logo {
  width: 120px;
}
.header_container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 160px;
}
header{
  border-bottom: 1px solid rgba(99, 99, 99, 0.747);
}
</style>
