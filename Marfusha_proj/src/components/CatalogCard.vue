<template>
  <div class="block">
    <router-link :to="`/catalog_price/${id}`" class="link">
      <div class="block__content">
        <img :src="imgUrl" style="width: 240px; height: 250px" />
        <div class="block__text">
          <p class="block__text--small">{{ title }}</p>
          <div class="block__arrow">
            <img src="../assets/img/arrow.svg" style="width: 40px; height: 20px" />
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  imgUrl: String,
  id: [String, Number]
})
</script>

<style scoped>
.block {
  box-shadow: 0 20px 60px rgba(47, 68, 73, 0.46);
  transition: transform 0.3s ease-in-out;
  width: 290px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.block:hover {
  transform: scale(1.05);
}

.block__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.block__text {
  display: flex;
  gap: 20px;
  align-items: center;
}

.block__text--small {
  font-size: 28px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  color: #9e7d5d;
}

.block__arrow {
  width: 50px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #9e7d5d;
  border-radius: 3px;
}

.link {
  text-decoration: none;
  color: inherit;
}
</style>
