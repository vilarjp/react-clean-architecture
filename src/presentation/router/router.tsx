import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import '@/presentation/styles/global.scss'

import { SignUp } from '@/presentation/pages'

type Props = {
  makeLogin: React.FC
}

const Router: React.FC<Props> = ({ makeLogin }) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={makeLogin} />
        <Route path="/signup" exact component={SignUp} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
