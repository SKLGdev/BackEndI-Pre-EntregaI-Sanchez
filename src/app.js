import express from "express";
import productsRoutes from './routers/products.routes.js'
import cartRoutes from './routers/cart.routes.js'

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productsRoutes);
app.use('/api/cart', cartRoutes);

app.listen(PORT, () => {
    console.log(`Server on PORT: ${PORT}`);
});
