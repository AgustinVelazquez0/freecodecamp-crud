// Cargar variables de entorno desde el archivo .env
require("dotenv").config();

// Importar mongoose
const mongoose = require("mongoose");

// Check if MONGO_URI is defined
if (!process.env.MONGO_URI) {
  console.error("Please set MONGO_URI environment variable");
  process.exit(1);
}

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Definir el esquema para "Person"
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String], // ✅ campo correcto
});

// Crear un modelo para "Person"
const Person = mongoose.model("Person", personSchema);

// Aquí comienza tu código original sin modificaciones:

let PersonModel = Person;

const createAndSavePerson = (done) => {
  const person = new Person({
    name: "Juan",
    age: 30,
    favoriteFoods: ["Pizza"], // ✅ campo corregido: favoritoFoods es un array
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
  Person.findOne({ favoriteFoods: food }, (err, data) => {
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

    person.favoriteFoods.push(foodToAdd); // ✅ usamos .push() al array
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
    },
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

  Person.find({ favoriteFoods: foodToSearch })
    .sort("name")
    .limit(2)
    .select("-age")
    .exec(function(err, data) {
      if (err) return done(err);
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
