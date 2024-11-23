import Router from 'express';
import CartManager from '../managers/cartManager.js';
import ProductManager from '../managers/productManager.js';

const cartManager = new CartManager();
const productManager = new ProductManager();
const router = Router();

router.use((req, res, next) => {
    console.log('My cart endpoint');

    next();
});

router.post('/', async (req, res) => {
    try {
        const cart = await cartManager.createCart();

        res.send(cart);
    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
});

router.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await cartManager.getCartById(cid);

        res.send(cart);
    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const product = await productManager.getProductById(pid);
        if (!product)
            throw new Error(`The product with the id ${pid} cannot be found`);

        const cart = await cartManager.addProductToCart(cid, pid);

        res.send(cart);
    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
});

export default router;
