import AdminLayout from '@/layout/admin'
import AdminHome from '@/view/admin/home'
import AdminUserManager from '@/view/admin/user'
import AdminFriendLinkManager from '@/view/admin/friend/list'
import AdminFriendLinkEdit from '@/view/admin/friend/edit'
import AdminFriendLinkAdd from '@/view/admin/friend/add'
import PageNotFound from '@/components/404'

const AdminRouter: RouterObj = {
  path: '/admin',
  name: 'web',
  component: AdminLayout,
  childRoutes: [
    { path: '', component: AdminHome },
    { path: '/user', component: AdminUserManager },
    { path: '/friend', component: AdminFriendLinkManager },
    { path: '/friend/add', component: AdminFriendLinkAdd },
    { path: '/friend/:id', component: AdminFriendLinkEdit },
    { path: '*', component: PageNotFound },
  ]
}

export default AdminRouter