/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const chartsRouter = {
  path: '/deviceMap',
  component: Layout,
  redirect: '/map',
  name: 'Dmap',
  meta: {
    title: '地图',
    icon: 'chart'
  },
  children: [
    {
      path: '/map',
      component: () => import('@/views/deviceMap/map'),
      name: 'Dmap',
      meta: { title: '地图' }
    }
  ]
}

export default chartsRouter
