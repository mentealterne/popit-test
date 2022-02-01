import { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";
import routes from "../../routes/routes-list";

interface IProps {}

const MainNav: FunctionComponent<IProps> = ({ children }) => {
  return (
    <div>
      <nav>
        <ul className="text-gray-600 text-md font-light flex flex-col space-y-2">
          {routes.map((route) => (
            <NavLink to={route.href}>{route.label}</NavLink>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default MainNav;
