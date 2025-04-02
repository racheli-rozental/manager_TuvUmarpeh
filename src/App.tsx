import './App.css'
// import Login from './components/Login'
import UserNavigate from './components/UserNavigate'
import { UserProvider } from './components/context'
import UpdateUser from './components/UpdeteUser'
import {RouterProvider } from 'react-router-dom'
//import Navbar from './components/Navbar'
import { router } from './router'
// import Home from './components/Home'
function App() {
  return (<>
    <UserProvider>
        <UserNavigate />
        <UpdateUser />
      
        </UserProvider>
            <RouterProvider router={router} />
  </>
  )
}

export default App
