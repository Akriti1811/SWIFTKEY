import { Link } from "react-router-dom";
import "../styles/Login.css";

const LoginForm = ({
  handleSubmit,
  email,
  setEmail,
  password,
  setPassword,
}) => (
  <>
    <div className="loginform">
      <form className="login-form">
        <h3>Login</h3>
        <label>Email</label>
        <input
          type="text"
          placeholder="Enter Email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button disabled={!email || !password}
        className="loginbutton" onClick={handleSubmit}>
          Submit
        </button>
        <br />
        <div className="newaccount">
          {" "}
          Need New Account?
          <Link className="signupbutton" to="/signup">
            SignUp Here
          </Link>
        </div>
      </form>
    </div>
  </>
);

export default LoginForm;
