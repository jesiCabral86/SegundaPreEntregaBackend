import { Router } from "express";
import productManager from "../manager/productManager.js";

const router = Router();

router.get("/", async (req, res) =>{

    try{
    const { limit, page, sort, category, status } = req.query;
    const options = {
        limit: limit || 10,
        page: page || 1,
        sort: {
            price: sort === "asc" ? 1 : -1,
        },
        lean: true
    };

    if(status){
        const products = await productDao.getAll({status: status}, options);
        return res.status(200).json({products});
    }

    if(category){
        const products = await productDao.getAll({ category: category }, options );
        return res.status(200).json({products});  
    }

    const products = await productDao.getAll({}, options);

    res.status(200).json({ status: "success", products });
    } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Error interno del servidor"});
    }
});

//para configurar solicitudes/peticiones
router.get("/:pid", async (req, res) => {
    try{
        const { pid } = req.params;

        const product = await productManager.getProductById(parseInt(pid));

        res.status(200).json({ status: "success", payload: product });
    }catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Error interno del servidor"});
    }
});

router.post("/", async (req, res) =>{

    try{
    const product = req.body;
    const newProduct = await productManager.addProduct(product);

    res.status(201).json({ status: "success", payload: newProduct });
    } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Error interno del servidor"});
    }
});

router.put("/:pid", async (req, res) =>{

    try{
    const { pid } = req.params;
    const product = req.body;

    const updateProduct = await productManager.updateProduct(pid, product);

    res.status(200).json({ status: "success", payload: updateProduct });
    } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Error interno del servidor"});
    }
});

router.delete("/:pid", async (req, res) =>{

    try{
    const { pid } = req.params;

    await productManager.deleteProduct(pid);

    res.status(201).json({ status: "success", message: "Producto Eliminado"});
    } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Error interno del servidor"});
    }
});

export default router;