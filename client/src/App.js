import "./App.css";
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
import ProductsPage, { productsLoader, action } from "./page/ProductsPageWquery";
import Product, { productDetailLoader } from "./page/ProductDetailPage";
import NewProduct, { newAction } from "./page/NewProduct";
import EditProduct, { editAction } from "./page/EditProduct";
import LoginPage from "./page/LoginPage";
import RegisterPage, { action as registerAction } from "./page/RegisterPage";
import RegisterSwitchPage from "./page/RegisterSwitchPage";
import SecretPage from "./page/SecretPage";

// import component
import NotFound from "./component/NotFound";
import ErrorPage from "./component/ErrorPage";
import { action as destroyAction } from "./component/destroy";
import RequireAuth from "./component/RequireAuth";
import UnauthorizeError from "./component/UnauthorizeError";

// import utils
import { AuthProvider } from "./utils/AuthProvider";
import useFetchPrivate from "./utils/useFetchPrivate";
import ROLES_LIST from "./utils/rolesList";
import usePermission from "./utils/usePermission";

function RouterApp() {
  const fetchPrivate = useFetchPrivate();
  const { hasPermission } = usePermission();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />} errorElement={<NotFound />}>
        <Route index element={<Home />} />
        <Route
          path="products"
          element={<ProductLayout />}
          errorElement={<ErrorPage />}
        >
          <Route
            index
            element={<ProductsPage />}
            loader={productsLoader}
            action={action}
          />
          <Route
            path=":id"
            element={<Product />}
            loader={productDetailLoader}
            // errorElement={<ErrorPage />}
          />
          <Route path=":id/new" element={<NewProduct />} action={newAction} />
          <Route
            element={
              <RequireAuth
                allowedRoles={[ROLES_LIST.Admin, ROLES_LIST.Editor]}
              />
            }
          >
            <Route
              path=":id/edit"
              element={<EditProduct />}
              loader={productDetailLoader}
              action={editAction(fetchPrivate)}
              errorElement={<ErrorPage />}
            />
            <Route
              path=":id/destroy"
              action={destroyAction(fetchPrivate, hasPermission)}
            />
          </Route>
        </Route>

        <Route element={<RegisterSwitchPage/>}> 
          <Route path="register" element={<RegisterPage />} action={registerAction} />          
        </Route>
        <Route path="about" element={<About />} />
        <Route path="unauthorize" element={<UnauthorizeError />} />
        {/* <Route path="login" element={<LoginPage />} action={loginAction(auth)}/> */}
        <Route path="login" element={<LoginPage />} />

        <Route
          element={
            <RequireAuth allowedRoles={[...Object.values(ROLES_LIST)]} />
          }
        >
          <Route path="secret" element={<SecretPage />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default function App() {
  return (
    <AuthProvider>
      <RouterApp />
    </AuthProvider>
  );
}
