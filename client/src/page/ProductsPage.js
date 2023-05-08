// file: /page/ProductsPage.js
import { useLoaderData, Link, Form, useSearchParams, redirect, useSubmit } from "react-router-dom";
import { getProducts, genId } from "../newProductsData";

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const submit = useSubmit();
  const q = searchParams.get('q');

  const products = useLoaderData();
  const list = products.map((e) => (
    <Link key={e.id} to={e.id}>
      <li title={e.category}>{e.name}</li>
    </Link>
  ));

  const resetSearch = (e) => {
    // we still want the reset form behavior, so do NOT prevent default
    //    e.preventDefault();

    // need to clear the searchParams on the URL
    const param = searchParams.get("q");
    if (param) {
      searchParams.delete("q");
      setSearchParams(searchParams);
    }
  };

  return (
    <>
      <Form id="search-form" role="search">
        <fieldset>
          <legend>Search</legend>
          <input id="q" placeholder="Search" type="search" name="q" defaultValue={q}
                onChange={(event) => {
                    submit(event.currentTarget.form);
                }}
          />
          <input type="reset" onClick={resetSearch} />
        </fieldset>
      </Form>
      <hr />

      <Form method="post">
        <button type="submit">Add new product</button>
      </Form>
      {products.length ? (
        <ul className="list-item">{list}</ul>
      ) : (
        "No product available"
      )}
    </>
  );
};
export default ProductsPage;

export const productsLoader = async () => {
  const res = await getProducts();
  return res;
};

// export async function productsLoader({ request }) {
//  const url = new URL(request.url);
//  const q = url.searchParams.get("q");
//  const products = await getProducts(q);
//  return products;
//   // const products = await getProducts();
//   // return products;
// }


export async function action() {
    const productId = genId();
    return redirect(`/products/${productId}/new`);
}
