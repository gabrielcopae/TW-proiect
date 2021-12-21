const express = require('express');
const app = express();
const port = 3000;
const Proiect = require('./Proiect');

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/', (req,res)=>{
    res.send('Incercare');
})

app.listen(port, ()=>{
    console.log('Running on port' + port);
})

let proiecte = [new Proiect(1,"Integrare Date","IT","ABC"),
                new Proiect(2,"Vanzari imputabile","Contabilitate","Spider"),                                                          
                new Proiect(3,"Motor electric","Mecanica","SCL")];

app.get('/Proiect',(req, res)=>{
    let filteredProiecte = [];
    if (req.query.domeniu) {
        filteredProiecte = proiecte.filter(x => x.domeniu == req.query.domeniu);
    } else {
         filteredProiecte = proiecte;
    }
    res.json(filteredProiecte);
})

app.post('/addProiecte',(req,res)=>{
    let newProiect = new Proiect( req.body.id,
                                  req.body.nume,
                                  req.body.domeniu,
                                  req.body.echipa);
                                  
    proiecte.push(newProiect);
    console.log(proiecte);
    return res.json(newProiect);                          
})    