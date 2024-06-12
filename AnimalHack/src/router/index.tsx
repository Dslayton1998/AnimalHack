import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useQuestionStore } from '@/stores/counter'
import { computed } from 'vue'


function test() {
  const questionStore = useQuestionStore()
  questionStore.fetchQuestions()

  const getQuestions = computed(() => {
    return questionStore.getQuestions
  })

  const questions = computed(() => {
    return questionStore.questions
  })

  // const questions = questionStore.questions
  
  return (
    <p>{questions.value}</p>
  )
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: test
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router