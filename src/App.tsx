import { useState } from 'react'
import './App.css'
// import Login from './components/Login'
import UserNavigate from './components/UserNavigate'
import { UserProvider } from './components/context'
import UpdateUser from './components/UpdeteUser'
import Registration from './components/Registration'
import {RouterProvider } from 'react-router-dom'
//import Navbar from './components/Navbar'
import { router } from './router'
// import Home from './components/Home'
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // אחרי התחברות מוצלחת, משנה את ה-state
  };
  return (<>
    <UserProvider>
      {isLoggedIn ? (<>
        <UserNavigate />
        <UpdateUser />
        </>) : (<>
       {/* <Login onLoginSuccess={handleLoginSuccess} /> */}
        {/* <Registration /> */}
        </>)}
        </UserProvider>
            <RouterProvider router={router} />
  </>
  )
}

export default App
