const mongoose = require("mongoose");

//conexion
mongoose.connect("mongodb://localhost:27017/curso-nodejs", { userNewUrlParser: true });

//definimos el esquema
const schema = mongoose.Schema({
    title: String,
    body: String,
    published: { type: Boolean, default: false }
});


//Atributos virtuales que se componen de varios atributos del esquema (fullName con firstName y secondName). Hay que tener los métodos get y set.
personSchema.virtual("fullName")
    .get(function(){ return this.name.first + " " + this.name.last })
    //Aquí le pasas el nombre completo y lo parte en firstName y secondName
    .set(function(v){
        this.name.first = v.substr(0, v.indexOf(" "));
        this.name.last = v.substr(v.indexOf(" ") + 1);
    });

//definimos el modelo
const Article = mongoose.model({"Article": schema});

//Sombre el schema pondemos definir métodos, como este que cuenta palabras
schema.methods.wordCount = function (){
    return this.body.split(" ").length;
}
//Métodos estáticos en los esquemas
schema.statics.findByTitle = function(name, cb){
    return this.find({ title: new RegExp(name, 'i')}, cb);
}

//Borramos 
Article.deleteOne({ title: "Articulo 1"}, function(err){
    if(err) console.log(err);
})