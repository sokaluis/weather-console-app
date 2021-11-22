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
        const places = await searches.searchCities(searchTerm);
        const idSelected = await listPlaces(places);
        if (idSelected === "0") continue;
        // select place
        const { name, lat, lng } = places.find(({ id }) => id === idSelected);
        searches.saveHistory(name);
        // weather data
        const { temp, description, temp_max, temp_min } =
          await searches.searchWeather(lat, lng);
        // show result

        console.clear();
        console.log("\nInformación de la ciudad:".green);
        console.log("City: ", name);
        console.log("Lat: ", lat);
        console.log("Lng: ", lng);
        console.log("Temperatura: ", temp);
        console.log("Temperatura min: ", temp_min);
        console.log("Temperatura max: ", temp_max);
        console.log("Weather Description: ", description);
        break;
      case 2:
        searches.history.forEach((item, i) => {
          const idx = `${i + 1}`.green;
          console.log(`${idx}. ${item}`);
        });
        break;

      default:
        break;
    }

    if (opt !== 0) await pauseMenu();
  } while (opt !== 0);
};

main();
