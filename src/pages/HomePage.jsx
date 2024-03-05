import CarTable from "../components/CarTable";
import useCarCollectionList from "../hooks/useCarCollectionList";
import { useEffect,useContext,useState } from "react";
import { AuthContext } from '../contexts/AuthContext'

const HomePage = ()=> {
    // const [cars,setCars] = useState([])
    const [fetchCarsCollection, { data, loading, error }] = useCarCollectionList()
    const { token } = useContext(AuthContext)
    console.log(token)
    
    const getCars = ()=>{
        if(token){
            fetchCarsCollection(token)
        }
    }
    
    useEffect(()=>{
        getCars()
    },[])

    console.log({data,loading,error})

    return (
        <div>
            {loading && (
                <div className="container mx-auto">
                    <h2 className="text-center">Loading ....</h2>
                </div>
    )}
            {error && <p>error</p>}
            {data && <CarTable cars={data} getCars={getCars}/>}
        </div>
    );
}

export default HomePage;