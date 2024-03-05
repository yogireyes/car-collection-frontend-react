import React, { useState,useContext } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate,Navigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { AuthContext } from '../contexts/AuthContext'
import useAuth from '../hooks/useAuth'

function LoginPage() {
    const {token, setToken } = useContext(AuthContext)

    const [authError, setAuthError] = useState("");
    const {login} = useAuth()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()
    
      const onSubmit = async(data) => {
        
        try {
            const response = await login(data)
            console.log(response)
            setToken(response.token)
            setAuthError("");
            toast.success("Successfully logged in.");
            navigate("/dashboard")
            
        } catch (error) {
            // console.log(error)
            console.log(error.response.data.message)
            setAuthError(error.response.data.message)
        }

      }

      if (token) return <Navigate to="/dashboard" />

  return (
    <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" {...register('email',{ required: true })}/>
                {errors.email?.type === "required" && (
                    <p className='text-danger'>Email is required</p>
                )}
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" {...register('password',{ required: true })}/>
                {errors.password?.type === "required" && (
                    <p className='text-danger'>Password is required</p>
                )}
            </div>
            
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
                   
    </div>
  )
}

export default LoginPage