import axios from "axios";
import { useReducer } from "react";


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

const useFetchCar = () => {
  const [{ data, loading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const fetchCar = async (id,token) => {
    dispatch({ type: Action.LOADING });

    try {
        const response = await axios.get(`${apiUrl}/cars/${id}`,
        {
            headers: {
              'x-access-token': `Bearer ${token}`
            }
          }
        );
        console.log(response)
        dispatch({ type: Action.SUCCESS, payload: response.data });
        return response.data
    } catch (err) {
        dispatch({ type: Action.FAILED, payload: err.message });
    }
  };

  return [fetchCar, { data, loading, error }];
};

export default useFetchCar;