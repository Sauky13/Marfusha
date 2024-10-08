import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('../pages/HomePage.vue')
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: () => import('../pages/CatalogPage.vue')
    },
    {
      path: '/aboutus',
      name: 'aboutus',
      component: () => import('../pages/AboutUsPage.vue')
    },
    {
      path: '/records',
      name: 'records',
      component: () => import('../pages/RecordPage.vue')
    },
    {
      path: '/lk',
      name: 'lk',
      component: () => import('../pages/PersonalAreaPage.vue')
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../pages/AuthPage.vue')
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('../pages/LogoutPage.vue')
    },
    {
      path: '/catalog_price/:id',
      name: 'catalog_price',
      component: () => import('../pages/CatalogPricePage.vue')
    },
    {
      path: '/registration',
      name: 'registration',
      component: () => import('../pages/RegistrationPage.vue')
    }
  ]
})
