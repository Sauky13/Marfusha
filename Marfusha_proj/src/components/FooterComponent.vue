<template>
  <footer>
    <div class="footer-content">
      <nav class="footer__nav">
        <router-link to="/aboutus" class="footer__item">
          <p>О нас</p>
        </router-link>
        <router-link to="/catalog" class="footer__item">
          <p>Каталог услуг</p>
        </router-link>
      </nav>
      <p>© 2024 Marfusha</p>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background-color: #3b3b3b;
  padding: 20px;
  text-align: center;
  width: 100%;
  height: 300px;
  color: #ffffff;
}
.footer-content {
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}
.footer__item {
  text-decoration: none;
  color: rgba(99, 99, 99, 1);
}
.footer__nav{
  display: flex;
  gap: 20px;
}
</style>
