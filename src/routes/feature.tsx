import React from "react";
import { Redirect, Route } from "react-router-dom";

interface PrivateRouteProps {
  key: string;
  path: string;
  component: React.ComponentClass;
  exact?: boolean;
  isAuthenticated?: boolean;
}

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }: PrivateRouteProps) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              // eslint-disable-next-line react/prop-types
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export { PrivateRoute, PrivateRouteProps };
