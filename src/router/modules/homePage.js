import Layout from '@/layout'

export default {
  path: '/home',
  component: Layout,
  name: 'home',
  children: [
    {
      path: '',
      component: () => import('@/views/home/list'),
      name: 'home',
      meta: {
        title: '首页'
      }
    },
    {
      path: 'detail',
      component: () => import('@/views/home/detail'),
      name: 'detail',
      meta: {
        title: '详情页'
      },
      hidden:true
    },
  ]
}
