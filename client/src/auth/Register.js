import { useState } from "react";
import { toast } from "react-toastify";
import RegisterForm from "../components/RegisterForm";
import { useNavigate } from "react-router-dom";
import { register } from "../actions/auth";

const Register = () => {
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register({
        name,
        email,
        password,
      });

      console.log("REGISTER USER ==>", res);
      toast.success("Regsister Succesffully");
      navigate("/");
    } catch (error) {
      console.log(error);
      if(error.response.status === 400)
      toast.error(error.response.data);
    }
  };
console.log( );
  return (
    <>
      <RegisterForm
        handleSubmit={handleSubmit}
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
    </>
  );
};

export default Register;
