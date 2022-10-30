// import React from "react";
// import "./App.css";
// import { useState } from "react";
// import axios from "axios";

// function SignUp() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const signup = async (e) => {
//     e.preventDefault();

//     axios
//       .post("http://localhost:4000/api/signup", {
//         email,
//         password,
//       })
//       .then(function (response) {
//         console.log(response);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });

//     console.log(email, password);
//   };
//   return (
//     <div>
//      

//       <form>
//         <label>
//           Email:
//           <input
//             type="text"
//             name="email"
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </label>
//         <label>
//           Password:
//           <input
//             type="text"
//             name="password"
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </label>
//         <input type="submit" value="Submit" onClick={signup} />
//       </form>
//     </div>
//   );
// }

// export default SignUp;