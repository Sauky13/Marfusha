<template>
  <div class="reviews-form">
    <h2 class="reviews-form__title">ОТЗЫВЫ</h2>

    <form class="reviews-form__form" v-if="isAuthenticated">
      <div class="reviews-form__block">
        <textarea
          id="review"
          name="review"
          placeholder="Оставить отзыв"
          class="reviews-form__textarea"
          v-model="model.review"
        ></textarea>
      </div>
      <button class="reviews-form__send" @click.prevent="postReview">ОТПРАВИТЬ</button>
    </form>
    <div>
      <p v-if="!isUserLoggedIn">
        <router-link class="note" to="/registration">Зарегистрируйтесь</router-link> или
        <router-link class="note" to="/auth">Войдите</router-link> для того чтобы оставить отзыв
      </p>
    </div>
    <div class="reviews-block">
      <div v-for="review in reviews" :key="review.id" class="reviews-block__review">
        <p class="reviews-block__title">{{ review.username }}</p>
        <div class="reviews-block__text--data">
          <p class="reviews-block__text">{{ review.text }}</p>
          <p class="reviews-block__data">{{ review.date }}</p>
        </div>
        <button class="admin_btn" v-if="isRole2" @click="deleteReview(review.id)">Удалить</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref, computed } from 'vue'

const model = ref({
  review: ''
})
const reviews = ref([])
const username = ref('')
const isAuthenticated = ref(false)
const isRole2 = ref(false)

onMounted(async () => {
  isAuthenticated.value = !!localStorage.getItem('token')
  if (isAuthenticated.value) {
    await getUserData()
  }
  await getReviews()
})
const isUserLoggedIn = computed(() => {
  return localStorage.getItem('token') !== null
})

async function postReview() {
  if (!model.value.review.trim()) {
    return
  }

  const getUserData = async () => {
    try {
      const response = await axios.get(`https://0052e5635286382d.mokky.dev/auth_me`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      username.value = response.data.fullName
      isRole2.value = response.data.role === 2
    } catch (error) {
      console.error(error)
    }
  }

  try {
    await getUserData()

    const response = await axios.post('https://0052e5635286382d.mokky.dev/reviews', {
      username: username.value,
      text: model.value.review,
      date: new Date().toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    })

    response.data

    model.value.review = ''
    await getReviews()
  } catch (error) {
    console.error('Ошибка при отправке отзыва:', error)
  }
}

async function getReviews() {
  try {
    const response = await axios.get('https://0052e5635286382d.mokky.dev/reviews')
    reviews.value = response.data
  } catch (error) {
    console.error('Ошибка при загрузке отзывов:', error)
  }
}

const getUserData = async () => {
  try {
    const response = await axios.get(`https://0052e5635286382d.mokky.dev/auth_me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    username.value = response.data.fullName
    isRole2.value = response.data.role === 2
  } catch (error) {
    console.error(error)
  }
}

async function deleteReview(reviewId) {
  try {
    const response = await axios.delete(`https://0052e5635286382d.mokky.dev/reviews/${reviewId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    response.data
    await getReviews()
  } catch (error) {
    console.error('Ошибка при удалении отзыва:', error)
  }
}
</script>

<style scoped>
.admin_btn {
  width: 100px;
  height: 30px;
  background-color: #636363;
  color: white;
  border: none;
  font-size: 15px;
}

.reviews-form {
  display: flex;
  flex-direction: column;
  gap: 11px;
  align-content: center;
  align-items: center;
}

.reviews-form__form {
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 20px;
}

.reviews-form__block {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.reviews-form__title {
  text-align: center;
  font-size: 20px;
  font-weight: 800;
  color: #9e7d5d;
}

.reviews-form__textarea {
  width: 850px;
  height: 135px;
  border: 4px solid #4b2c2c;
  padding: 10px;
  font-size: 18px;
  border-color: #9e7d5d;
}

.note {
  text-decoration: none;
  color: rgba(158, 125, 93, 1);
}

.reviews-form__send {
  width: 230px;
  height: 50px;
  background-color: #636363;
  color: white;
  border: none;
  font-size: 20px;
}

.reviews-block {
  margin-top: 60px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.reviews-block__review {
  height: auto;
  border: 4px solid #9e7d5d;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  max-width: 430px;
  justify-content: space-around;
}

.reviews-block__title {
  font-size: 18px;
  color: #9e7d5d;
  font-weight: 600;
}

.reviews-block__text {
  font-size: 18px;
  color: #9e7d5d;
  overflow-wrap: break-word;
  word-break: break-word;
}

.reviews-block__text--data {
  display: flex;
  flex-direction: column;
  gap: 50px;
}

.reviews-block__data {
  font-size: 15px;
  color: #636363;
}
</style>
