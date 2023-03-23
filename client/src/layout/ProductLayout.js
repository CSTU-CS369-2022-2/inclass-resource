import { Outlet } from "react-router-dom";

const ProductLayout = () => {
  return (
    <><h1>Products</h1>
      <Outlet />
    </>
  );
};
export default ProductLayout;
