let data = [
    {category: 'Sporting Goods', price: 49.99, stocked: true, name: 'Football', id:'1234'},
    {category: 'Sporting Goods', price: 9.99, stocked: true, name: 'Baseball', id:'3444'},
    {category: 'Sporting Goods', price: 29.99, stocked: false, name: 'Basketball', id:'1344'},
    {category: 'Electronics', price: 99.99, stocked: true, name: 'iPod Touch', id:'3422'},
    {category: 'Electronics', price: 399.99, stocked: false, name: 'iPhone 5', id:'2567'},
    {category: 'Electronics', price: 199.99, stocked: true, name: 'Nexus 7', id:'3214'},
    {category: 'Kitchenware', price: 9.99, stocked: true, name: 'Pot', id:'1414'},
];
    
let Products = {
    find: () => new Promise((resolve, reject) => resolve(data) )
    ,
    findOne: (id) => {
        return new Promise((resolve, reject) => {
            let index = data.findIndex(e => e.id === id)
            if (index <0) reject("Not found" +id);            
            resolve(data[index])
        }
    )},
    findAndUpdate: (id, product, newItem=true) => {
        return new Promise((resolve, reject) => {
            let index = data.findIndex(e=> e.id === id);
            if (index < 0)
                if (!newItem) reject("Not found" +id);
                else {
                    data.push(product)
                    resolve(data[data.length-1]);
                }
            else data.splice(index, 1, product)
            resolve(data[index])
        }
    )},
    insert: (product) => {
        return new Promise((resolve, reject) => {
            data.push(product);
            resolve(data[data.length-1]);
        }
    )},
    delete: (id) => {
        return new Promise((resolve, reject) => {
            let index = data.findIndex(e => e.id === id)
            if (index <0) return reject("Not found" + id);
            data.splice(index, 1)
            resolve(1)         
        }
    )}
}
export default Products;
