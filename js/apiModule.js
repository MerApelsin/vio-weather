//Module for the API information - the fetchData for calling on the API and the getWeather myFunction
//for creating an object and returning that with the information we want instead of "the whole package".
//Since getWeather calls on fetchData both needs the query inparameter - even tho it will be the same on both.
var apiModule = (function()
{
  //I've tried having the try-catch here but gets stuck with pending promises, not sure why.
  async function fetchData(query)
  {
    let url = 'https://api.apixu.com/v1/current.json?key=APIKEY&q=' + query; //Key goes between key= and &q
    let promise = await fetch(url);
    let data = await promise.json();
    return data;
  }

  //I've also had a try-catch here, but with no success, as wrapping all the code below in a try makes it try *all* the code.
  //And it's here I've try the try-catch included in readme.md in the pastebin link.
  async function getWeather(query)
  {
    let response = await fetchData(query);
    weather = {city: response.location.name, country: response.location.country,
      temp: response.current.temp_c,
      weatherIcon: response.current.condition.code};
      return weather;
  }

  return {getWeather:getWeather};
})();
