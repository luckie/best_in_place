module BestInPlace
  class Engine < Rails::Engine
    initializer "setup for rails" do
      ActionView::Base.send(:include, BestInPlace::BestInPlaceHelpers)
    end
  end
end
