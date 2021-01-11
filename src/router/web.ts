import WebLayout from '@/layout/web'
import PageNotFound from '@/components/404'
import HomePage from '@/view/web/home'
import UserLogin from '@/components/login'
import UserRegister from '@/components/register'

const WebRouter: RouterObj = {
  path: '/',
  name: 'web',
  component: WebLayout,
  childRoutes: [
    { path: '', component: HomePage },
    { path: 'login', component: UserLogin },
    { path: 'register', component: UserRegister },
    { path: '*', component: PageNotFound }
  ]
}

export default WebRouter