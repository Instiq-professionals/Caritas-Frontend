import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated, userIsAnAdmin, userIsChairman} from "../helpers/utils";

const AdminAndChairmanRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated() && (userIsAnAdmin() || userIsChairman())) {
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

export default AdminAndChairmanRoute;
