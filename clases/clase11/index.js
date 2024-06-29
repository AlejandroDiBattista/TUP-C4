import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017';
//const url = 'mongodb+srv://adibattista:pasa2024@tup.3qnmgei.mongodb.net/?retryWrites=true&w=majority&appName=tup';

// Configuración de la conexión
const client = new MongoClient(url);

try {
  // Conectarse al servidor de MongoDB
  await client.connect();
  console.log('Conectado a MongoDB');

  const db = client.db('tup-c4');
  const contactos = db.collection('contactos');
  
} catch (error) {
  // Si hay un error, lo mostramos en consola
  console.error(error);
}

const contacto = {
  _id: "18627585",
  nombre: 'Alejandro',
  apellido: 'Di Battista',
  edad: 56,
  email: 'adibattista.utn@gmail.com',
  telefonos: [
    { tipo: 'celular', numero: '1234567890' },
    { tipo: 'fijo', numero: '1234567890' }
  ]
}

let resultado = await contactos.insertOne(contacto);
console.log(resultado)
// const filter = { nombre: 'Juan' };
// const update = { $inc: { edad: 2 } };

// const result = await collection.updateMany(filter, update);

// console.log(`${result.matchedCount} documento(s) encontrado(s)`);
// console.log(`${result.modifiedCount} documento(s) actualizado(s)`);



let datos = []
for await (const doc of contactos.find()) {
  // console.log(doc);
  datos.push(doc)
}

// SELECT * FROM Contactos 
//     WHERE edad > 30 AND edad < 50
//     SORT BY apellido, nombre

datos = await contactos.find(
  {
    edad: { $gt: 30, $lt: 50 },
    nombre: "Juan"
  }).toArray();

// contactos.createSearchIndex({ nombre: 'text', apellido: 'text' });
datos = await contactos
  .find({ edad: 30 })
  .sort({ apellido: 1, nombre: 1 })
  .limit(10)
  .skip(20)
  .toArray()

contactos.deleteOne({ edad: 30 });

contactos.updateMany(
  { nombre: 'Juan' },
  { $inc: { edad: 1 } }
)

    // console.log(resultado)
  } catch (error) {
  console.error(error);
} finally {
  await client.close();
}
}

// DELETE FROM contactos WHERE nombre = 'Juan'
// contactos.deleteOne({ nombre: 'Juan' });


//SELECT nombre, apellido, edad FROM contactos      # project({ nombre: 1, apellido: 1, edad: 1 })
//  WHERE edad = 30                                 # find({ edad: 30 })
//  ORDER BY apellido DESC, nombre DESC             # sort({ apellido: -1, nombre: -1 })
//  LIMIT 5 OFFSET 10                               # skip(10).limit(5)

contactos
  .find({ edad: 30 })
  .sort({ apellido: -1, nombre: -1 })
  .skip(10)
  .limit(5)
  .project({ nombre: 1, apellido: 1, edad: 1 })
  .toArray()

// SELECT nombre, apellido, edad FROM contactos
// WHERE edad = 30
// ORDER BY apellido DESC, nombre DESC
// LIMIT 5 OFFSET 10
contactos.aggregate([
  { $match: { edad: 30 } },
  { $sort: { apellido: -1, nombre: -1 } },
  { $skip: 10 },
  { $limit: 5 },
  { $project: { nombre: 1, apellido: 1, edad: 1 } }
])

// // Cuenta los contactos
// db.collection('contactos').aggregate([
//   { $count: "total" }
// ])

// // Me dice cuantos contactos hay con cada edad
// db.collection('contactos').aggregate([
//   { $group: { _id: "$edad", count: { $sum: 1 } } }
// ])

// // Me dice cuantos contactos hay con cada edad, ordenado por edaddb.collection('contactos').aggregate([
// db.collection('contactos').aggregate([
//   { $match: { edad: 30 } },
//   { $sort: { apellido: -1 } },
//   { $project: { nombre: 1, apellido: 1, edad: 1 } }
// ])

// // Me dice cuanto es el saldo de los movimientos de enero de 2022
// let fechaDada = new Date("2022-01-15");

// db.movimientos.aggregate([
//   { $project: {
//       year: { $year: "$fecha" },
//       month: { $month: "$fecha" },
//       monto: 1
//   }},
//   { $match: {
//       year: fechaDada.getFullYear(),
//       month: fechaDada.getMonth() + 1
//   }},
//   { $group: { _id: null, saldo: { $sum: "$monto" } } }
// ])

// updateOneExample()
readAll()