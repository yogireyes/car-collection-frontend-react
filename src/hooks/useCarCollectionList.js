import { useEffect, useReducer } from "react"
import axios from "axios";

const apiUrl =  import.meta.env.VITE_API_URL

const initialState = {
    data:null,
    error:null,
    loading:false
}

const Action = {
    LOADING: "LOADING",
    SUCCESS: "SUCCESS",
    FAILED: "FAILED",
};
  
const reducer = (_, action) => {
switch (action.type) {
    case Action.LOADING:
    return {
        data: null,
        error: null,
        loading: true,
    };
    case Action.SUCCESS:
    return {
        error: null,
        loading: false,
        data: action.payload,
    };
    case Action.FAILED:
    return {
        error: action.payload,
        data: null,
        loading: false,
    };
    default:
    return initialState;
}
};
  


const useCarCollectionList=()=> {
    const [{ data, loading, error }, dispatch] = useReducer(reducer,initialState)

    

    const fetchCarsCollection =  async(token)=>{
        dispatch({ type: Action.LOADING });
        try {
            const response = await axios.get(`${apiUrl}/cars`,
            {
                headers: {
                  'x-access-token': `Bearer ${token}`
                }
              }
            );
            dispatch({ type: Action.SUCCESS, payload: response.data });
        } catch (err) {
            dispatch({ type: Action.FAILED, payload: err.message });
        }
    }

    

    return [fetchCarsCollection, { data, loading, error }];
}

export default useCarCollectionList