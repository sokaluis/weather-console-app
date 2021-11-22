require("colors");
const { inquirerMenu, pauseMenu, readInput } = require("./helpers/inquirer");
const Searches = require("./models/Searches");

const main = async () => {
  let opt;
  const searches = new Searches();

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        // show message
        const place = await readInput("City:");
        await searches.city(place);

        // search places

        // select place

        // weather data

        // show result

        console.log("\n Información de la ciudad".green);
        console.log("City:");
        console.log("Lat:");
        console.log("Lng:");
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
