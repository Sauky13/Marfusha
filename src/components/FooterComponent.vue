<template>
  <footer>
    <div class="footer-content">
      <nav class="header__nav">
        <router-link to="/aboutus" class="header__item">
          <p>О нас</p>
        </router-link>
        <router-link to="/catalog" class="header__item">
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
    height: 200px;
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
  nav ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    justify-content: center;
  }
  nav ul li {
    margin: 0 10px;
  }
  nav ul li a {
    text-decoration: none;
    color: #ffffff;
    font-weight: bold;
  }
</style>