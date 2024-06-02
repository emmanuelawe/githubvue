import { createRouter, createWebHistory } from 'vue-router'
import RepoPage from '../views/RepoPage.vue'
import RepoDetails from '../views/RepoDetails.vue'
import NotFound from '../views/NotFound.vue'
import ErrorUI from '../views/ErrorUI.vue'



const router = createRouter({
  //   history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: RepoPage
    },
    {
      path: '/repos/:user/:name',
      name: 'repodetails',
      component: RepoDetails,
      props: true
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notfound',
      component: NotFound
    },
    { path: '/error',
    name: 'errorboundary',
    component: ErrorUI
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
