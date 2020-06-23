import React from 'react'
import ReactDOM from 'react-dom'

import { Router } from '@/presentation/router'
import { makeLogin } from './factories/pages'

ReactDOM.render(
  <Router makeLogin={makeLogin} />,
  document.getElementById('main')
)
