import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import { router } from '@/router/router.js'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyAQMOSpKhJxtxINmcYd3CXdoeG6WdhVejU',
  authDomain: 'marfusha-app.firebaseapp.com',
  projectId: 'marfusha-app',
  storageBucket: 'marfusha-app.appspot.com',
  messagingSenderId: '323187508252',
  appId: '1:323187508252:web:6b76a633fd1fb735400bd9'
}

initializeApp(firebaseConfig)

const app = createApp(App)

app.use(router)

app.mount('#app')
