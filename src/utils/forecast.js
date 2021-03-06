const request = require('request');

const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/23473d3740d27d17ea4aa449b07f2944/${lat},${long}`;
    request({url, json: true}, (err, {body}) => {
        if (err) callback(`DarkSky weather services could not be reached, please try again`, undefined);
        else if (body.error) callback(`Weather information for the specified location could not be found.`, undefined);
        else callback(undefined, `${body.currently.summary} with a current temperature of ${body.currently.temperature}. Currently there is a ${body.currently.precipProbability}% chance of rain. Tomorrow: 
         ${body.daily.data[0].temperatureMax} degrees. ${body.daily.data[0].summary}`)
    })
};


module.exports = forecast;
