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

  async cities(place = "") {
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
}

module.exports = Searches;
