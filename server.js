import express from 'express';
import colors from 'colors';

const app = express();

app.get('/',(req,res)=>{
res.send("<h1>Welcome to Ecommerce Full sack project</h1>")
});

const PORT = 8080;

app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`.bgCyan.white)
})