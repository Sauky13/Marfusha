<template>
  <div class="reviews-form">
    <form class="reviews-form__form">
      <div class="reviews-form__block">
        <h2 class="reviews-form__title">ОТЗЫВЫ</h2>
        <textarea placeholder="Оставить отзыв" class="reviews-form__textarea" v-model="model.review"></textarea>
      </div>
      <button class="reviews-form__send" @click="postReviews">ОТПРАВИТЬ</button>
    </form>
    <div class="reviews-block">
      <div class="reviews-block__review"> <!--В данном случае тебе будет необходимо использовать метод v-for и перебрать-->
        <p class="reviews-block__title">Name</p> <!--данные получаенные из функции getReviews-->
        <div class="reviews-block__text--data">
          <p class="reviews-block__text">Отзыв</p>
          <p class="reviews-block__data">data</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {onMounted, ref} from "vue";

const model = ref({
  review: ''
})

async function postReviews(){
  const response = await fetch('',{
    method: "POST",
    body: JSON.stringify({
      //тут будет находится тело запроса, в твоем случае для считывания значения с инпута мы создаем const model,
      //и уже при помощи неё ты отправляешь body
      review: model.value.review
    }),
    headers: {
      //Authorization : `Bearer ${token}` //отправка post запросов обычно происходит через токен, поэтому тебе в headers будет
      //необходимо передавать токен. Токен получается при регистрации или же авторизации. Токен посылвается бэком.
    },
  },)
  const data = await response.json();
  console.log(data); //console.log() необходим для того, чтобы узнать что тебе приходит в теле ответа от бэка. При окончании
  //над кодом курсача все console.log необходимо удалить
}
async function getReviews() {
  const response = await fetch('') //тут соотвественно пишешь url запроса
  const data = await response.json()
  console.log(data)
}
onMounted(() => {
  getReviews(); //данный хук необходим для того, чтобы твой запрос автоматически отрабатывал при загрузке страницы
  //т.е. этот метод хорошо подходит для get запросов, если они не вызываются какой-либо кнопкой
})
</script>
<style lang="scss">
.reviews-form {
  &__form {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }
  &__block {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  &__title {
    text-align: center;
    font-size: 20px;
    font-weight: 800;
    color: #9E7D5D;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  }
  &__textarea {
    border: 4px solid #4B2C2C;
    width: 772px;
    height: 120px;
    resize: none;
    padding: 10px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  }
  &__send {
    width: 230px;
    height: 50px;
    background-color: #636363;
    color: white;
    border: none;
    font-size: 20px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  }
}
.reviews-block {
  margin-top: 60px;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  &__review {
    width: 350px;
    height: 150px;
    border: 4px solid #9E7D5D;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
  }
  &__title {
    font-size: 18px;
    color: #9E7D5D;
    font-weight: 600;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  }
  &__text {
    font-size: 18px;
    color: #9E7D5D;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    &--data {
      display: flex;
      justify-content: space-between;
    }
  }
  &__data {
    font-size: 15px;
    color: #636363;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  }
}
</style>