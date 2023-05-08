/*
  This product data fetches data from database
  however, it provides only get and add (add has no authentication)
*/

// export async function getProducts() {
//   const res = await fetch("/api/product/");
//   let products = await res.json();
//   if (!res.ok) {
//     throw Error(products.error);
//   }
//   return products; //res.json()
// }
export async function getProducts(query) {
  const res = await fetch("/api/product/");
  let products = await res.json();
  if (!res.ok) {
    throw Error(products.error);
  }
  if (query) {
    products = products.filter(
      e => e.name && e.name.toLowerCase().indexOf(query) !== -1
    );
  }
  return products; //res.json()
}

export async function getProduct(id) {
  const res = await fetch(`/api/product/${id}`);

  let product = await res.json();
  if (!res.ok) {
    throw Error(product.error);
  }
  return product; //res.json()
}

export async function createProduct(newProduct) {
  if (!newProduct) {
    throw new Error("Error in inserting new product " + newProduct);
  }
  if (!newProduct.id) {
    let id = genId();
    newProduct = { id, ...newProduct };
  }
  // add new product to the express server
  try {
    let response = await fetch("/api/product", {
      method: "POST",
      body: JSON.stringify(newProduct),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    }).then((res) => {
      if (!res.ok) {
        throw Error({ error: `Could not add new product ${newProduct.name}` });
      }
      return res.json();
    });
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
}

export const genId = () => Math.random().toString(36).substring(2, 9);
