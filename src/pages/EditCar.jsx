import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetchCar from "../hooks/useFetchCar";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from '../contexts/AuthContext'

function EditCar() {
  const apiUrl = import.meta.env.VITE_API_URL;
  let { id } = useParams();
  const [authError, setAuthError] = useState("");
  const [fetchCar, { data, loading, error }] = useFetchCar();
  const { token } = useContext(AuthContext)

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      const response = await fetchCar(id, token);
      return {
        brand: response.brand,
        model: response.model,
        year: response.year,
      };
    },
  });

  const onSubmit = async (carData) => {
    console.log(carData);
    try {
      const response = await axios.put(`${apiUrl}/cars/${id}`, carData, {
        headers: {
          "x-access-token": `Bearer ${token}`,
        },
      });
      console.log(response);
      setAuthError("");
      toast.success("Updated car successfully");
      navigate("/dashboard");
    } catch (error) {
      // console.log(error)
      console.log(error);
      setAuthError(error.response.data.message);
    }
  };
  
  if (loading) return (
    <div className="container mx-auto">
        <h2 className="text-center">Loading ....</h2>
    </div>
);
  if (error) return <h1>{error}</h1>;
  if (data?.errors) return <h1>Car not found</h1>;

  return (
    <>
      {data && (
        <div className="container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">Brand</label>
              <input
                type="text"
                className="form-control"
                {...register("brand", { required: true })}
              />
              {errors.brand?.type === "required" && (
                <p className="text-danger">Brand is required</p>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Model</label>
              <input
                type="text"
                className="form-control"
                {...register("model", { required: true })}
              />
              {errors.model?.type === "required" && (
                <p className="text-danger">Model is required</p>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Year</label>
              <input
                type="number"
                className="form-control"
                {...register("year", { required: true })}
              />
              {errors.year?.type === "required" && (
                <p className="text-danger">Year is required</p>
              )}
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
          {authError && <p className="text-danger">{authError}</p>}
        </div>
      )}
    </>
  );
}

export default EditCar;
