// Retrieve and return all products from the const Products.
import Products from '../model/Product.js'

export const list = (req, res) => {
  Products.find().then(result =>  res.json(result));
};

// add new product 
export const create = (req, res) => {
  Products.insert(req.body).then(()=> {return res.send({success: "Create Successfully"})})
}

// Find a single product with an id
export const get = (req, res) => {
    const id = req.params.id;
    Products.findOne(id)
   .then(product => {
      if(!product) {
        return res.status(404).send({
            error: "Product not found with id " + id
        });            
      }
      res.json(product); // default status = 200
    }).catch(err => {
      return res.status(500).send({
        error: "Error retrieving Product with id " + id
      });
    });
  };;
  
// Update a product identified by the id in the request
export const put = (req, res) => {
    // Validate Request
    const data = req.body || {};
    if (!data || data.id != req.params.id) 
      return res.status(422).send({error: 'id must be alphanumeric.'});
    // Find Product and update it with the request body
    Products.findAndUpdate(req.params.id,req.body,true)
    .then(product => {
      if(!product) {
        return res.status(404).send({
               error: "Product not found with id " + req.params.id
        });
      }
      res.send(product);
    }).catch(err => {
      if(err.kind === 'ObjectId') {
        return res.status(404).send({
               error: "Product not found with id " + req.params.id
        });                
      }
      return res.status(500).send({
              error: "Error updating Product with id " + req.params.id
      });
    });
  };
export const remove = (req, res) => {
  const data = req.body || {};
  if (!data || data.id != req.params.id)
    return res.status(422).send({error: 'id must be alphanumeric.'});
  Products.delete(data.id).then(
    () => {
      return res.status(200).send({ success: true });
    }
  ).catch(() => {
    return res.status(404).send({
      error: "Product not found with id " + req.params.id
  });                
  })
}
