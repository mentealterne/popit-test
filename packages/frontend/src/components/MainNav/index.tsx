import { FunctionComponent } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import Campaigns from "../../routes/campaigns";
import HomePage from "../../routes/home";
import routes from "../../routes/routes-list";
import Stories from "../../routes/stories";

interface IProps {}

const MainNav: FunctionComponent<IProps> = ({ children }) => {
  return (
    <div>
      <nav>
        <ul className="text-gray-600 text-md font-light flex flex-col space-y-2">
          {routes.map((route) => (
            <Link to={route.href}>{route.label}</Link>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default MainNav;
