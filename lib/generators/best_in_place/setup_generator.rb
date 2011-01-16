module BestInPlace

  class SetupGenerator < Rails::Generators::Base
    source_root File.expand_path("../../../../public/javascripts", __FILE__)
    desc "Copies best_in_place.js to the /public/javascripts folder of your app."

    def copy_js
      copy_file "best_in_place.js", "public/javascripts/best_in_place.js"
    end
  end
end
