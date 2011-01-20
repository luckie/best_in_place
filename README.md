# Best In Place
**The Unobtrusive in Place editing solution**


##Description

**Best in Place** is a jQuery based AJAX Inplace-Editor that takes profit of RESTful server-side controllers to allow users to edit stuff with
no need of forms. If the server have standard defined REST methods, particularly those to UPDATE your objects (HTTP PUT), then by adding the
Javascript file to the application it is making all the fields with the proper defined classes to become user in-place editable.

The editor works by PUTting the updated value to the server and GETting the updated record afterwards to display the updated value.

[**SEE DEMO**](http://bipapp.heroku.com/)

---

##Features

- Compatible with text **inputs**
- Compatible with **textarea**
- Compatible with **select** dropdown with custom collections
- Compatible with custom boolean values (like **checkboxes**)
- Sanitize HTML and trim spaces of user's input
- Displays server-side **validation** errors

---

##Usage of Rails 3 Gem

**best_in_place Object, Field, [formType, [SelectValues]]**

The object is the object itself you are about to modify. The field (passed as symbol) is the represented attribute of the Object.
You can add the formType [:input, :textarea, :select, :checkbox] or it defaults to :input. In case you chose :select, you must specify the 
collection of values it can take. In case you use :checkbox, you can specify the two possible boolean values.

If created a [test_app](https://github.com/bernat/best_in_place/tree/master/test_app) and a running demo in heroku to test the features.

Examples (code placed in the views):

### Input

    <%= best_in_place @user, :name, :input %>

### Textarea

    <%= best_in_place @user, :description, :textarea %>

### Select

    <%= best_in_place @user, :country, :select, [[1, "Spain"], [2, "Italy"], [3, "Germany"], [4, "France"]] %>

Of course it can take an instance or global variable for the collection, just remember the structure [[key, value], [key, value],...]

### Checkbox

    <%= best_in_place @user, :receive_emails, :checkbox, ["No, thanks", "Yes, of course!"] %>

The first value is always the negative boolean value and the second the positive [false, true]. 
If not defined, it will default to *Yes* and *No* options.

### Display server validation errors

If you are using a Rails application, your controller's should respond to json in case of error.
Example:

    def update
      @user = User.find(params[:id])

      respond_to do |format|
        if @user.update_attributes(params[:user])
          format.html { redirect_to(@user, :notice => 'User was successfully updated.') }
          format.json { head :ok }
        else
          format.html { render :action => "edit" }
          format.json { render :json => @user.errors.full_messages, :status => :unprocessable_entity }
        end
      end
    end

At the same time, you must define the restrictions, validations and error messages in the model, as the example below:

    class User < ActiveRecord::Base
      validates :name,
        :length => { :minimum => 2, :maximum => 24, :message => "has invalid length"},
        :presence => {:message => "can't be blank"}
      validates :last_name,
        :length => { :minimum => 2, :maximum => 24, :message => "has invalid length"},
        :presence => {:message => "can't be blank"}
      validates :address,
        :length => { :minimum => 5, :message => "too short length"},
        :presence => {:message => "can't be blank"}
      validates :email,
        :presence => {:message => "can't be blank"},
        :format => {:with => /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i, :message => "has wrong email format"}
      validates :zip, :numericality => true, :length => { :minimum => 5 }
    end
    
When the user tries to introduce invalid data, the error messages defined in the model will be displayed in pop-up windows using the jQuery.purr plugin.

---

##Installation

It works by simply copying and loading the files from the folder **/public/javascripts** to your application and loading them in your layouts
in the following order:

- jquery-1.4.2.js
- jquery.purr.js
- **best_in_place.js**

The last one you can copy it (and keeping up to date to the last version) by running the following generator in your application's root:

    rails g best_in_place:setup

To be able to use the script the following block must be added as well:

    $(document).ready(function() {
      /* Activating Best In Place */
      jQuery(".best_in_place").best_in_place()
    });

In order to use the Rails 3 gem, just add the following line to the gemfile:

    gem "best_in_place"

----

##TODO

- Client Side Validation definitions
- To accept given click handlers
- To accept a handler to activate all best_in_place fields at once
- Specs

---

##Changelog

- v.0.1.0 Initial deploy
- v.0.1.2 Fixing errors in collections (taken value[0] instead of index) and fixing test_app controller responses
- v.0.1.3 Bug in Rails Helper. Key wrongly considered an Integer.

##Authors, License and Stuff

Code by [Bernat Farrero](http://bernatfarrero.com) based on the [original project](http://github.com/janv/rest_in_place/) of Jan Varwig and released under [MIT](http://www.opensource.org/licenses/mit-license.php).