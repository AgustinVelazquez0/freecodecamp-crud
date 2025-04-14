// Cargar variables de entorno desde el archivo .env
require("dotenv").config();

// Importar mongoose
const mongoose = require("mongoose");

// Conexión a la base de datos usando la URL de la variable de entorno
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true, // Para usar el nuevo analizador de URL
    useUnifiedTopology: true, // Para usar el nuevo motor de descubrimiento y monitoreo
  })
  .then(() => {
    console.log("Conexión exitosa a la base de datos de MongoDB Atlas.");
  })
  .catch((err) => {
    console.error("Error al conectar a MongoDB: ", err);
  });

// Definir un esquema para los "Person"
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  favoriteFood: { type: String },
});

// Crear un modelo para "Person"
const Person = mongoose.model("Person", personSchema);

// Aquí comienza tu código original sin modificaciones:

let PersonModel = Person;

const createAndSavePerson = (done) => {
  const person = new Person({
    name: "Juan",
    age: 30,
    favoriteFood: "Pizza",
  });

  person.save((err, data) => {
    if (err) return done(err); // Usamos done en lugar de console.error
    done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return done(err); // Usamos done en lugar de console.error
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) return done(err); // Usamos done en lugar de console.error
    done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFood: food }, (err, data) => {
    if (err) return done(err); // Usamos done en lugar de console.error
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return done(err); // Usamos done en lugar de console.error
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if (err) return done(err); // Usamos done en lugar de console.error

    person.favoriteFood = foodToAdd;
    person.save((err, updatedPerson) => {
      if (err) return done(err); // Usamos done en lugar de console.error
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, updatedPerson) => {
      if (err) return done(err); // Usamos done en lugar de console.error
      done(null, updatedPerson);
    }
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) return done(err); // Usamos done en lugar de console.error
    done(null, data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.deleteMany({ name: nameToRemove }, (err, data) => {
    if (err) return done(err); // Usamos done en lugar de console.error
    done(null, data);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFood: foodToSearch })
    .sort({ name: 1 })
    .limit(5)
    .select("-age")
    .exec((err, data) => {
      if (err) return done(err); // Usamos done en lugar de console.error
      done(null, data);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = PersonModel;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
