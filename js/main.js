//The main JS file
main();

 async function main()
{
    //storageHandler.tempClear();
    fetchAll();
    const addLocation = document.getElementById('add');
    addLocation.onclick=checkQuery;
}

//We shouldn't be able to add a city unless we've actually said a city (or well, in this case, any query)
function checkQuery()
{
  let city = document.getElementById("locationQuery").value;
  if( city.length == 0)
  {
    console.log("Please type something into the query");
  }
  else
  {
    storageHandler.onAdd();
    //We've added a city to check the weather for, and we want that into the action.
    //So clear the parent element and then fetch all weathers again - now the new one will be in there.
    refresh();
    fetchAll();
  }
}

//Simply clears the parent div for all the weathers
function refresh()
{
  const mainWeather = document.getElementById("weatherDiv");
  mainWeather.innerHTML = "";
}

//Checks storages if there are any cities to check the weather for, loop them through to draw each of them.

//Performace wise - not a good solution, since it'll call *all* cities added at *all times*.
//A solution could be to add something to check when x city was called and if its less than 10min, keep
//last-call info and skip it.
async function fetchAll()
{
  let cities = storageHandler.getItems();
  console.log(cities);
  if(cities != null)
  {
    //For each loop to handle the cities -> call to api -> draw. Error handling to remove the illegal query from storage
    //Will screw up if you've managed to save an illegal query to begin with - hence the tempClear(); function in storageHandler
    //isn't removed.
    cities.forEach(city => {
    apiModule.getWeather(city).then(weatherInfo =>
      {
        renderElement.drawWeather(weatherInfo);
      }).catch(function(error)
      {
        console.log("There was an error!");
        console.log(error);
        storageHandler.onRemove(city,true);
      });
    });
  }
}
