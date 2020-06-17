var express = require("express");
var router = express.Router();
const getGeocode = require("../utils/getGeocode");
const getForecast = require("../utils/getForecast");

/* GET home page. */
router.get("/", async function (req, res, next) {
	try {
		// get the city value
		const { city } = req.query;
		console.log(city);
		if (!city) {
			return res.render("index", { title: "Weather App" });
		}
		// get the coordinates from the city name
		const location = await getGeocode(city);
		console.log(location);
		// use the location coordinate to get the forecast
		// get coordinate from location.geometry.coordinates
		const forecast = await getForecast(location.geometry.coordinates);
		console.log(forecast.current.weather);
		return res.render("index", {
			title: "Weather App",
			forecast: forecast.current,
		});
	} catch (err) {
		// err is an Error object
		next(err);
	}
});

module.exports = router;
