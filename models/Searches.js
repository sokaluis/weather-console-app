const axios = require("axios").default;
const fs = require("fs");

class Searches {
  history = ["Tegucigalpa", "Madrid", "San José", "Bogotá"];
  file = "./db/data.json";

  constructor() {
    //TODO: read DB
  }

  get paramsMapBox() {
    return {
      language: "es",
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
    };
  }

  get paramsWeather() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      units: "metric",
      // lang: "es",
    };
  }

  async searchCities(place = "") {
    try {
      const intance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
        params: this.paramsMapBox,
      });

      const {
        data: { features },
      } = await intance.get();
      return features.map((place) => ({
        id: place.id,
        name: place.place_name,
        lng: place.center[0],
        lat: place.center[1],
      }));
    } catch (error) {
      console.log(error, "No se encontró nada");
      return [];
    }
  }

  async searchWeather(lat, lon) {
    try {
      const intance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: { ...this.paramsWeather, lat, lon },
      });
      const {
        data: {
          main: { temp, temp_max, temp_min },
          weather,
        },
      } = await intance.get();

      return {
        temp,
        temp_min,
        temp_max,
        description: weather[0].description,
      };
    } catch (error) {
      console.log(error, "Error al hacer el llamado");
    }
  }

  saveHistory(place = "") {
    if (this.history.includes(place.toLocaleLowerCase())) return;
    this.history.unshift(place.toLocaleLowerCase());

    //save in db
    this.saveFileDB();
  }

  saveFileDB = () => {
    const payload = {
      history: this.history,
    };
    fs.writeFileSync(this.file, JSON.stringify(payload));
  };

  readDB = () => {
    if (!fs.existsSync(this.file)) {
      return null;
    }
    const info = fs.readFileSync(this.file, { encoding: "utf-8" });
    const data = JSON.parse(info);
    return data;
  };
}

module.exports = Searches;
