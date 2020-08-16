import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated, cLeader} from "../helpers/utils";

const CleaderRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated() && cLeader()) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/dashboard",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default CleaderRoute;
