/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const manageRouter = {
  path: '/manage',
  component: Layout,
  redirect: '/user',
  name: 'manage',
  meta: {
    title: '管理',
    icon: 'table',
    roles: ['admin']
  },
  children: [
    {
      path: '/device',
      component: () => import('@/views/manage/device'),
      name: 'device',
      meta: {
        title: '设备管理',
        roles: ['admin']
      }
    },
    {
      path: '/user',
      component: () => import('@/views//manage/user'),
      name: 'user',
      meta: {
        title: '用户管理',
        roles: ['admin']
      }
    }
  ]
}
export default manageRouter
