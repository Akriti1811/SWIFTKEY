import '../styles/Register.css'
import { Link } from "react-router-dom";


const RegisterForm = ({handleSubmit,name,setName,email,setEmail,password,setPassword,age,setAge,gender,setGender}) => (

<>

<div className="registerform">
   <div onSubmit={handleSubmit} className="register-form">
       <h3 className='formhead'>Register</h3>

       <label for="regemail">Email</label>
       <input className='reginput' type="text" placeholder="Enter Email" id="regemail"
    //    value={email}
    //    onChange={(e) => setEmail(e.target.value)}
       />

       <label for="regpassword">Password</label>
       <input className='reginput' type="password" placeholder="Password" id="regpassword"
    //    value={password}
    //    onChange={(e) => setPassword(e.target.value)}
       />

        

       <button className="registerbutton">Register</button>
       <div className="newaccount">
          Already have an Account?
          <Link className="signupbutton" to="/login">
            Login Here
          </Link>
        </div>
   </div>
</div>

</>
)


export default RegisterForm;


