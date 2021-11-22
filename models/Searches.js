const axios = require("axios").default;

class Searches {
  history = ["Tegucigalpa", "Madrid", "San José", "Bogotá"];

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
      unit: "metric",
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

  async searchWeather(lat, lng) {
    try {
      const intance = axios.create({
        baseURL: `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}`,
        params: this.paramsWeather,
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
        description = weather[0].description,
      };
    } catch (error) {
      console.log(error, "Error al hacer el llamado");
    }
  }
}

module.exports = Searches;
