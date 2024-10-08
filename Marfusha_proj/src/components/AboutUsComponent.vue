<template>
  <div class="title">
    <h2>О нашем салоне</h2>
    <p>Стань великолепной вместе с MARFUSHA!</p>
  </div>
  <div class="block__info">
    <div class="container__info">
      <img src="../assets/img/women-working.jpg" style="width: 420px" />
      <p>
        Большой клиентский опыт,<br />
        следование мировым трендам обслуживания,<br />
        адекватная ценовая политика.<br />
        Мы раскроем вашу энергетику,<br />
        женственность и природный шарм.<br />
        Подарите себе то, чего так жаждет любая<br />
        девушка – ощущение собственной непревзойденности.
      </p>
    </div>
    <div class="container__info_2">
      <img src="../assets/img/salon_img.jpg" style="width: 420px" />
      <p>
        Нас ценят не только за высокий<br />
        профессионализм,но и за умение<br />
        создать особую атмосферу для<br />
        каждого посетителя. Приходите и Вы!
      </p>
    </div>
  </div>
  <div class="title">
    <h3>Адрес и контакты</h3>
  </div>
  <div class="container__contacts">
    <p>+7 (3852) 19-21-34</p>
    <p>09:00-21:00 Без выходных</p>
    <p>г. Томск, ул. Ленина, 54</p>
  </div>
  
</template>

<style scoped>
.container__info {
  display: flex;
  gap: 40px;
  justify-content: center;
  align-items: center;
  font-size:25px;
}

.container__info_2 {
  display: flex;
  gap: 40px;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;
  font-size: 25px;
}


.block__info {
  display: flex;
  gap: 40px;
  flex-direction: column;
  margin-bottom: 20px 0px;
}

.title {
  text-align: center;
  margin: 20px;
  font-size: 18px;
  font-family: Arial, sans-serif;
}

.container__contacts {
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  font-size: 18px;
  font-family: Arial, sans-serif;
}
</style>
