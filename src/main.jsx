import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import {Route,RouterProvider,createBrowserRouter,createRoutesFromElements} from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from './pages/LoginPage';
import CreateCar from './pages/CreateCar';
import EditCar from './pages/EditCar';
import PrivateRoutes from './utils/PrivateRoutes.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from "./contexts/AuthContext"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<LoginPage/>}></Route>
      <Route path='/dashboard' element={<PrivateRoutes/>}>
        <Route path="/dashboard" element={<HomePage/>}></Route>
        <Route path="/dashboard/create" element={<CreateCar/>}></Route>
        <Route path="/dashboard/edit/:id" element={<EditCar/>}></Route>
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
    <ToastContainer />
  </React.StrictMode>,
)
