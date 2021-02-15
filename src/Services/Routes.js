import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoutes = ({
  component: Component,
  authenticated: authenticated,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (authenticated) {
          return <Component {...rest} />;
        } else {
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        }
      }}
    />
  );
};

export default PrivateRoutes;
