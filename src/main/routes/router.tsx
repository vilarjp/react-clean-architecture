import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import {
  MakeLogin,
  MakeSignUp,
  MakeSurveyList,
  MakeSurveyResult
} from '@/main/factories/pages'
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
          <Route path="/login" exact component={MakeLogin} />
          <Route path="/signup" exact component={MakeSignUp} />
          <PrivateRoute path="/" exact component={MakeSurveyList} />
          <PrivateRoute path="/surveys/:id" component={MakeSurveyResult} />
        </Switch>
      </BrowserRouter>
    </APIContext.Provider>
  )
}

export default Router
