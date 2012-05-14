#Changelog

##Master branch (and part of the Rails 3.0 branch)
- v.0.1.0 Initial commit
- v.0.1.2 Fixing errors in collections (taken value[0] instead of index) and fixing test_app controller responses
- v.0.1.3 Bug in Rails Helper. Key wrongly considered an Integer.
- v.0.1.4 Adding two new parameters for further customization urlObject and nilValue and making input update on blur.
- v.0.1.5 **Attention: this release is not backwards compatible**. Changing params from list to option hash, helper's refactoring,
  fixing bug with objects inside namespaces, adding feature for passing an external activator handler as param. Adding feature
  of key ESCAPE for destroying changes before they are made permanent (in inputs and textarea).
- v.0.1.6-0.1.7 Avoiding request when the input is not modified and allowing the user to not sanitize input data.
- v.0.1.8 jslint compliant, sanitizing tags in the gem, getting right csrf params, controlling size of textarea (elastic script, for autogrowing textarea)
- v.0.1.9 Adding elastic autogrowing textareas
- v.1.0.0 Setting RSpec and Capybara up, and adding some utilities. Mantaining some HTML attributes. Fix a respond_with bug (thanks, @moabite). Triggering ajax:success when ajax call is complete (thanks, @indrekj). Setting up Travis CI. Updated for Rails 3.1.
- v.1.0.1 Fixing a double initialization bug
- v.1.0.2 New bip_area text helper to work with text areas.
- v.1.0.3 replace apostrophes in collection with corresponding HTML entity,
  thanks @taavo. Implemented `:display_as` option and adding
  `respond_with_bip` to be used in the controller.
- v.1.0.4 Depend on ActiveModel instead of ActiveRecord (thanks,
  @skinnyfit). Added date type (thanks @taavo). Added new feature:
display_with.
- v.1.0.5 Fix a bug involving quotes (thanks @ygoldshtrakh). Minor fixes
  by @bfalling. Add object name option (thanks @nicholassm). Check
version of Rails before booting. Minor fixes.
- v.1.0.6 Fix issue with display_with. Update test_app to 3.2.
- v.1.1.0 Changed $ by jQuery for compatibility (thanks @tschmitz), new
  events for 'deactivate' (thanks @glebtv), added new 'data' attribute
to BIP's span (thanks @straydogstudio), works with dynamically added
elements to the page (thanks @enriclluelles), added object detection to
the 'path' parameter and some more bugfixes.

##Rails 3.0 branch only
- v.0.2.0 Added RSpec and Capybara setup, and some tests. Fix countries map syntax, Allowing href and some other HTML attributes. Adding Travis CI too. Added the best_in_place_if option. Added ajax:success trigger, thanks to @indrekj.
- v.0.2.1 Fixing double initialization bug.
- v.0.2.2 New bip_area text helper.
