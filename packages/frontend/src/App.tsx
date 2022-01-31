import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";

function Index() {
  return <h2>Home</h2>;
}

type TParams = { id: number };

function Product(): JSX.Element {
  const params = useParams();

  return <h2>This is a page for product with ID: {params.id}</h2>;
}

function AppRouter() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products/1">First Product</Link>
            </li>
            <li>
              <Link to="/products/2">Second Product</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/products/:id" element={<Product />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default AppRouter;
