  import './App.css'
// import Login from './components/Login'
// import { UserProvider } from './components/context'
import {RouterProvider } from 'react-router-dom'
//import Navbar from './components/Navbar'
import { router } from './router'
// import Home from './components/Home'
function App() {
  return (<>
   
            <RouterProvider router={router} />
  </>
  )
}

export default App
