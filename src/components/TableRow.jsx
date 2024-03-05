import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from '../contexts/AuthContext'

function TableRow({car,getCars}) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { token } = useContext(AuthContext)

  const deleteCar = async (id) => {
    const result = await Swal.fire({
        title: `Do you really want to delete the car ${id}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'

    })
    if(result.isConfirmed){
        try{
            await axios.delete(`${apiUrl}/cars/${id}`,{
              headers: {
                'x-access-token': `Bearer ${token}`
              }
            });
            toast.success("Delete a car successfully");
            getCars();
        }catch(error){
            toast.error(error.message);
        }
    }

}

  return (
    <tr>
        <th scope="row">{car.id}</th>
        <td>{car.brand}</td>
        <td>{car.model}</td>
        <td>{car.year}</td>
        <td><Link to={`/dashboard/edit/${car.id}`} className='btn btn-sm btn-info'>Edit</Link>|
      
        <button onClick={() => deleteCar(car.id)}  className="btn btn-sm btn-danger">Delete</button>
        </td>
    </tr>
  )
}

export default TableRow