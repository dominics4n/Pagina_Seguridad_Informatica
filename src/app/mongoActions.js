"use server";

const { MongoClient } = require("mongodb");

//String de conexion, nombre de base de datos y coleccion
const uri =
    "mongodb+srv://dominics4n:AlvvaysVVaiting@alvvays.jr2y0ln.mongodb.net/?retryWrites=true&w=majority&appName=Alvvays";
const dbName = "WhenLightningStrikes";
const collectionName = "users";

export async function NewUser(formdata) {
    console.log("hola soy newuser");
    console.log("probablemente el culpable");
    const client = new MongoClient(uri);
    console.log("voy a conectar");
    await client.connect();
    console.log("conecte idk registro database");
    const database = client.db(dbName);
    console.log("registro coleccion");
    const collection = database.collection(collectionName);
    try {
        //inserta los datos a la DB
        console.log("voy a insertar en la base de datos");
        const insertManyResult = await collection.insertOne(formdata);
    } catch (err) {
        console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
    }
    console.log("cierro conexion");
    await client.close();
}

export async function CheckUser(formdata) {
    console.log("soy checkuser");
    console.log("gran sospechoso");
    const client = new MongoClient(uri);
    console.log("voy a conectar con db");
    await client.connect();
    console.log("conecte dame nombre de db");
    const database = client.db(dbName);
    console.log("bonita tu coleccion");
    const collection = database.collection(collectionName);
    const findOneQuery = { Username: formdata };
    try {
      //Busca al nombre de usuario en la DB
      console.log("voy a buscar cosas");
      const findOneResult = await collection.findOne(findOneQuery);
      console.log("termine de buscar cosas");
      if (findOneResult === null) {
        // El usuario no existe (resultado deseado durante registro)
        return (false)
      } 
      else {
        // El usuario existe (resultado deseado durante inicio de sesion) 
        return (findOneResult)
      }
    } catch (err) {
      console.error(`Something went wrong trying to find one document: ${err}\n`);
    }
    console.log("cierro conexion");
    await client.close();
}