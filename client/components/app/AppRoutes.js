import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AuthForm from "../auth/AuthForm";
import {
  ChefForm,
  Home,
  Map,
  Chefs,
  ChefProfile,
  MemberProfile,
  PageNotFound,
  MemberBooking,
} from "../index";
import { me } from "../auth/authSlice";
import ProtectedRoute from "./ProtectedRoute";
import EditChefForm from "../chefs/EditChefForm";
import { LinearProgress } from "@mui/material";
import ConfirmationPage from "../stripePayment/ConfirmationPage";

/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoading = useSelector((state) => state.auth.isLoading);
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const user = useSelector((state) => state.auth.me);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  if (isLoading)
    return (
      <LinearProgress/>
    );

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      {user.role === "CHEF" ? null : <Route path="/map" element={<Map user={user} />} />}
      {user.role === "CHEF" ? null : <Route path="/chefs" element={<Chefs />} />}
      <Route
        path="/bookings/:bookingId"
        element={<MemberBooking user={user} />}
      />
      {isLoggedIn && (
        <Route element={<ProtectedRoute />}>
          <Route
            path="/users/chefprofile/:id"
            element={<ChefProfile user={user} />}
          />
          {user.role === "CHEF" && (
            <>
              <Route path="/chefs/:chefId/event" element={<ChefForm />} />
              <Route
                path="/users/chefs/:chefId/bookings/:bookingsId"
                element={<EditChefForm user={user} />}
              />
            </>
          )}
          {user.role === "MEMBER" && (
            <Route
              path="/users/memberprofile/:id"
              element={<MemberProfile user={user} />}
            />
          )}
        </Route>
      )}
      <Route path="/confirmation" element={<ConfirmationPage/>}/>
    </Routes>
  );
};

export default AppRoutes;
