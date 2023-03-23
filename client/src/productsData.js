import localforage from "localforage";

let initData = [
  {
    category: "Sporting Goods",
    id: "1234",
    name: "Football",
    price: 49.99,
    stocked: true,
  },
  {
    category: "Sporting Goods",
    id: "3444",
    name: "Baseball",
    price: 9.99,
    stocked: true,
  },
  {
    category: "Sporting Goods",
    id: "1344",
    name: "Basketball",
    price: 29.99,
    stocked: false,
  },
  {
    category: "Electronics",
    id: "3422",
    name: "iPod Touch",
    price: 99.99,
    stocked: true,
  },
  {
    category: "Electronics",
    id: "2567",
    name: "iPhone 5",
    price: 399.99,
    stocked: false,
  },
  {
    category: "Electronics",
    id: "3214",
    name: "Nexus 7",
    price: 199.99,
    stocked: true,
  },
  {
    category: "Kitchenware",
    id: "1414",
    name: "Pot",
    price: 9.99,
    stocked: true,
  },
  {
    category: "Kitchenware",
    id: "1456",
    name: "Pan",
    price: 6.99,
    stocked: true,
  },

];
const lorem = `Lorem Ipsum is simply dummy text of the printing and typesetting
industry. Lorem Ipsum has been the industry's standard dummy text
ever since the 1500s, when an unknown printer took a galley of type
and scrambled it to make a type specimen book. It has survived not
only five centuries, but also the leap into electronic typesetting,
remaining essentially unchanged. It was popularised in the 1960s
with the release of Letraset sheets containing Lorem Ipsum passages,
and more recently with desktop publishing software like Aldus
PageMaker including versions of Lorem Ipsum.
`;

initData.forEach((e) => {
  e.detail = e.name + " ***--*** " + lorem;
});

// assume query based on the category
export async function getProducts(query) {
  await fakeNetwork(`getProducts:${query}`);
  let products = await localforage.getItem("products");
  if (!products) {
    products = await genInitProducts();
  }
  if (query) {
    products = products.filter(
      e => e.name && e.name.toLowerCase().indexOf(query) !== -1
    );
  }
  return products;
}

export async function createProduct(newProduct) {
  await fakeNetwork();
  let products = await getProducts();
  if (!products) products = [];
  if (
    !newProduct ||
    (newProduct.id && products.findIndex((e) => e.id === newProduct.id) !== -1)
  ) {
    throw new Error("Error in inserting new product " + newProduct);
  }
  if (!newProduct.id) {
    let id = genId();
    newProduct = { id, ...newProduct };
  }
  products.unshift(newProduct);
  await set(products);
  return newProduct;
}

export const genId = () => Math.random().toString(36).substring(2, 9);

export async function getProduct(id) {
  await fakeNetwork(`product:${id}`);
  let products = await localforage.getItem("products");
  let product = products.find((product) => product.id === id);
  return product ?? null;
}

export async function updateProduct(id, updates) {
  await fakeNetwork();
  console.log(id);
  let products = await localforage.getItem("products");
  let product = products.find((product) => product.id === id);
  if (!product) throw new Error("No product found for", id);
  Object.assign(product, updates); // Object assign update and merge new data to old one
  await set(products);
  return product;
}

export async function deleteProduct(id) {
  let products = await localforage.getItem("products");
  let index = products.findIndex((product) => product.id === id);
  if (index > -1) {
    products.splice(index, 1);
    await set(products);
    return true;
  }
  return false;
}

async function genInitProducts() {
    await set(initData);
    return initData;
}

function set(products) {
  return localforage.setItem("products", products);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
}
