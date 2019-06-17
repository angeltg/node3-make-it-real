const express = require('express');
const cookieSession = require('cookie-session');
const app = express();



app.set("view engine", "pug");
app.set("views", "views");
app.use(cookieSession({
    secret: "una_cadena_secreta",
    maxAge: 24 * 60 * 60 *100
}));
app.use(express.urlencoded({ extended: true })); // Para acceder al body del formulario
app.use("/static",express.static("public"));
//Usando el middleware
//app.use(logger);

//mostramos las notas
app.get('/', (req, res) =>{
    //Leemos las notas de la session
    const notes = req.session.notes || [];
    res.render("index", { notes, views: req.session.views });
});

// muestra el formulario para crear una nota
app.get('/notes/new', (req, res) => {
    res.render("new-note");
});

// Permite crear una nota. Se llama desde el formulario
app.post('/notes', (req,res) => {
    //const body = req.body;
    //console.log(body);
    //Agramos las notas a la session
    req.session.id = (req.session.id || 0) + 1;
    const id = req.session.id;
    req.session.notes = req.session.note || [];
    req.session.notes.push( { title: req.body.title, body: req.body.body, id: id});
    res.redirect("/");
})
app.get('/users/:name', (req, res) =>{
    const name = req.params.name;
    res.send(`<h1>Hola ${name}</h1>`);
});
app.post("/users", (req, res) =>{
    res.status(404);
    res.set("Content-Type", "text/plain");
    res.send(`<h1>No se ha encontrado la página</h1>`);
   
});

app.get('/leer-cookies', (req, res) =>{
    const name = req.query.name;
    const age = req.query.age;
    //Leemos la cookie con cookie-parser
    //console.log(`User name: ${req.cookies.username}`);
    req.session.views = (req.session.views || 0) + 1;
    //escribimos una cookie
    res.cookie("username", "Pedro");
    //res.send(`<h1>Hola soy ${name} y tengo ${age} años</h1>`);
    const notes = ["Nota 1","Nota 2","Nota 3",req.session.views,
    ]
    res.render("index", { name, age, notes});
});

//Manejando los errores
app.use((err,req, res, next) => {
    console.log(err.stack);
    res.status(500).send("Algo salió mal");
});


app.listen(3000, () => console.log("Listening on port 3000"));