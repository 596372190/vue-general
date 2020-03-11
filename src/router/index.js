import Vue from "vue";
import VueRouter from "vue-router";
import Home from "components/common/Home.vue";
import Table from "components/table/Table.vue"

Vue.use(VueRouter);

const routes = [
      {
        path: "/",
        redirect: "/table",
      },
     /* {
        path:"/home",
        name:"home",
        component:Home,
      },*/
    {
        path: '/',
        component: Home,
        meta: {title: '自述文件'},
        children: [
            {
                path: '/table',
                component: Table,
                meta: {title: '基础表格'}
            }
        ]
    }
];

const router = new VueRouter({
    routes
});

export default router;
