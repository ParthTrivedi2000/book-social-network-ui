// import React, { FC } from 'react';
// import { LoginWrapper } from './Login.styled';
// import { AuthenticationService } from '../../app/services';

// interface LoginProps {}

// const Login: FC<LoginProps> = () => {
   
//    const AuthenticationRequest = {email:'', password: ''};
//    const errorMSG: string[] = [];
   
//    return(
//       <LoginWrapper data-testid="Login">
//          Login Component
//          <div className='container-fluid card login-container'>
//             <h3 className='text-center'>Login</h3>
//             <div className='alert alert-danger' role='alert'></div>

//          </div>
//       </LoginWrapper>
// )
// };

// export default Login;


// // 2nd version :-
// import React, { FC, useState } from 'react';
// import { LoginWrapper } from './Login.styled';

// interface LoginProps {}

// const Login: FC<LoginProps> = () => {
//   // State to store the email, password, and error messages
//   const [authRequest, setAuthRequest] = useState({ email: '', password: '' });
//   const [errorMsg, setErrorMsg] = useState<string[]>([]);

//   // Handle input changes for email and password
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setAuthRequest((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle login
//   const handleLogin = () => {
//     // Add your login logic here
//     console.log('Logging in with:', authRequest);
//     // Simulate a login error for demo
//     setErrorMsg(['Invalid email or password']);
//   };

//   // Handle register redirection (optional, for now it just logs to console)
//   const handleRegister = () => {
//     console.log('Redirecting to registration...');
//   };

//   return (
//    <LoginWrapper data-testid="Login">
//     <div className="container-fluid card login-container">
//       <h3 className="text-center">Login</h3>
//       <hr />
      
//       {/* Display error messages */}
//       {errorMsg.length > 0 && (
//         <div className="alert alert-danger" role="alert">
//           {errorMsg.map((msg, index) => (
//             <p key={index}>{msg}</p>
//           ))}
//         </div>
//       )}
      
//       {/* Email input field */}
//       <div className="mb-3">
//         <label htmlFor="login" className="form-label">Email address</label>
//         <input
//           type="email"
//           name="email"
//           className="form-control"
//           id="login"
//           placeholder="name@example.com"
//           value={authRequest.email}
//           onChange={handleInputChange}
//         />
//       </div>
      
//       {/* Password input field */}
//       <div className="mb-3">
//         <label htmlFor="password" className="form-label">Password</label>
//         <input
//           type="password"
//           name="password"
//           className="form-control"
//           id="password"
//           placeholder="Password"
//           value={authRequest.password}
//           onChange={handleInputChange}
//         />
//       </div>
      
//       {/* Login and Register buttons */}
//       <div className="d-flex justify-content-between mb-3">
//         <button
//           type="button"
//           className="btn btn-primary"
//           onClick={handleLogin}
//         >
//           <em className="fas fa-sign-in-alt">&nbsp;Sign in</em>
//         </button>
//         <div>
//           Don't have an account?&nbsp;
//           <button
//             type="button"
//             className="btn btn-link"
//             onClick={handleRegister}
//           >
//             Register
//           </button>
//         </div>
//       </div>
//     </div>
//    </LoginWrapper>
//   );
// };

// export default Login;




// 3rd version :-

import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'; // Assuming you're using axios for API calls
import { AuthenticationRequest } from '../../app/services/models/AuthenticationRequest'; // Define this model
import { tokenService } from '../../app/services/token/Token'; // Assuming you have a token service
import { LoginContainer } from './Login.styled';

// Login Component
const Login = () => {
   const [authRequest, setAuthRequest] = useState<AuthenticationRequest>({ email: '', password: '' });
   const [errorMsg, setErrorMsg] = useState<string[]>([]);
 
   // const history = useHistory(); // Hook to navigate between pages
   const navigate = useNavigate();  // Initialize useNavigate hook
 
   const login = async () => {
     setErrorMsg([]);
     
     try {
       const response = await axios.post('http://localhost:8088/api/v1/auth/authenticate', authRequest); // Replace with your API endpoint

      //  tokenService.token = response.data.token; // Assuming you store the token in the service
       // Assuming the response contains the token
      tokenService.setToken(response.data.token);  // Store the token using the setToken method


      //  history.push('/books'); // Redirect to /books after login
       navigate('/books');  // Programmatic navigation to '/books' page
     } catch (err) {
       console.log(err);
 
       // TypeScript narrowing for error handling
       if (axios.isAxiosError(err)) {
         // Check if the error is an AxiosError
         if (err.response?.data?.validationErrors) {
           setErrorMsg(err.response.data.validationErrors);
         } else {
           setErrorMsg([err.response?.data?.errorMsg || 'An error occurred.']);
         }
       } else {
         // Fallback for non-Axios errors
         setErrorMsg(['An unknown error occurred.']);
       }
     }
   };
 
   const register = () => {
   //   history.push('/register');
     navigate('/register'); 
   };
 
   return (
      // <LoginContainer>
     <div className="container-fluid card login-container">
       <h3 className="text-center">Login</h3>
       <hr />
       {/* Error messages */}
       {errorMsg.length > 0 && (
         <div className="alert alert-danger" role="alert">
           {errorMsg.map((msg, index) => (
             <p key={index}>{msg}</p>
           ))}
         </div>
       )}
 
       {/* Form inputs */}
       <div className="mb-3">
         <label htmlFor="login" className="form-label">Email address</label>
         <input
           type="email"
           className="form-control"
           id="login"
           placeholder="name@example.com"
           value={authRequest.email}
           onChange={(e) => setAuthRequest({ ...authRequest, email: e.target.value })}
         />
       </div>
       <div className="mb-3">
         <label htmlFor="password" className="form-label">Password</label>
         <input
           type="password"
           className="form-control"
           id="password"
           placeholder="Password"
           value={authRequest.password}
           onChange={(e) => setAuthRequest({ ...authRequest, password: e.target.value })}
         />
       </div>
 
       {/* Buttons */}
       <div className="d-flex justify-content-between mb-3">
         <button onClick={login} type="button" className="btn btn-primary">
           <em className="fas fa-sign-in-alt">&nbsp;Sign in</em>
         </button>
         <div>
           Don't have an account?&nbsp;
           <button onClick={register} type="button" className="btn btn-link">
             Register
           </button>
         </div>
       </div>
     </div>
   //   </LoginContainer>
   );
 };
 
 export default Login;