import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AuthForm from "../auth/AuthForm";
import {
  ChefForm,
  Home,
  Map,
  Chefs,
  Cuisines,
  Profile,
  PageNotFound,
} from "../index";
import { me } from "../auth/authSlice";
import ProtectedRoute from "./ProtectedRoute";

/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const user = useSelector((state) => state.auth.me);

  console.log("AM I LOGGED IN???---->", isLoggedIn);
  console.log("FIND USER: ", user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/map" element={<Map />} />
      <Route path="/chefs" element={<Chefs />} />
      <Route path="/cuisines" element={<Cuisines />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/users/profile/:id" element={<Profile user={user}/>} />
        {user.role === "CHEF" && (
          <Route path="/chefs/:chefId/event" element={<ChefForm />} />
        )}
      </Route>
      {/* {isLoggedIn && user.role === "CHEF" ? (
        <Route path="/chefs/:chefId/event" element={<ChefForm />} />
      ) : null}
      {isLoggedIn ? (
        <Route path="/users/profile" element={<Profile />} />
      ) : null} */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;

// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Route, Routes } from 'react-router-dom';
// import AuthForm from '../auth/AuthForm';
// import {Home} from "../index"
// import { me } from "../auth/authSlice"

// /**
//  * COMPONENT
//  */

// const AppRoutes = () => {
//   const isLoggedIn = useSelector((state) => !!state.auth.me.id);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(me());
//   }, []);

//   return (
//     <div>
//       {isLoggedIn ? (
//         <Routes>
//           <Route path="/*" element={<Home />} />
//           <Route to="/home" element={<Home />} />
//         </Routes>
//       ) : (
//         <Routes>
//           <Route
//             path="/*"
//             element={<AuthForm name="login" displayName="Login" />}
//           />
//           <Route
//             path="/login"
//             element={<AuthForm name="login" displayName="Login" />}
//           />
//           <Route
//             path="/signup"
//             element={<AuthForm name="signup" displayName="Sign Up" />}
//           />
//         </Routes>
//       )}
//     </div>
//   );
// };

// export default AppRoutes;
