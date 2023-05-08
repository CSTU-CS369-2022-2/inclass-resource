// file: controller/OrdersController.js
import Product from "../model/ProductDB.js";
import Orders from "../model/OrdersDB.js";

async function aggregateProduct(products) {
  let group = {}; // group similar items
  let aggProd = []; // temporary array to hold the objects
  products.forEach((e) => {
    let key = e.id;
    if (group.hasOwnProperty(key)) {
      // if group is already created, add count
      group[key].count += e.qty;
    } else {
      // else create a group
      group[key] = { count: e.qty };
    }
  });

  // make array of id to find the _id of products
  let arrIDs = Object.keys(group);
  // the find returns only the founded ids. Not found won't in the result
  const groupProducts = await Product.find(
    { id: { $in: arrIDs } },
    { id: true, _id: true, price: true }
  );

  // this aggregate ignore any product that could not be found
  if (groupProducts) {
    let total = 0;
    groupProducts.forEach((e) => {
      let subtotal = group[e.id].count * e.price
      aggProd.push({
        productRef: e._id,
        unitPrice: e.price,
        qty: group[e.id].count,
        subtotal: subtotal,
      });
      total += subtotal;
    });
    console.log("-----", aggProd);
    return {products:aggProd, total}
  } else return {};
}

// Create and Save a new order
export let create = async (req, res) => {
  var cart = req.body;
  var { name } = cart;
  var orderProducts = cart.checkoutProducts;
  var {products, total} = await aggregateProduct(orderProducts);
  const now = Date.now();

  try {
    if (products && products?.length > 0) {
      let anOrder = new Orders({
        orderNo: now.toString(),
        //    orderedDate: new Date(now).toLocaleString(),
        orderedBy: {
          name: name,
        },
        orderedItems: products,
        total: total
      });
      const result = await anOrder.save();
      console.log("save ", result);
      if (result) {
        const addedOrder = await Orders.find({ _id: result._id })
          .populate({ path: "orderedItems.productRef", select: "name" })
          .exec();

        if (addedOrder) {
          console.log(JSON.stringify(addedOrder, null, "\t"));
          res.json(addedOrder);
        }
      } else {
        return res.status(400).send({
          errors: "Cannot process the order",
        });
      }
    }
  } catch (err) {
    return res.status(400).send({
      errors: "Cannot process the order" + err.name,
    });
  }
};

// Find a single Product with an _id
export let get = (req, res) => {
  const id = req.params.orderId;
  Orders.findById(id)
    .populate("orderedItems.productRef")
    .exec()
    .then((orders) => {
      if (!orders) {
        return res.status(404).send({
          errors: "Orders not found with id " + req.params.orderId 
        });
      }
      res.json(orders);
    });
};

export let list = (req, res) => {
  Orders.find({}) // search without condition
    .populate("orderedItems.productRef")
    .exec()
    .then((orders) => {
      if (orders) res.json(orders);
      else {
        res.status(500).send({
          errors: "Some error occurred while retrieving Products.",
        });
      }
    });
};
