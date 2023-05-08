// file: /page/ProductDetailPage.js
import { useLoaderData, Form } from "react-router-dom";
import { getProduct } from "../utils/newProductsData";
import BreadCrumbs from "../component/BreadCrumbs";
import usePermission from "../utils/usePermission";
import ROLES_LIST from "../utils/rolesList";
export const productDetailLoader = async ({ params }) => {
  const { id } = params;
  try {
    const res = await getProduct(id);
    return res;
  } catch (error) {
    throw new Error("Product with id: " + id + " could not be found.");
  }
};

const Product = () => {
  let product = useLoaderData();
  let { hasPermission } = usePermission();

  return (
    <>
      <BreadCrumbs />

      <div className="item">
        {product ? (
          <>
            <h2>{product.name}</h2>
            <div>
              <span>Id:</span> {product.id}
            </div>
            <div>
              <span>Category:</span> {product.category}
            </div>
            <div>
              <span>Price:</span> {product.price}
            </div>
            {product.stocked ? (
              <div className="info">Available</div>
            ) : (
              <div className="danger">Out of stock</div>
            )}
            <div>
              <span>Detail:</span>
              {product.detail}
            </div>
          </>
        ) : (
          <div>No such product!</div>
        )}
      </div>
      <div className="control-button">
        {/* <Form action="edit" replace>
            <button type="submit">Edit</button>
          </Form>
          <Form replace
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (!window.confirm("Please confirm you want to delete this record.")) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form> */}
        {hasPermission([ROLES_LIST.Admin, ROLES_LIST.Editor]) && (
          <>
            <Form replace action="edit">
              <button type="submit">Edit</button>
            </Form>
            <Form replace method="post" action="destroy">
              <button type="submit">Delete</button>
            </Form>{" "}
          </>
        )}
      </div>
    </>
  );
};
export default Product;
