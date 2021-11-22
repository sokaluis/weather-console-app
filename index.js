require("colors");
require("dotenv").config();
const {
  inquirerMenu,
  pauseMenu,
  readInput,
  listPlaces,
} = require("./helpers/inquirer");
const Searches = require("./models/Searches");

const main = async () => {
  let opt;
  const searches = new Searches();

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        // show message
        const searchTerm = await readInput("City:");
        // search places
        const places = await searches.cities(searchTerm);
        const idSelected = await listPlaces(places);
        // select place
        const selectedPlace = places.find(({ id }) => id === idSelected);
        // weather data

        // show result

        console.log("\n Información de la ciudad".green);
        console.log("City:", selectedPlace.name);
        console.log("Lat:", selectedPlace.lat);
        console.log("Lng:", selectedPlace.lng);
        console.log("Temperatura:");
        console.log("Temperatura min:");
        console.log("Temperatura max:");
        break;
      case 2:
        break;

      default:
        break;
    }

    if (opt !== 0) await pauseMenu();
  } while (opt !== 0);
};

main();
