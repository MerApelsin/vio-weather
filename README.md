# Vinnovera arbetsprov
A simpler weather site using [Apixu weather](https://www.apixu.com/). Search for a city and if it's found it'll be added to storage and shown to the user. Background color of the information is decided by what kind weather that will be displayed.
The 'added' cities are supposed to be saved in localstorage`*` so that the chosen are still there next time a user visits, this behavior was not specified but feels natural with the plus acting the way it does. Only vanilla JS and vanilla css.
**Not optimized for older browsers!**

## Things to note:
The actual key is not in the code incase of 'theft', thus, replace the part where it says **APIKEY**
with your own key in js/apiModule.js on line 8.
The code is commented both with typical comments and possible solutions to things mentioned in "Improve" (down below).

### Things to improve:
* The styling of the weather information itself (_The weather (x) button does not have long-shadow due to the amount of "different" css since transparency does not work with that method, hence only normal drop-shadow._)
* Optimization: It seems like the app can get slow if more than 4-5 cities are saved in localStorage, probably due to the nature of how the calls are made.
* Error handling: At the moment it doesn't work as I'd like it to, however I've had low success with other methods I've tried.`*`
* Not really an improve point as such, but errors and similar are only console.log:ed at the moment, you could show these errors to the user on screen, such as having a p-tag with error id and adjusting the innerHTML to match the error.

### Structure
The idea behind the structure is to have main do as little as possible and only act as caller for the other components.
* ApiModule - the main frame for the API calls and handling.
* Render - the file that take cares of creating, drawing and showing the weather information for the created elements.
* StorageHandler - takes care of localStorage for adding, removing and getting what cities(items) that the user adds/has added. Is used together with Render.

`*` Not cookies since the site has no need to communicate with a server in such a way, only the client needs to know what cities the client want.

`*` [Pastebin link to a try-catch I think should have worked but nope](https://pastebin.com/Bk8pqkeH)
