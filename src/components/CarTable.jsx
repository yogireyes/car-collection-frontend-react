import React from 'react'
import TableRow from './TableRow'

function CarTable({cars,getCars}) {

  return (
    <div className='container'>
        <table className="table">
        <thead>
            <tr>
                <th scope="col">Id</th>
                <th scope="col">Brand</th>
                <th scope="col">Model</th>
                <th scope="col">Year</th>
                <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody>
            {cars.map((car)=>(
                <TableRow key={car.id} car={car} getCars={getCars}/>
            ))}
        </tbody>
        </table>
    </div>
  )
}

export default CarTable