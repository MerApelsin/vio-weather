//This file is supposed to check the storage/cookies for any pinned cities - if there are any.
var storageHandler = (function()
{
  //Adds location to the storage for display
  function onAdd()
  {
    //fetch the city name from the input field
    let cityValue = document.getElementById("locationQuery").value;
    const city = cityValue.toLowerCase();
    //Checks if we have earlier saved something in localstorage - if we haven't we can just store the value right ahead
    //we make it into an array first to make sure that the structure matches up.
    if(localStorage.getItem("cities") === null)
    {
      let arr = [city];
      localStorage.setItem("cities", JSON.stringify(arr));
      //Clears the input field since we've used the value and don't really want to keep it there.
      document.getElementById("locationQuery").value = "";
    }
    //else we need to parse the values to check if user has earlier added the same item, and if no - add it to the array
    //and parse it into json as localstorage only take strings.
    else
    {
      let tempValue = localStorage.getItem("cities");
      let jsonArr = JSON.parse(tempValue);
      if(jsonArr.includes(city) == false)
      {
          jsonArr.push(city);
          localStorage.setItem("cities",JSON.stringify(jsonArr));
      }
      document.getElementById("locationQuery").value = "";
    }
  }

  //The remove function takes the cities name from the div as the inparameter - we fetch where in the parsed array
  //this item exists and splices it to get a modified array without the mentioned value. Then we put the modified array
  //into localstorage again.
  //queryError bool is as it sounds since bad requests don't have a div to remove but "real" requests do (since they display weather)
  function onRemove(item,queryError)
  {
    let removeItem = item.toLowerCase();
    let spacedItem = "";

    let tempValue = localStorage.getItem("cities");
    let jsonArr = JSON.parse(tempValue);

    let index = jsonArr.indexOf(removeItem);

    //this if "hell" is due to the fact that some querys won't need the whole word for it to work, unintentinall, while
    //some perhaps do - such as "San diego", so this is to check first if we need to remove a space from the item or not.
    if(index < 0)
    {
      //The query as-is is not found, check for first space and remove it + everything behind and try again
      let spaceIndex = removeItem.indexOf(' ');
      if(spaceIndex > -1)
      {
        spacedItem = removeItem.substring(0, spaceIndex);
        let tempInd = jsonArr.indexOf(spacedItem);
        if(tempInd > -1)
        {
          jsonArr.splice(tempInd,1);
        }
      }
    }
    else if(index > -1) //query is found directly - as-is - remove it.
    {
      jsonArr.splice(index,1);
    }

    localStorage.setItem("cities",JSON.stringify(jsonArr));
    if(queryError == false)
    {
      var thisDiv = document.getElementById(item);
      thisDiv.remove();
    }
  }

  //getItems simply fetches and parses the value to return an array that'll be used together with render.
  function getItems()
  {
    let tempValue = localStorage.getItem("cities");
    return values = JSON.parse(tempValue);
  }

  //A function for testing - if this were a "real production" I would have removed it. Leaving it be cause it might be helpful.
  //Could make it into a button for users to clear their request without removing them one-by-one
  function tempClear()
  {
    localStorage.removeItem("cities");
  }
  return {onAdd:onAdd,onRemove:onRemove,getItems:getItems,tempClear:tempClear};
})();
