import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import '@/presentation/styles/colors.scss'
import '@/presentation/styles/global.scss'

type Props = {
  makeLogin: React.FC
}

const Router: React.FC<Props> = ({ makeLogin }) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={makeLogin} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
