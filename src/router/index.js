import { createRouter, createWebHistory } from 'vue-router';
import SignIn from '../components/SignIn.vue';
import SignUp from '../components/SignUp.vue';
import CalendarContainer from '../components/CalendarContainer.vue';
import Success from '../components/Success.vue';
import MainContainer from '../components/MainContainer.vue';

const routes = [
  
  {
    path: '/',
    name: 'SignIn',
    component: SignIn,
  },
  {
    path: '/SignUp',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path:'/success',
    name: 'Success',
    component: Success,
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: CalendarContainer,
  },
  {
    path: '/maincontainer',
    name: 'maincontainer',
    component: MainContainer,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
