import { MongoClient } from 'mongodb';

async function updateOneExample() {
    const url = 'mongodb://localhost:27017';
  //const url = 'mongodb+srv://adibattista:pasa2024@tup.3qnmgei.mongodb.net/?retryWrites=true&w=majority&appName=tup';

    const client = new MongoClient(url);

    try {
        await client.connect();
        console.log('Conectado a MongoDB');

        const db = client.db('tup');
        const collection = db.collection('contactos');

        const filter = { nombre: 'Juan' };
        const update = { $inc: { edad: 2 } };

        const result = await collection.updateMany(filter, update);

        console.log(`${result.matchedCount} documento(s) encontrado(s)`);
        console.log(`${result.modifiedCount} documento(s) actualizado(s)`);
    
    } catch (error) {
        console.error(error);
        
    } finally {
        await client.close();
    }
}

contactos.deleteOne({ nombre: 'Juan' });
updateOneExample();


//SELECT nombre, apellido, edad FROM contactos      # project({ nombre: 1, apellido: 1, edad: 1 })
//  WHERE edad = 30                                 # find({ edad: 30 })         
//  ORDER BY apellido DESC, nombre DESC             # sort({ apellido: -1, nombre: -1 })
//  LIMIT 5 OFFSET 10                               # skip(10).limit(5)   

contactos.find({ edad: 30 })
    .sort({ apellido: -1, nombre: -1 })
    .skip(10)
    .limit(5)
    .project({ nombre: 1, apellido: 1, edad: 1 })
    .toArray()

contactos.aggregate([
    { $match: { edad: 30 } },
    { $sort: { apellido: -1, nombre: -1 } },
    { $skip: 10 },
    { $limit: 5 },
    { $project: { nombre: 1, apellido: 1, edad: 1 } }
])

// Cuenta los contactos
db.collection('contactos').aggregate([
  { $count: "total" }
])

// Me dice cuantos contactos hay con cada edad
db.collection('contactos').aggregate([
  { $group: { _id: "$edad", count: { $sum: 1 } } }
])

// Me dice cuantos contactos hay con cada edad, ordenado por edaddb.collection('contactos').aggregate([
db.collection('contactos').aggregate([
  { $match: { edad: 30 } },
  { $sort: { apellido: -1 } },
  { $project: { nombre: 1, apellido: 1, edad: 1 } }
])

// Me dice cuanto es el saldo de los movimientos de enero de 2022
let fechaDada = new Date("2022-01-15");

db.movimientos.aggregate([
  { $project: { 
      year: { $year: "$fecha" }, 
      month: { $month: "$fecha" }, 
      monto: 1 
  }},
  { $match: { 
      year: fechaDada.getFullYear(), 
      month: fechaDada.getMonth() + 1 
  }},
  { $group: { _id: null, saldo: { $sum: "$monto" } } }
])