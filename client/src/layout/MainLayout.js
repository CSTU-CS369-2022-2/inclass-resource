import { NavLink, Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="container">
      <nav>
        <NavLink to="/">Home</NavLink>&nbsp;
        <NavLink to="/products">Product</NavLink>&nbsp;
        <NavLink to="/about">About us</NavLink>&nbsp;
      </nav>
      <div className="container">
        <Outlet /> {/* your content will be shown in the Outlet */}
      </div>
      <footer>---------This is a footer--------</footer>
    </div>
  );
};

export default MainLayout;
