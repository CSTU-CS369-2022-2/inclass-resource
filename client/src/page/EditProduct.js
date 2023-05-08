// file: /page/EditProduct.js
import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom";

export const editAction =
  (fetchPrivate) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    // get data out for validation, if needed. For example,
    // const name = formData.get("name");
    // const category = formData.get("category");
    let product = Object.fromEntries(formData);
    const id = params.id;
    try {
      let { response, data } = await fetchPrivate.callFetch(
        `/api/product/${id}`,
        {
          method: "PUT",
          body: JSON.stringify({ ...product, id }),
        }
      );
      if (!response.ok) {
        throw Error({ error: `Could not update product ${product.name}` });
      }
      return redirect(`/products/${id}`);
    } catch (error) {
      throw error;
    }
  };

export default function EditProduct() {
  const product = useLoaderData();
  const navigate = useNavigate();

  return (
    <Form method="post" className="product-form" replace>
      <label>
        <span>Name*</span>
        <input
          placeholder="Name"
          type="text"
          name="name"
          required
          defaultValue={product.name}
        />
      </label>
      <label>
        <span>Category*</span>
        <input
          placeholder="Category"
          type="text"
          name="category"
          required
          defaultValue={product.category}
        />
      </label>
      <label>
        <span>Price*</span>
        <input
          type="number"
          name="price"
          placeholder="Price"
          required
          defaultValue={product.price}
          step={0.01}
        />
      </label>
      <label>
        <span>In stock*:</span>
        <span>
          <input
            type="radio"
            name="stocked"
            defaultValue={true}
            defaultChecked={product.stocked}
          />
          available
        </span>
        <span>
          <input
            type="radio"
            name="stocked"
            defaultValue={false}
            defaultChecked={!product.stocked}
          />
          out of stock
        </span>
      </label>
      <label>
        <span>Detail</span>
        <textarea name="detail" rows={6} defaultValue={product.detail} />
      </label>
      <p>
        <button type="submit">Save</button>
        <button
          type="button"
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </button>
      </p>
    </Form>
  );
}
