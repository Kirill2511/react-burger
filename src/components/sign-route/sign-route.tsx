import { FC } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { useSelector } from "../../utils/hooks";

interface ISignRoute {
  path?: string | string[];
  exact?: boolean;
}

interface ILocation extends Location {
  from: {
    pathname: string;
  };
}

const SignRoute: FC<ISignRoute> = ({ children, ...rest }) => {
  const { isAuthorized } = useSelector((store) => store.sign);
  const location = useLocation<ILocation>();
  return (
    <Route
      /* eslint-disable-next-line react/jsx-props-no-spreading */
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
