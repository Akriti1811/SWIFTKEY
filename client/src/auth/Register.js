import { useState } from "react";
import { toast } from "react-toastify";
import RegisterForm from "../components/RegisterForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/signup", {
        name,
        email,
        password,
      });

      console.log("REGISTER USER ==>", res);
      toast.success("Regsister Succesffully");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    }
  };

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
