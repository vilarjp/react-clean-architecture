import React, { useContext } from 'react'
import { RouteProps, Route, Redirect } from 'react-router-dom'
import { APIContext } from '@/presentation/contexts'

// import { Container } from './styles';

const PrivateRoute: React.FC<RouteProps> = (props: RouteProps) => {
  const { getCurrentAccount } = useContext(APIContext)

  return getCurrentAccount()?.accessToken ? (
    <Route {...props} />
  ) : (
    <Route {...props} component={() => <Redirect to="/login" />} />
  )
}

export default PrivateRoute
