import { Router } from "express";
import cartDao from "../dao/mongoDao/cart.dao.js";

const router = Router();

router.post("/", async (req, res) => {

    try{
      const cart = await cartDao.create();

        res.status(201).json({ status: "success", payload: cart });
      }catch (error){
      console.log(error);
      res.status(500).json({ status: "Error", msg: "Error interno del servidor"});
    }
});

router.post("/:cid/product/:pid", async (req, res) => {

    try{
       const {cid, pid} = req.params;
        const cart = await cartDao.addProductToCart(cid, pid);
  
        if(cart.product == false) return res.status(404).json({status: "Error", msg: `No se encontro el producto con el id ${pid}`});
        if(cart.cart == false) return res.status(404).json({status: "Error", msg: `No se encontro el producto con el id ${cid}`});

        res.status(200).json( { status: "success", payload: cart });

      }catch (error){
      console.log(error);
      res.status(500).json({ status: "Error", msg: "Error interno del servidor"});
    }
});

router.delete("/:cid/product/:pid", async (req, res) => {
  try{
     const {cid, pid} = req.params;
    const cart = await cartDao.deleteProductInCart(cid, pid);
    res.status(200).json( { status: "success", payload: cart });

    }catch (error){
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Error interno del servidor"});
  }
});

router.get("/cid", async (req, res) => {

    try{
       const {cid} = req.params;
        const cart = await cartDao.getCartById(cid);
        if(!cart) return res.status(404).json({ status: "Error", msg: `No se encontro el carrito con el id ${pid}` });

       res.status(200).json({ status: "success", payload: cart });
       }catch (error){
       console.log(error);
       res.status(500).json({ status: "Error", msg: "Error interno del servidor"});
    }
});


export default router;