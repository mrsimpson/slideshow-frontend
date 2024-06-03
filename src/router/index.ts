import { createRouter, createWebHistory } from 'vue-router'
import IntroView from '@/views/IntroView.vue'
import HelloWorld from '@/components/HelloWorld.vue'
import { useUserSessionStore } from '@/stores/userSession'
import AccountView from '@/views/ProfileView.vue'
import PresenterView from '@/views/PresenterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HelloWorld,
      props: { msg: '🏠' }
    },
    {
      path: '/intro',
      name: 'intro',
      component: IntroView
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: HelloWorld,
      props: { msg: 'Feedback' }
    },
    {
      path: '/presenter',
      name: 'presenter',
      component: PresenterView
    },
    { path: '/me', name: 'me', component: AccountView },
    {
      path: '/imprint',
      name: 'imprint',
      component: () => import('@/views/ImprintView.vue')
    },
    {
      path: '/data-protection',
      name: 'data-protection',
      component: () => import('@/views/DataProtectionView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const userSession = useUserSessionStore()

  if (to?.meta.needsAuth) {
    if (userSession.session) {
      return next()
    } else {
      return next('/me')
    }
  }
  return next()
})

export default router
