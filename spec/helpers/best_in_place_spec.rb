# encoding: utf-8
require "spec_helper"

describe BestInPlace::BestInPlaceHelpers do
  describe "#best_in_place" do
    it "should render a proper span" do
      @user = User.create! :name => "Lucia", :last_name => "Napoli", :email => "lucianapoli@gmail.com", :address => "Via Roma 99", :zip => "25123", :country => "1", :receive_email => false, :description => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a lectus et lacus ultrices auctor. Morbi aliquet convallis tincidunt. Praesent enim libero, iaculis at commodo nec, fermentum a dolor. Quisque eget eros id felis lacinia faucibus feugiat et ante. Aenean justo nisi, aliquam vel egestas vel, porta in ligula. Etiam molestie, lacus eget tincidunt accumsan, elit justo rhoncus urna, nec pretium neque mi et lorem. Aliquam posuere, dolor quis pulvinar luctus, felis dolor tincidunt leo, eget pretium orci purus ac nibh. Ut enim sem, suscipit ac elementum vitae, sodales vel sem."
      out = helper.best_in_place @user, :name
      out.should =~ /best_in_place/
    end
  end
end
