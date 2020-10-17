import WebLayout from '@/layout/web'
import PageNotFound from '@/components/404'
import HomePage from '@/view/web/home'

const WebRouter: RouterObj = {
  path: '/',
  name: 'web',
  component: WebLayout,
  childRoutes: [
    { path: '', component: HomePage },
    { path: '*', component: PageNotFound }
  ]
}

export default WebRouter