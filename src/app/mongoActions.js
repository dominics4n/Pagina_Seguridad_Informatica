"use server";

const { MongoClient } = require("mongodb");

const uri =
    "mongodb+srv://dominics4n:AlvvaysVVaiting@alvvays.jr2y0ln.mongodb.net/?retryWrites=true&w=majority&appName=Alvvays";
const dbName = "WhenLightningStrikes";
const collectionName = "users";

export async function NewUser(formdata) {

    let gt = formdata.Username;
    console.log(gt);
    let pass = formdata.Password;
    console.log(pass);

    const client = new MongoClient(uri);
    await client.connect();
  // Provide the name of the database and collection you want to use.
  // If the database and/or collection do not exist, the driver and Atlas
  // will create them automatically when you first write data.


  // Create references to the database and collection in order to run
  // operations on them.


    const database = client.db(dbName);
    const collection = database.collection(collectionName);


    /*
    * *** FIND DOCUMENTS ***
    *
    * Now that we have data in Atlas, we can read it. To retrieve all of
    * the data in a collection, we call Find() with an empty filter.
    * The Builders class is very helpful when building complex
    * filters, and is used here to show its most basic use.
    */

    // We can also find a single document. Let's find the first document
    // that has the string "potato" in the ingredients list.


    try {
        const insertManyResult = await collection.insertOne(formdata);
        console.log(`Documents successfully inserted.\n`);
    } catch (err) {
        console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
    }

    
    // Make sure to call close() on your client to perform cleanup operations
    await client.close();
}

export async function CheckUser(formdata) {

    console.log("hola soy formdata " + formdata);

    //Reemplazar por tu propia linea de conexion

    const client = new MongoClient(uri);

    await client.connect();

    // Provide the name of the database and collection you want to use.
    // If the database and/or collection do not exist, the driver and Atlas
    // will create them automatically when you first write data.


    // Create references to the database and collection in order to run
    // operations on them.

    
    const database = client.db(dbName);
    const collection = database.collection(collectionName);


  /*
   * *** FIND DOCUMENTS ***
   *
   * Now that we have data in Atlas, we can read it. To retrieve all of
   * the data in a collection, we call Find() with an empty filter.
   * The Builders class is very helpful when building complex
   * filters, and is used here to show its most basic use.
   */

  // We can also find a single document. Let's find the first document
  // that has the string "potato" in the ingredients list.
  const findOneQuery = { Username: formdata };

  try {
    const findOneResult = await collection.findOne(findOneQuery);
    if (findOneResult === null) {
      console.log("El usuario no existe.\n");
      return (false)
    } 
    else {

      console.log(`Se encontro un usuario con esas credenciales:\n${JSON.stringify(findOneResult)}\n`);
      //Regresa unicamente el hash de la DB
      return (findOneResult)
    }
  } catch (err) {
    console.error(`Something went wrong trying to find one document: ${err}\n`);
  }

  
  // Make sure to call close() on your client to perform cleanup operations
  await client.close();
}