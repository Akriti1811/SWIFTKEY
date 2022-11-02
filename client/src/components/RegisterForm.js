import "../styles/Register.css";
import { Link } from "react-router-dom";

const RegisterForm = ({
  handleSubmit,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
}) => (
  <>
    <div className="registerform">
      <div className="register-form">
        <h3 className="formhead">Register</h3>

        <label>Your name</label>
        <input
          className="reginput"
          type="text"
          placeholder="Enter Name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Email</label>
        <input
          className="reginput"
          type="text"
          placeholder="Enter Email"
          id="regemail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          className="reginput"
          type="password"
          placeholder="Password"
          id="regpassword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button disabled={!name || !email || !password} className="registerbutton" onClick={handleSubmit}>
          Register
        </button>
        <div className="newaccount">
          Already have an Account?
          <Link className="signupbutton" to="/login">
            Login Here
          </Link>
        </div>
      </div>
    </div>
  </>
);

export default RegisterForm;
