import React, { useMemo, useReducer, useContext, useState } from "react";
import { AsyncStorage } from "react-native";
import jwt_decode from "jwt-decode";
import axios from "axios";


// CONFIG KEYS [Storage Keys]===================================
export const TOKEN_KEY = "token";
export const USER_KEY = "user";
export const keys = [TOKEN_KEY, USER_KEY];

// CONTEXT ===================================
const AuthContext = React.createContext();

function AuthProvider(props) {
 const [userData, setUserData] = useState({})
  // Get Auth state
  const getAuthState = async () => {
    try {
      //GET TOKEN && USER
      let token = await AsyncStorage.getItem(TOKEN_KEY);
      let user = await AsyncStorage.getItem(USER_KEY);
      user = JSON.parse(user);

      if (token !== null && user !== null){
        setUserData(user)
        return { token, user };
      } 
      else return { token: null, user: null };
    } catch (error) {
      throw new Error(error);
    }
  };

  // Handle Login

  const handleLogin = async (data) => {
    try {
      //STORE DATA
      let token = data.token;
      let user = jwt_decode(token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      const user_data = await axios.get("http://192.168.0.150:8000/api/v1/users/"+user._id);
      if(user_data.data.success == true){
    //   userData = user_data.data.data;

       
    setUserData(user_data.data.data);
      }
      let data_ = [
        [USER_KEY, JSON.stringify(user_data.data.data)],
        [TOKEN_KEY, token],
      ];

      await AsyncStorage.multiSet(data_);

      //AXIOS AUTHORIZATION HEADER
      
    } catch (error) {
        console.log(error)
      throw new Error(error.response);
      
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      //REMOVE DATA
      await AsyncStorage.multiRemove(keys);
      setUserData({});
      //AXIOS AUTHORIZATION HEADER
      delete axios.defaults.headers.common["Authorization"];


    } catch (error) {
      throw new Error(error);
    }
  };

  //UPDATE USER LOCAL STORAGE DATA AND DISPATCH TO REDUCER
  const updateUser = async (user) => {
    try {
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
        setUserData(user);
    } catch (error) {
      throw new Error(error);
    }
  };
  const value = useMemo(() => {
    return { getAuthState, handleLogin, handleLogout, updateUser, userData};
  });

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);
export { AuthContext, useAuth };
export default AuthProvider;