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
  ChefProfile,
  MemberProfile,
  PageNotFound,
  MemberBooking,
} from "../index";
import { me } from "../auth/authSlice";
import ProtectedRoute from "./ProtectedRoute";
import EditChefForm from "../chefs/EditChefForm";

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

  console.log("HELLO USER!", user)

  // users/chefs/7/bookings/1
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/map" element={<Map />} />
      <Route path="/chefs" element={<Chefs />} />
      <Route path="/cuisines" element={<Cuisines />} />
      <Route path="/bookings/:bookingId" element={<MemberBooking user={user}/>} />
      <Route element={<ProtectedRoute />}>
      <Route path="/users/chefprofile/:id" element={<ChefProfile user={user} />} />
        {user.role === "CHEF" && (
          <>
            <Route path="/chefs/:chefId/event" element={<ChefForm />} />
            <Route path="/users/chefs/:chefId/bookings/:bookingsId" element={<EditChefForm user={user} />} />
          </>
        )}
        {user.role === "MEMBER" && (
          <Route path="/users/memberprofile/:id" element={<MemberProfile user={user} />} />
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
