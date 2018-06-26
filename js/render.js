//This file is where the application takes care of all the rendering of dynamic elements (i.e the weather information)
var renderElement = (function()
{
  //potentially you could take what div the element is going to get appended to as an inparameter too.
  //Make all the elements and fill them with the info for *this* weather. Outside only drawWeather should be called
  //since getGraphics is an internal function for the main function - drawWeather.
  //In the event of pinned weathers the idea is to loop this function
  //We put the ID of the "specificWeather" div to the inputed query, in order to be able to remove that div when pressing the 'x'
  //and removing it from localStorage.
  function drawWeather(weatherInfo)
  {
    if(weatherInfo != undefined) //This if-case is only needed due to "bad" error handling :(
    {
      const parentDiv = document.getElementById("weatherDiv");
      let colorSources = getGraphics(weatherInfo.weatherIcon);
      const specificWeather = document.createElement("div");
      specificWeather.setAttribute("class", "weather " + colorSources.class);
      specificWeather.setAttribute("id", weatherInfo.weatherQuery)

      const imgDiv = document.createElement("div");
      imgDiv.setAttribute("class", "weatherImg");
      const weatherImg = document.createElement("img");

      weatherImg.setAttribute("src", colorSources.image);
      imgDiv.appendChild(weatherImg);

      const statusDiv = document.createElement("div");
      statusDiv.setAttribute("class","status");

      const temperatureDiv = document.createElement("div");
      temperatureDiv.setAttribute("class", "tempDiv");
      const temperature = document.createElement("p");
      const tempInfo = weatherInfo.temp;
      const tempNode = document.createTextNode(tempInfo);
      const cspan = document.createElement("span");
      cspan.setAttribute("class","celsius");
      cspan.innerHTML = "°C";
      temperature.appendChild(tempNode);
      temperature.appendChild(cspan);
      temperatureDiv.appendChild(temperature);

      const locationDiv = document.createElement("div");
      locationDiv.setAttribute("class", "locDiv");
      const locationInfo = document.createElement("p");
      const city = weatherInfo.city;
      const country = weatherInfo.country;
      const locationNode = document.createTextNode(city+", "+country);
      locationInfo.appendChild(locationNode);
      locationDiv.appendChild(locationInfo);

      statusDiv.appendChild(temperatureDiv);
      statusDiv.appendChild(locationDiv);

      const removeDiv = document.createElement("div");
      removeDiv.setAttribute("class","removeButton");

      const xspan = document.createElement("span");
      xspan.setAttribute("class","remove");
      xspan.innerHTML = "x";
      xspan.style.color = colorSources.font;
      xspan.onclick=function(){storageHandler.onRemove(weatherInfo.weatherQuery,false);}
      removeDiv.appendChild(xspan);

      specificWeather.appendChild(imgDiv);
      specificWeather.appendChild(statusDiv);
      specificWeather.appendChild(removeDiv);

      parentDiv.appendChild(specificWeather);
    }
  }

  //since we get a code from the API we match em up to an icon that represents that value.
  //The spec doesn't say what background colors or how they are decided - this is my interpretation of it.
  //We also makes it return another css class(which only contains a background color+font color for the x to match) to make it match the icon
  function getGraphics(weatherIcon)
  {
      switch(weatherIcon)
      {
        case 1000:
        return {class:"sun",image:"images/weather/2.svg",font:"#eb9861"};
        //night = 3 //clear
        case 1003:
        return {class:"cloudy",image:"images/weather/8.svg",font:"#e4b162"};
        //night = 9 //partly cloudy
        case 1006:
        return {class:"cloudy",image:"images/weather/14.svg",font:"#e4b162"};
        //cloudy
        case 1009:
        return {class:"cloudy",image:"images/weather/5.svg",font:"#e4b162"};
        // overcast
        case 1030:
        return {class:"cloudy",image:"images/weather/13.svg",font:"#e4b162"};
        // mist
        case 1063:
        case 1150:
        case 1153:
        case 1168:
        case 1171:
        case 1180:
        case 1183:
        case 1240:
        return {class:"rain",image:"images/weather/17.svg",font:"#87dcef"};
         //  rain
        case 1066:
        case 1237:
        return {class:"snow",image:"images/weather/7.svg",font:"#b5e5f1"};
        // snow
        case 1069:
        case 1072:
        case 1204:
        case 1207:
        case 1261:
        case 1264:
        return {class:"snow",image:"images/weather/24.svg",font:"#b5e5f1"};
        //sleet?
        case 1087:
        return {class:"thunder",image:"images/weather/15.svg",font:"#328499"};
        // thunder
        case 1114:
        return {class:"snow",image:"images/weather/22.svg",font:"#b5e5f1"};
        //blowing snow?
        case 1117:
        case 1219:
        case 1222:
        case 1225:
        return {class:"snow",image:"images/weather/23.svg",font:"#b5e5f1"};
        // snow
        case 1135:
        case 1147:
        return {class:"cloudy",image:"images/weather/13.svg",font:"#e4b162"};
         // mist
        case 1186:
        case 1189:
        case 1192:
        case 1195:
        case 1198:
        case 1201:
        case 1243:
        case 1246:
        case 1249:
        case 1252:
        case 1255:
        case 1258:
        return {class:"rain",image:"images/weather/18.svg",font:"#87dcef"};
        //rain
        case 1210:
        case 1213:
        return {class:"snow",image:"images/weather/20.svg",font:"#b5e5f1"};
        //snow
        case 1216:
        return {class:"snow",image:"images/weather/21.svg",font:"#b5e5f1"};
        //snow
        case 1273:
        case 1279:
        case 1282:
        return {class:"thunder",image:"images/weather/27.svg",font:"#328499"};
        //thunder
        case 1276:
        return {class:"thunder",image:"images/weather/26.svg",font:"#328499"};
        //thunder
      }
  }

  return{drawWeather:drawWeather};
})();
