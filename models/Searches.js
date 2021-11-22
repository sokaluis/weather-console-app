const axios = require("axios").default;

class Searches {
  history = ["Tegucigalpa", "Madrid", "San José", "Bogotá"];

  constructor() {
    //TODO: read DB
  }

  get paramsMapBox() {
    return {
      language: "es",
      access_token:
        "pk.eyJ1Ijoic29rYWx1aXMiLCJhIjoiY2t3YjZ3eG84MXgwczJxbzBtd2JiOXdlZyJ9.04ZvtY9PmhaiSbF8oOy9aQ",
      limit: 5,
    };
  }

  async city(place = "") {
    try {
      const intance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
        params: this.paramsMapBox,
      });

      const { data } = await intance.get();

      console.log(data);
      return [];
    } catch (error) {
      console.log(error, "No se encontró nada");
      return [];
    }
  }
}

module.exports = Searches;
