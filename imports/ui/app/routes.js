import {HomePage} from '../pages/home/HomePage'
import {LoginPage} from '../pages/login/LoginPage'

export const RoutePaths = {
  HOME: '/',
  LOGIN: '/login',
}

export const routes = [
  {
    name: 'Home',
    component: HomePage,
    path: RoutePaths.HOME,
  },
  {
    name: 'Login',
    component: LoginPage,
    path: RoutePaths.LOGIN,
  },
]
