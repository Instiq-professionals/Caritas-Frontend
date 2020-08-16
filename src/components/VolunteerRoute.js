import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated, Volunteer} from "../helpers/utils";

const VolunteerRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated() && Volunteer()) {
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

export default VolunteerRoute;
