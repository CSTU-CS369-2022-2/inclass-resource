import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

// import layout
import MainLayout from "./layout/MainLayout";
import ProductLayout from "./layout/ProductLayout";

// import pages
import Home from "./page/HomePage";
import About from "./page/AboutPage";
import ProductsPage, { productsLoader }  from "./page/ProductsPage";
import ProductDetailPage, {loader as detailLoader} from "./page/ProductDetailPage";
import ErrorPage from "./component/ErrorPage";
import NotFound from "./component/NotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />} errorElement={<NotFound />}>
      <Route index element={<Home />} />
      <Route path="products" element={<ProductLayout />}>
        <Route index element={<ProductsPage />} loader={productsLoader} errorElement={<ErrorPage />}/>
        <Route path=":id" element={<ProductDetailPage />} loader={detailLoader} />
      </Route>
      <Route path="about" element={<About />} />
    </Route>
  )
);
const App = () => <RouterProvider router={router} />;
export default App;
