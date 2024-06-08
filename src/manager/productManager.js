import fs from "fs";

//creamos el constructor con el array vacio.
let products = [];
let pathFile = "./src/products.json";

//creamos metodo addProducts para agregar productos al arreglo inicial
const addProduct = async (product) => {
    const { title, description, price, thumbail, code, stock } = product;
    await getProducts();
const newProduct = {
    id: products.length + 1,
    title,
    description,
    price, 
    thumbail,
    code,
    stock,
    status: true
};

if(Object.values(newProduct).includes(undefined)) {
   console.log("Todos los campos son obligatorios");
   return;
}

//validamos que no se repita el campo code
const productExists = products.find((product) => product.code == code);
if (productExists) {
    console.log('El producto con el codigo ${code} ya existe');
    return;
}

products.push(newProduct);

await fs.promises.writeFile(pathFile, JSON.stringify(products));
};

const getProducts = async (limit) => {
    const productsJson = await fs.promises.readFile(pathFile, "utf8");
    products = JSON.parse(productsJson) || [];

    if(!limit) return products;

    return products.slice(0, limit);
};

//Filtrar un producto por el ID
const getProductById = async (id) => {
    await getProducts();
     const product = products.find ((product) => product.id == id);
    if (!product) {
        console.log ("No se encontro el producto con el id ${id}");
        return;
    }

    console.log(product);
    return product;
};

//Actualizar un producto
const updateProduct = async (id, dataProduct) => {
    await getProducts();
    const index = products.findIndex((product) => product.id == id);
    products[index] = {
        ...products[index],
        ...dataProduct
    };

    await fs.promises.writeFile(pathFile, JSON.stringify(products));
};

//Borrar un producto
const deleteProduct = async (id) => {
    await getProducts();
    products = products.filter (product => product.id !== id );
    await fs.promises.writeFile(pathFile, JSON.stringify(products));
};

export default {
    addProduct,
    getProductById,
    getProducts,
    updateProduct,
    deleteProduct
};