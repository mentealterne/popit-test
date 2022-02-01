import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import MainLayout from "./components/Layouts/MainLayout";
import routes from "./routes/routes-list";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          {routes.map((route) => (
            <Route path={route.href} element={route.component} />
          ))}
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
