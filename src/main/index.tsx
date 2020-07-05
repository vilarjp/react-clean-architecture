import React from 'react'
import ReactDOM from 'react-dom'

import Router from '@/presentation/router/router'
import { makeLogin, makeSignUp } from './factories/pages'

ReactDOM.render(
  <Router makeLogin={makeLogin} makeSignUp={makeSignUp} />,
  document.getElementById('main')
)
