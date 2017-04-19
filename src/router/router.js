const login = r => require.ensure([], () => r(require('../page/index/login')), 'login');
const index = r => require.ensure([], () => r(require('../page/index/index')), 'index');
const hire = r => require.ensure([], () => r(require('../page/hire/hire')), 'hire');
const salary = r => require.ensure([], () => r(require('../page/salary/salary')), 'salary');
const staff = r => require.ensure([], () => r(require('../page/staff/staff')), 'staff');
const organization = r => require.ensure([], () => r(require('../page/organization/organization')), 'organization');

export default [{
  path: '/',
  component: index,
  children: [{
    path: '',
    redirect: '/hire'
  },
  {
    path: '/login',
    component: login
  },

  {
    path: '/hire',
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
