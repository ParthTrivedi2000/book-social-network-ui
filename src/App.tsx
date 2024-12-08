// import React from 'react';
// import logo from './logo.svg';
// import './App.css';
// import Login from './components/login/Login';
// import { BrowserRouter as Router, Route, BrowserRouter, Navigate, Routes } from 'react-router-dom';

// function App() {
//   // return (
// // //       default one
// //     <div className="App">
// //       <header className="App-header">
// //         <img src={logo} className="App-logo" alt="logo" />
// //         <p>
// //           Edit <code>src/App.tsx</code> and save to reload.
// //         </p>
// //         <a
// //           className="App-link"
// //           href="https://reactjs.org"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           Learn React
// //         </a>
// //       </header>
// //     </div>
// // //         default end
// // );

// return (
//   <BrowserRouter>
//     <Routes>
//       {/* Default route, similar to Angular's redirect */}
//       <Route path="/" element={<Navigate to="/books" />} />

//       {/* Define routes for /login, /register, and /activate-account */}
//       <Route path="/login" element={<Login />} />
//       {/* <Route path="/register" element={<Register />} />
//       <Route path="/activate-account" element={<ActivateAccount />} /> */}

//       {/* Other route */}
//       {/* <Route path="/books" element={<Books />} /> */}
//     </Routes>
//   </BrowserRouter>
// );
// }

// export default App;





// 2nd version:-
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/Register/Register';
import ActivateAccount from './components/ActivateAccount/ActivateAccount';
import BookModule from './modules/book/BookModule';
import AuthGuard from './app/services/guard/AuthGuard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="activate-account/:token" element={<ActivateAccount />} />
        <Route
          path="books/*"
          element={
            <AuthGuard>
              <BookModule />
            </AuthGuard>

            // <PrivateRoute>
            //   <BookModule />
            // </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

