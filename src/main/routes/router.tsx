import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { makeLogin, makeSignUp } from '@/main/factories/pages'
import { APIContext } from '@/presentation/contexts'
import {
  saveCurrentAccountAdapter,
  getCurrentAccountAdapter
} from '@/main/adapters/current-account-adapter'

import { SurveyList } from '@/presentation/pages'

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
          <Route path="/" exact component={SurveyList} />
        </Switch>
      </BrowserRouter>
    </APIContext.Provider>
  )
}

export default Router
