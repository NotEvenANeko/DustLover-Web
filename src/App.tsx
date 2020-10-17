import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CustomState } from '@/redux/types'
import routes from '@/router'
import './App.css'

import axios from '@/utils/axios'

const App = (props: LooseObj) => {
  const userRole = useSelector((state: CustomState) => state.user.userRole)

  function renderRoutes(routes: MainRouter, contextPath: string) {
    const children: Array<JSX.Element> = []

    const renderRoute = (item: RouterObj, routeContextPath: string) => {
      let newContextPath = item.path ? `${routeContextPath}/${item.path}` : routeContextPath
      newContextPath = newContextPath.replace(/\/+/g, '/')

      if (newContextPath.includes('admin') && userRole > 1) {
        item = {
          ...item,
          component: () => <Redirect to='/' />,
          childRoutes: []
        }
      }

      if (item.component) {
        if (item.childRoutes) {
          const childRoutes = renderRoutes(item.childRoutes, newContextPath)
          children.push(
            <Route
              key={newContextPath}
              path={newContextPath}
              render={props => <item.component {...props}>{childRoutes}</item.component>}
            />
          )
          item.childRoutes.forEach(r => renderRoute(r, newContextPath))
        } else {
          children.push(<Route key={newContextPath} component={item.component} path={newContextPath} exact />)
        }
      }
    }

    routes.forEach((item) => renderRoute(item, contextPath))

    return <Switch>{children}</Switch>
  }

  const children = renderRoutes(routes, '/')

  /*axios.post('/statistic/client')
  axios.post('/statistic/resolution', {
    resolution: window.screen.width + 'x' + window.screen.height
  })*/

  return (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  )
}

export default App;