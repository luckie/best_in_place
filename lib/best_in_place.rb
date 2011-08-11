require "best_in_place/helper"

module BestInPlace
  autoload :TestHelpers, "best_in_place/test_helpers"
end

ActionView::Base.send(:include, BestInPlace::BestInPlaceHelpers)
