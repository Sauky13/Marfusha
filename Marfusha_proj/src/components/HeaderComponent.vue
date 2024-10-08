<template>
  <div class="header">
    <div class="header__logo">
      <router-link to="/">
        <img src="../assets/img/logo.svg" alt="logo" class="logo" />
      </router-link>
      <nav class="header__nav">
        <router-link to="/aboutus" class="header__item">
          <p>О нас</p>
        </router-link>
        <router-link to="/catalog" class="header__item">
          <p>Каталог услуг</p>
        </router-link>
        <router-link v-if="!token" to="/auth" class="header__item">
          <p>Войти</p>
        </router-link>
        <router-link v-if="token" to="/logout" class="header__item">
          <p>Выйти</p>
        </router-link>
        <router-link v-if="!token" to="/registration" class="header__item">
          <p>Регистрация</p>
        </router-link>
        <router-link v-if="token" to="/lk" class="header__item">
          <p>Личный кабинет</p>
        </router-link>
      </nav>
    </div>
    <div class="header__underline"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const token = computed(() => localStorage.getItem('token'))
</script>

<style scoped>
.logo {
  width: 180px;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.header__logo {
  display: flex;
  gap: 200px;
  align-items: center;
}

.header__nav {
  display: flex;
  gap: 20px;
}

.header__item {
  text-decoration: none;
  color: rgba(99, 99, 99, 1);
  font-size: 18px;
  font-family: Helvetica, sans-serif;
}

.header__underline {
  width: 100%;
  margin-top: 5px;
  border: 1px solid rgba(99, 99, 99, 0.747);
}

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

.nav__underline {
  width: 100%;
  margin-top: 5px;
  border: 1px solid rgba(99, 99, 99, 0.747);
}

.header_container {
  display: flex;
  gap: 160px;
  align-items: center;
}
</style>
