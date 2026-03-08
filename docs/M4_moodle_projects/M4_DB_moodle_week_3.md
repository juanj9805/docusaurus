<div>
  <img src="https://pliops.com/wp-content/uploads/2022/03/case-study-opt-1-scaled.jpeg" alt=""/>
</div>

```
require("dotenv").config();
const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URL);
let db;

async function main() {
  try {
    await client.connect();
    db = client.db("riwi");

    // All database operations go here (inside this function)

    // Clear collections before inserting fresh data
    await db.collection("usuarios").deleteMany({});
    await db.collection("contenido").deleteMany({});
    await db.collection("valoraciones").deleteMany({});

    // TASK 1 & 2: INSERT DATA

    await db.collection("usuarios").insertMany([
      { nombre: "Juan", email: "juan@email.com", suscripcion: "premium" },
      { nombre: "María", email: "maria@email.com", suscripcion: "basic" },
      { nombre: "Carlos", email: "carlos@email.com", suscripcion: "premium" },
      { nombre: "Sofía", email: "sofia@email.com", suscripcion: "basic" },
    ]);

    await db.collection("contenido").insertMany([
      {
        titulo: "Interestelar",
        tipo: "película",
        generos: ["Ciencia Ficción"],
        duracionMin: 169,
        año: 2014,
        calificacion: 8.6,
      },
      {
        titulo: "Breaking Bad",
        tipo: "serie",
        generos: ["Drama"],
        duracionMin: 47,
        año: 2008,
        calificacion: 9.5,
      },
      {
        titulo: "The Matrix",
        tipo: "película",
        generos: ["Acción"],
        duracionMin: 136,
        año: 1999,
        calificacion: 8.7,
      },
      {
        titulo: "The Crown",
        tipo: "serie",
        generos: ["Drama"],
        duracionMin: 55,
        año: 2016,
        calificacion: 8.3,
      },
      {
        titulo: "Inception",
        tipo: "película",
        generos: ["Acción"],
        duracionMin: 148,
        año: 2010,
        calificacion: 8.8,
      },
      {
        titulo: "Stranger Things",
        tipo: "serie",
        generos: ["Ciencia Ficción"],
        duracionMin: 50,
        año: 2016,
        calificacion: 8.2,
      },
    ]);

    await db.collection("valoraciones").insertMany([
      { usuario: "Juan", contenido: "Interestelar", puntuacion: 9 },
      { usuario: "Juan", contenido: "Breaking Bad", puntuacion: 10 },
      { usuario: "María", contenido: "The Matrix", puntuacion: 8 },
      { usuario: "Carlos", contenido: "Inception", puntuacion: 9 },
      { usuario: "Sofía", contenido: "Stranger Things", puntuacion: 7 },
      { usuario: "María", contenido: "Interestelar", puntuacion: 2 },
    ]);

    // TASK 3: FIND - CONSULTAS

    // $gt - mayor que
    await db
      .collection("contenido")
      .find({ duracionMin: { $gt: 120 } })
      .toArray();

    // $lt - menor que
    await db
      .collection("valoraciones")
      .find({ puntuacion: { $lt: 3 } })
      .toArray();

    // $eq - igual
    await db.collection("usuarios").find({ suscripcion: "premium" }).toArray();

    // $in - en lista
    await db
      .collection("contenido")
      .find({ generos: { $in: ["Acción", "Drama"] } })
      .toArray();

    // $and - Y lógico
    await db
      .collection("contenido")
      .find({
        $and: [
          { tipo: "serie" },
          { calificacion: { $gt: 8 } },
          { año: { $gte: 2015 } },
        ],
      })
      .toArray();

    // $or - O lógico
    await db
      .collection("contenido")
      .find({
        $or: [{ generos: "Acción" }, { generos: "Ciencia Ficción" }],
      })
      .toArray();

    // $regex - buscar texto
    await db
      .collection("contenido")
      .find({ titulo: { $regex: "The" } })
      .toArray();

    // TASK 4: UPDATE & DELETE

    // updateOne
    await db
      .collection("contenido")
      .updateOne({ titulo: "Breaking Bad" }, { $set: { calificacion: 9.6 } });

    // updateMany
    await db
      .collection("usuarios")
      .updateMany(
        { suscripcion: "basic" },
        { $set: { suscripcion: "premium" } },
      );

    // deleteOne
    await db
      .collection("valoraciones")
      .deleteOne({ usuario: "María", contenido: "Interestelar" });

    // deleteMany
    await db.collection("valoraciones").deleteMany({ puntuacion: { $lt: 5 } });

    // TASK 5: ÍNDICES

    await db.collection("contenido").createIndex({ titulo: 1 });
    await db.collection("contenido").createIndex({ generos: 1 });
    await db.collection("usuarios").createIndex({ email: 1 }, { unique: true });
    await db.collection("valoraciones").createIndex({ usuario: 1 });

    await db.collection("contenido").listIndexes().toArray();
    await db.collection("usuarios").listIndexes().toArray();
    await db.collection("valoraciones").listIndexes().toArray();

    // AGREGACIONES

    // Agregación 1: Calificación promedio por tipo
    await db
      .collection("contenido")
      .aggregate([
        {
          $group: {
            _id: "$tipo",
            promedio: { $avg: "$calificacion" },
            total: { $sum: 1 },
          },
        },
        { $sort: { promedio: -1 } },
      ])
      .toArray();

    // Agregación 2: Valoraciones por usuario
    await db
      .collection("valoraciones")
      .aggregate([
        {
          $group: {
            _id: "$usuario",
            total: { $sum: 1 },
            promedio: { $avg: "$puntuacion" },
          },
        },
        { $sort: { total: -1 } },
      ])
      .toArray();
  } catch (error) {
  } finally {
    await client.close();
    process.exit(0);
  }
}

main();

```
