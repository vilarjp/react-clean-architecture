import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { makeLogin, makeSignUp, makeSurveyList } from '@/main/factories/pages'
import { APIContext } from '@/presentation/contexts'
import {
  saveCurrentAccountAdapter,
  getCurrentAccountAdapter
} from '@/main/adapters/current-account-adapter'
import { PrivateRoute } from '@/presentation/components'

const Router: React.FC = () => {
  return (
    <APIContext.Provider
      value={{
        saveCurrentAccount: saveCurrentAccountAdapter,
        getCurrentAccount: getCurrentAccountAdapter
      }}
    >
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={makeLogin} />
          <Route path="/signup" exact component={makeSignUp} />
          <PrivateRoute path="/" exact component={makeSurveyList} />
        </Switch>
      </BrowserRouter>
    </APIContext.Provider>
  )
}

export default Router
