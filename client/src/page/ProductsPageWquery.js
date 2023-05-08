// file: /page/ProductsPageWquery.js
import { useLoaderData, Link, Form, useSearchParams, redirect, useSubmit } from "react-router-dom";
import { getProducts, genId } from "../utils/newProductsData";

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const submit = useSubmit();
  const q = searchParams.get('q');

  // -- function doSearch --
  // this delay submitting the query -->make it NOT submit on every keyboard stroke 
  // but it would submit in some delay time.
  // in this case, we still query the whole Products from the database and filter in the React
  // However, if your Products data is big, 
  // it is better to send the filter term and let the DB filter it.
  let timeout = 0;
  const doSearch = (e, form, delay=700) => {
    e.preventDefault();
    var searchText = e.target.value; // this is the search text
    if (timeout) clearTimeout(timeout);
    const param = searchParams.get("q");
    if (param && searchText.trim().length === 0) {
        resetSearch();
    } else {
      if (searchText.trim().length > 0) {
        timeout = setTimeout(() => {
          searchParams.set("q", searchText);
          setSearchParams(searchParams);
          submit(form);
        }, delay);
      }
    }
  }

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
              onChange={(e) => doSearch(e, e.currentTarget.form)}/>
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

// export const productsLoader = async () => {
//    const products = await getProducts();
//    return products;
// };

export async function productsLoader({ request }) {
 const url = new URL(request.url);
 const q = url.searchParams.get("q");
 const products = await getProducts(q);
 return products;
}

export async function action() {
    const productId = genId();
    return redirect(`/products/${productId}/new`);
}
