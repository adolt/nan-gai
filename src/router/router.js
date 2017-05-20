const login = r => require.ensure([], () => r(require('../page/index/login')), 'login');
const index = r => require.ensure([], () => r(require('../page/index/index')), 'index');
const hire = r => require.ensure([], () => r(require('../page/hire/hire')), 'hire');
const salary = r => require.ensure([], () => r(require('../page/salary/salary')), 'salary');
const staff = r => require.ensure([], () => r(require('../page/staff/staff')), 'staff');
const organization = r => require.ensure([], () => r(require('../page/organization/organization')), 'organization');
// const bus = r => require.ensure([], () => r(require('../page/bus')), 'bus');
import VueRouter from 'vue-router';

let routes = [{
  path: '/',
  component: index,
  children: [{
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    component: login,
    beforeEnter: (to, from, next) => {
      if (sessionStorage.getItem('user')) {
        next('hire');
      }
      next();
    }
  },

  {
    path: '/hire',
    name: 'hire',
    component: hire
  },

  {
    path: '/salary',
    component: salary
  },

  {
    path: '/staff',
    component: staff
  },

  {
    path: '/organization',
    component: organization
  }
  ]
}];

const router = new VueRouter({
  routes
});

export default router;
