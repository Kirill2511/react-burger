import { useSelector } from "react-redux";
import { Redirect, Route, useLocation } from "react-router-dom";

import {getSing} from "../../redux/selectors";

const SignRoute = ({ children, ...rest }) => {
  const { isAuthorized } = useSelector(getSing);
  const location = useLocation();
  return (
    <Route
      {...rest}
      render={() =>
        isAuthorized ? (
          <Redirect
            to={{
              pathname: location.state?.from ? location.state?.from.pathname : "/",
            }}
          />
        ) : (
          children
        )
      }
    />
  );
};

export default SignRoute;
