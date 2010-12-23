module BestInPlace

  class BestInPlaceGenerator < Rails::Generators::Base
      source_root File.expand_path("../../../../public/javascripts", __FILE__)
      desc "Copies javascript files to the /public/javascript folder"

      def copy_files
        # File.symlink "../../../../public/javascripts/best_in_place.js", "/public/javascripts/best_in_place.js"
      end

  end
end
