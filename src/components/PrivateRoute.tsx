import React from "react";
import { Route, Navigate } from "react-router-dom";

interface PrivateRouteProps {
  component: React.ComponentType;
  [key: string]: any;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    element={
      localStorage.getItem("token") ? (
        <Component {...rest} />
      ) : (
        <Navigate to="/login" />
      )
    }
  />
);

export default PrivateRoute;
