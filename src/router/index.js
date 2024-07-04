import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      name:'welcome',
      component:()=>import('@/views/WelcomeView.vue'),
      children:[
        {
          path:'',
          name:'welcome-login',
          component:()=>import('@/components/welcome/LoginPage.vue')
        },{
          path:'register',
          name:'welcome-register',
          component:()=>import('@/components/welcome/RegisterPage.vue')
        }
      ]
    },{
      path:'/index',
      name:'index',
      component:()=>import('@/views/index.vue')
    },{
      path:'/week',
      name:'week',
      component:()=>import('@/views/week.vue')
    },{
      path:'/month',
      name:'month',
      component:()=>import('@/views/month.vue')
    },{
      path:'/year',
      name:'year',
      component:()=>import('@/views/year.vue')
    }

  ]
})

export default router
