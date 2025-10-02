"use server";

const { MongoClient } = require("mongodb");

//String de conexion, nombre de base de datos y coleccion


export async function NewUser(formdata) {

    const client = new MongoClient(process.env.URI);
    await client.connect();
    const database = client.db(process.env.DBNAME);
    const collection = database.collection(process.env.COLLECTIONNAME);
    try {
        //inserta los datos a la DB
        const insertManyResult = await collection.insertOne(formdata);
    } catch (err) {
        console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
    }
    await client.close();
}

export async function CheckUser(formdata) {

    const client = new MongoClient(process.env.URI);
    await client.connect();
    const database = client.db(process.env.DBNAME);
    const collection = database.collection(process.env.COLLECTIONNAME);
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