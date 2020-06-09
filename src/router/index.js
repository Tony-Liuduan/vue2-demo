/**
 * @fileoverview 
 * @author liuduan
 * @Date 2020-06-06 11:40:54
 * @LastEditTime 2020-06-07 12:26:31
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'



// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)
Vue.use(VueRouter);


const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: 'about' */ '../views/About.vue')
    },
    {
        path: '/list/:id',
        name: 'List',
        component: () =>
            import(/* webpackChunkName: 'list' */ '../views/List.vue'),
        children: [
            {
                path: 'a/:id',
                component: () =>
                    import(/* webpackChunkName: 'listA' */ '../components/ListA.vue'),
            },
            {
                path: 'b',
                name: 'ListB',
                component: () =>
                    import(/* webpackChunkName: 'listB' */ '../components/ListB.vue'),
            },
            {
                path: 'c',
                name: 'ListC',
                component: () =>
                    import(/* webpackChunkName: 'listC' */ '../components/ListC.vue'),
            },
        ],
    },
    {
        path: '*',
        redirect: '/',
    },
]


const router = new VueRouter({
    routes,
});

// router.beforeEach((to, from, next) => {
//   console.log('beforeEach', to, from);
//   next();
//   // next(false);
// });

router.afterEach((/* to, from */) => {
    // console.log(to, from);
    window.scrollTo(0, 0);
});

export default router;
