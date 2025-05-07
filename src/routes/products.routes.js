import { Router } from "express";
import { createNewProduct, getProducts, deleteProduct } from "../controllers/products.controller";


const  router=Router();

router.get('/products', getProducts);

router.post('/products', createNewProduct);

router.get('/products', getProducts);

router.delete('/products', deleteProduct);

//router.put('/products', getProducts);

export default router;