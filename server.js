import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url';

//configure env
dotenv.config()

// datbase config
connectDB();

//es module fix
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express();

const absoluteBuildPath = path.resolve(process.cwd(), 'client', 'build');
//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(absoluteBuildPath))

//rest api
app.use('*', function(req,res){
    const absoluteIndexPath = path.join(absoluteBuildPath, 'index.html');
    res.sendFile(absoluteIndexPath);
})

//routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/product', productRoutes)
app.get('/',(req,res)=>{
res.send("<h1>Welcome to Ecommerce Full sack project</h1>")
});

const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(
        `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white
        );
})