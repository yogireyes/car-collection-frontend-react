import axios from "axios";

const apiUrl =  import.meta.env.VITE_API_URL

const useAuth = () => {

  const login = async ({
    email,
    password,}) => {
    const response = await axios.post(`${apiUrl}/login`, {
      email,
      password,
    });
    const {token} = response.data
    localStorage.setItem('token',token)
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
  };

  return {  login, logout };
};

export default useAuth;