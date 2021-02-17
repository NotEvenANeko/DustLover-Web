import AdminLayout from '@/layout/admin'
import AdminHome from '@/view/admin/home'
import AdminUserManager from '@/view/admin/user'
import PageNotFound from '@/components/404'

const AdminRouter: RouterObj = {
  path: '/admin',
  name: 'web',
  component: AdminLayout,
  childRoutes: [
    { path: '', component: AdminHome },
    { path: '/user', component: AdminUserManager },
    { path: '*', component: PageNotFound },
  ]
}

export default AdminRouter