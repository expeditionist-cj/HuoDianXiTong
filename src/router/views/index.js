import Layout from '@/page/index/'
export default [
    {
        path: '/wel',
        component: Layout,
        redirect: '/wel/index',
        children: [{
            path: 'index',
            name: '项目简介',
            component: () =>
                import( /* webpackChunkName: "views" */ '@/views/datamon/projectinfo/index')
        }]
    },
    {
        path: '/info',
        component: Layout,
        redirect: '/info/index',
        children: [{
            path: 'index',
            name: '个人信息',
            component: () =>
                import( /* webpackChunkName: "page" */ '@/views/admin/user/info'),
        }]
    }]
