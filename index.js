const express = require('express');
const app = express();

const logger = (rea, res, next) => {
    console.log("Nueva peticion HTTP");
    next();
}

app.set("view engine", "pug");
app.set("views", "views");
app.use("/static",express.static("public"));
//Usando el middleware
app.use(logger);

app.get('/', (req, res) =>{
    const name = req.query.name;
    const age = req.query.age;
    //res.send(`<h1>Hola soy ${name} y tengo ${age} años</h1>`);
    const notes = [
        "Nota 1",
        "Nota 2",
        "Nota 3",
        "Nota 4",
    ]
    res.render("index", { name, age, notes});
});
app.get('/users/:name', (req, res) =>{
    const name = req.params.name;
    res.send(`<h1>Hola ${name}</h1>`);
});
app.post("/users", (req, res) =>{
    res.status(404);
    res.set("Content-Type", "text/plain");
    res.send(`<h1>No se ha encontrado la página</h1>`);
   
});

//Manejando los errores
app.use((err,req, res, next) => {
    console.log(err.stack);
    res.status(500).send("Algo salió mal");
});


app.listen(3000, () => console.log("Listening on port 3000"));