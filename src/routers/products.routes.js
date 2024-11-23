import Router from 'express';
import ProductManager from '../managers/productManager.js';
import checkId from '../middlewares/checkId.middleware.js';

const productManager = new ProductManager();
const router = Router();

router.get('/', async (req, res) => {
    const { limit } = req.query;

    try {
        const products = await productManager.getProducts(limit);
        res.status(200).send(products);
    } catch (error) {
        console.log(error);
        res.status(404).send(`Users were not found because: ${error.message}`);
    }
});

router.get('/:id', checkId, async (req, res) => {
    const { id } = req.params;

    try {
        const product = await productManager.getProductById(id);
        res.status(200).send(product);
    } catch (error) {
        console.log(error);
        res.status(404).send(`User not found because: ${error.message}`);
    }
});

router.post('/', async (req, res) => {
    const body = req.body;

    try {
        const product = await productManager.addProduct(body);
        res.status(201).send(product);
    } catch (error) {
        console.log(error);
        res.status(404).send(`User was not be created because: ${error.message}`);
    }
});

router.put('/:id', checkId, async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    try {
        console.log(id);
        console.log(body);
        const product = await productManager.updateProduct(id, body);

        res.status(200).send(product);
    } catch (error) {
        console.log(error);
        res.status(404).send(`User was not be updated because: ${error.message}`);
    }
});

router.delete('/:id', checkId, async (req, res) => {
    const { id } = req.params;

    try {
        const product = await productManager.deleteProduct(id);
        res.status(200).send(product);
    } catch (error) {
        console.log(error);
        res.status(404).send(`User was not be deleted because: ${error.message}`);
    }
});

export default router;
