import React,{useState,useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import useCreateCar from "../hooks/useCreateCar";
import { useForm } from "react-hook-form"
import { toast } from "react-toastify";
import { AuthContext } from '../contexts/AuthContext'

function CreateCar() {
  const [createCarCollection, { data, loading, error }] = useCreateCar()
  const [authError, setAuthError] = useState("");
  const { token } = useContext(AuthContext)
  const navigate = useNavigate()
  const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm()
  
    const onSubmit = async(data) => {
      console.log(data)
      try {
          const response = await createCarCollection(token,data)
          console.log(response)
          setAuthError("");
          toast.success("Added car successfully");
          navigate("/dashboard")
          
      } catch (error) {
          // console.log(error)
          console.log(error.response.data.message)
          setAuthError(error.response.data.message)
      }

    }


  return (
    <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label  className="form-label">Brand</label>
                <input type="text" className="form-control" {...register('brand',{ required: true })}/>
                {errors.brand?.type === "required" && (
                    <p className='text-danger'>Brand is required</p>
                )}
            </div>
            <div className="mb-3">
                <label  className="form-label">Model</label>
                <input type="text" className="form-control" {...register('model',{ required: true })}/>
                {errors.model?.type === "required" && (
                    <p className='text-danger'>Model is required</p>
                )}
            </div>
            <div className="mb-3">
                <label  className="form-label">Year</label>
                <input type="number" className="form-control" {...register('year',{ required: true })}/>
                {errors.year?.type === "required" && (
                    <p className='text-danger'>Year is required</p>
                )}
            </div>
            
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        {authError && <p className='text-danger'>{authError}</p>}            
    </div>
  )
}

export default CreateCar