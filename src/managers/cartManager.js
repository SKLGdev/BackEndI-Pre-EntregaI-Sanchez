import fs from 'fs';
import { v4 as uuid } from 'uuid';

class CartManager {
    constructor() {
        this.carts = [];
        this.path = './src/managers/data/carts.json';
    }

    async getCarts() {
        const file = await fs.promises.readFile(this.path, 'utf-8');
        const fileParse = JSON.parse(file);

        this.carts = fileParse || [];

        return this.carts;
    }

    async createCart() {
        await this.getCarts();

        const newCart = {
            id: uuid(),
            products: [],
        };

        this.carts.push(newCart);

        await fs.promises.writeFile(this.path, JSON.stringify(this.carts));

        return newCart;
    }

    async getCartById(cid) {
        await this.getCarts();

        const cart = this.carts.find((cart) => cart.id === cid);

        if (!cart) throw new Error('Cart not found');

        return cart;
    }

    async addProductToCart(cid, pid) {
        const cart = await this.getCartById(cid);

        const product = cart.products.find((product) => product.id === pid);
        if (!product) {
            cart.products.push({ id: pid, quantity: 1 });
        } else {
            product.quantity++;
        }

        await fs.promises.writeFile(this.path, JSON.stringify(this.carts));

        return cart;
    }
}

export default CartManager;