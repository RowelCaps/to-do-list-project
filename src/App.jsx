import React from 'react'
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Routes
} from 'react-router-dom'

import Layout from './components/Layout'
import HomeLayout from './components/HomeLayout'
import UserLayout from './components/UserLayout'
import Home from './pages/Home'
import Login, {action as loginAction} from './pages/Login'
import Schedule from './pages/Schedule'
import { UserLoginContext } from './UserContext'

const router = createBrowserRouter(createRoutesFromElements(
    <Route path='' element={<Layout/>}>
      <Route index element={<HomeLayout/>}/>
      <Route path='login' 
        element={<Login/>}
        action={loginAction} 
      />
      <Route path='user' element= {<UserLayout/>}>
          <Route path='schedule' element={<Schedule />}/>
      </Route>
    </Route>
));

export default function App() {

  const [isLoggedIn, setLogin] = React.useState(false);
  const loginProvider = React.useMemo(() => ({isLoggedIn, setLogin}), [isLoggedIn, setLogin]);

  return (
    <UserLoginContext.Provider value={loginProvider}>
      <RouterProvider router={router} />
    </UserLoginContext.Provider>
  )
}

