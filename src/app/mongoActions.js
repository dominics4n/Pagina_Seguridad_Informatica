"use server";

const { MongoClient } = require("mongodb");

//String de conexion, nombre de base de datos y coleccion
const uri =
    "mongodb+srv://dominics4n:AlvvaysVVaiting@alvvays.jr2y0ln.mongodb.net/?retryWrites=true&w=majority&appName=Alvvays";
const dbName = "WhenLightningStrikes";
const collectionName = "users";

export async function NewUser(formdata) {

    const client = new MongoClient(uri);
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    try {
        //inserta los datos a la DB
        const insertManyResult = await collection.insertOne(formdata);
    } catch (err) {
        console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
    }
    await client.close();
}

export async function CheckUser(formdata) {

    const client = new MongoClient(uri);
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    const findOneQuery = { Username: formdata };
    try {
      //Busca al nombre de usuario en la DB
      const findOneResult = await collection.findOne(findOneQuery);
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
  await client.close();
}