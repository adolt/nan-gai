const login = r => require.ensure([], () => r(require('../page/index/login')), 'login');
const index = r => require.ensure([], () => r(require('../page/index/index')), 'index');
const hire = r => require.ensure([], () => r(require('../page/hire/hire')), 'hire');
const salary = r => require.ensure([], () => r(require('../page/salary/salary')), 'salary');
const staff = r => require.ensure([], () => r(require('../page/staff/staff')), 'staff');
const organization = r => require.ensure([], () => r(require('../page/organization/organization')), 'organization');

const hiring = r => require.ensure([], () => r(require('../page/hire/children/hiring')), 'hiring');
const candidates = r => require.ensure([], () => r(require('../page/hire/children/candidates')), 'candidates');
const salaryDetail = r => require.ensure([], () => r(require('../page/salary/children/salaryDetail')), 'salaryDetail');
const staffDetail = r => require.ensure([], () => r(require('../page/staff/children/staffDetail')), 'staffDetail');
const departments = r => require.ensure([], () => r(require('../page/organization/children/departments')), 'departments');
const wage = r => require.ensure([], () => r(require('../page/organization/children/wage')), 'wage');
const editDepartment = r => require.ensure([], () => r(require('../page/organization/children/editDepartment')), 'editDepartment');
const editWage = r => require.ensure([], () => r(require('../page/organization/children/editWage')), 'editWage');

export default [{
  path: '/',
  component: index,
  children: [
    {
      path: '',
      redirect: '/hire'
    },
    {
      path: '/login',
      component: login
    },

    {
      path: '/hire',
      component: hire,
      children: [{
        path: 'hiring',
        component: hiring
      }, {
        path: 'candidates',
        component: candidates
      }]
    },

    {
      path: '/salary',
      component: salary,
      children: [{
        path: 'salaryDetail',
        component: salaryDetail
      }]
    },

    {
      path: '/staff',
      component: staff,
      children: [{
        path: 'staffDetail',
        component: staffDetail
      }]
    },

    {
      path: '/organization',
      component: organization,
      children: [{
        path: 'departments',
        component: departments,
        children: [{
          path: 'editDepartment',
          component: editDepartment
        }]
      }, {
        path: 'wage',
        component: wage,
        children: [{
          path: 'editWage',
          component: editWage
        }]
      }]
    }
  ]
}];
