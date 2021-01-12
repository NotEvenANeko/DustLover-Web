import WebLayout from '@/layout/web'
import PageNotFound from '@/components/404'
import HomePage from '@/view/web/home'
import UserLogin from '@/components/login'
import UserRegister from '@/components/register'
import AboutMe from '@/view/web/about'
import Question from '@/view/web/questionlist'

const WebRouter: RouterObj = {
  path: '/',
  name: 'web',
  component: WebLayout,
  childRoutes: [
    { path: '', component: HomePage },
    { path: 'login', component: UserLogin },
    { path: 'register', component: UserRegister },
    { path: 'about', component: AboutMe },
    { path: 'question', component: Question },
    { path: '*', component: PageNotFound }
  ]
}

export default WebRouter