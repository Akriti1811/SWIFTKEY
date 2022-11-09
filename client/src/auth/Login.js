import { useState } from "react";
import { toast } from "react-toastify";
import LoginForm from "../components/LoginForm";
import { login } from "../actions/auth";
import {useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const dispatch =useDispatch()

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      console.log('SENT LOGIN DATA', {email, password});
      try{
        let res = await login({email, password})
        if(res.data) {
            console.log("save user res");
            window.localStorage.setItem("auth", JSON.stringify(res.data));
            window.localStorage.setItem("token",res.token);
            dispatch({
              type: "LOGGED_IN_USER",
              payload: res.data,
            });
            toast.success("Logged In Succesffully");
      navigate("/");
        }
        console.log(res.data);
      } catch(err){
        console.log(err);
        if(err.response.status === 400) 
        toast.error(err.response.data);
      }
    };
  console.log( );
    return (
      <>
        <LoginForm
          handleSubmit={handleSubmit}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
        />
      </>
    );
  };
  
  export default Login;