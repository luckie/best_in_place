# Best In Place
## Unobtrusive in Place editing solution


###Description

REST in Place is an AJAX Inplace-Editor that talks to RESTful controllers. It requires absolutely no additional server-side code if your controller fulfills the following REST preconditions:

- It uses the HTTP PUT method to update a record
- It delivers an object in JSON form for requests with "Accept: application/json" headers

The editor works by PUTting the updated value to the server and GETting the updated record afterwards to display the updated value. That way any authentication methods or otherwise funky workflows in your controllers are used for the inplace-editors requests.

###Features

- Compatible with text inputs
- Compatible with textarea
- Compatible with Select dropdowns
- Sanitize HTML and trim spaces of input
- Displays server side validation errors

###Usage

to-do

###Installation

It works by simply copying and loading the files from the folder **/public/javascripts** to your application and loading them in your layouts. The files to add are:

- jquery.js
- jquery.purr.js
- best_in_place.js

If you are using **Ruby on Rails** you can install it as a gem so as to use the helper. Add this line to your Gemfile:

    gem "best_in_place", :git => "http://github.com/bernat/best_in_place"


###TODO

- Compatible with boolean checkboxes
- Client Side Validation support
- To accept given click handlers
- To accept a handler to activate all best_in_place fields at once

###Authors and License

Version by [Bernat Farrero](http://bernatfarrero.com) based on the [original project](http://github.com/janv/rest_in_place/) of Jan Varwig and released under [MIT](http://www.opensource.org/licenses/mit-license.php).