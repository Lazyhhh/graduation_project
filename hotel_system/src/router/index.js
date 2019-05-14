import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Home from '@/components/Home'
import Index from '@/components/index'
import Hotel from '@/components/hotel'
import Order from '@/components/order'
import Center from '@/components/center'
import Register from '@/components/register'
import HotelDisplay from '@/components/hotel_display'
import HotelDetail from '@/components/hotel_detail'
import AdminIndex from '@/components/admin_index'
import AdminOrder from '@/components/admin_order'
import AdminRoom from '@/components/admin_room'
import Comment from '@/components/comment'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
      component: Home,
      children: [{
        path: 'index',
        name: 'index',
        redirect: 'index/comment',
        component: Index,
        children: [{
          path: 'comment',
          component: Comment
        }, {
          path: 'message',
          component: {
            template: `<span>留言</span>`
          }
        }]
      }, {
        path: 'hotel',
        component: Hotel,
        redirect: 'hotel/sz',
        children: [{
          path: 'sz',
          component: HotelDisplay
        }]
      }, {
        path: 'order',
        component: Order
      }, {
        path: 'center',
        component: Center
      }, {
        path: 'detail',
        name: 'detail',
        component: HotelDetail
      }]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminIndex,
      children: [{
        path: 'index',
        name: 'adminIndex',
        component: {
          template: `<div>管理员页面首页</div>`
        }
      }, {
        path: 'order',
        name: 'adminOrder',
        component: AdminOrder
      }, {
        path: 'message',
        name: 'adminOrder',
        component: {
          template: `<div>管理员留言首页</div>`
        }
      }, {
        path: 'user',
        name: 'adminOrder',
        component: {
          template: `<div>管理员用户首页</div>`
        }
      }, {
        path: 'room',
        name: 'adminRoom',
        component: AdminRoom
      }]
    }
  ]
})
