<template>
  <div class="block">
    <div class="block__content">
      <img src="../assets/img/brovi.png" style="width: 175px; height: 175px;">
      <div class="block__text">
        <p class="block__text--small">Брови</p>
        <div class="block__arrow">
          <img src="../assets/img/arrow.svg" style="width: 40px; height: 20px;">
        </div>
      </div>
    </div>
  </div>
</template>
<script setup></script>
<style lang="scss">
.block{
  box-shadow: 0 20px 60px rgba(47, 68, 73, 0.46);
  width: 202px;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
  &__text {
    display: flex;
    gap: 20px;
    align-items: center;
    &--small {
      font-size: 18px;
      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
      color: #9E7D5D;
    }
  }
  &__arrow {
    width: 50px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #9E7D5D;
    border-radius: 3px;
  }
}
</style>