<template>
  <div class="PersonalComponent">
    <div class="Users__cart">
      <div class="Users__avatar">
        <img src="../assets/img/Avatar2.jpg" alt="UsersAvatar" id="Avatars" />
      </div>
      <div class="Users__info">
        <input type="text" placeholder="name" />
        <input type="text" placeholder="number" />
        <button id="Users__edit__btn">Изменить</button>
      </div>
    </div>
    <div>
      <h2 class="My__records">Мои записи</h2>
    </div>
    <div class="Users__records">
      <div class="Users__card__records">
        <div>
          <p class="">Услуги</p>
          <p>Покрытие гель лаком</p>
        </div>
        <div>
          <p>Дата и время</p>
          <p>12.12.2021 12:00</p>
        </div>
        <div>
          <p>Мастер</p>
          <p>Ирина</p>
        </div>
        <div>
          <p>Цена</p>
          <p>1000 руб.</p>
        </div>
      </div>
      <button id="Users_records_btn">Отменить</button>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>

.PersonalComponent {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

.Users__cart {
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0px 2px 4px rgba(100, 100, 100, 0.644);
  padding: 10px;
  width: 400px;
  height: 200px;
  justify-content: center;
}

.Users__info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
#Avatars {
  width: 127px;
  height: 127px;
  border-radius: 100%;
}

input {
  border-bottom: 1px solid rgba(99, 99, 99, 1);
  border-top: none;
  border-left: none;
  border-right: none;
  color: rgba(158, 125, 93, 1);
}

.Users__records {
  display: flex;
  gap: 20px;
  padding: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.644);
  margin-top: 20px;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
}

.Users__card__records {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

#Users_records_btn {
  background-color: rgb(89, 89, 89);
  color: white;
  border: none;
  height: 30px;
  width: 100px;
}

#Users__edit__btn {
  background-color: transparent;
  color: rgba(158, 125, 93, 1);
  border: none;
  height: 30px;
  width: 180px;
  border: 1px solid rgba(158, 125, 93, 1);
  cursor: pointer;
}
.My__records {
  color: rgba(158, 125, 93, 1);
  font-family: 'Roboto', sans-serif;
}
</style>
