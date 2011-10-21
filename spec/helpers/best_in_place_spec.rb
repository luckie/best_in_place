# encoding: utf-8
require "spec_helper"

describe BestInPlace::BestInPlaceHelpers do
  describe "#best_in_place" do
    before do
      @user = User.new :name => "Lucia",
        :last_name => "Napoli",
        :email => "lucianapoli@gmail.com",
        :address => "Via Roma 99",
        :zip => "25123",
        :country => "1",
        :receive_email => false,
        :description => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a lectus et lacus ultrices auctor. Morbi aliquet convallis tincidunt. Praesent enim libero, iaculis at commodo nec, fermentum a dolor. Quisque eget eros id felis lacinia faucibus feugiat et ante. Aenean justo nisi, aliquam vel egestas vel, porta in ligula. Etiam molestie, lacus eget tincidunt accumsan, elit justo rhoncus urna, nec pretium neque mi et lorem. Aliquam posuere, dolor quis pulvinar luctus, felis dolor tincidunt leo, eget pretium orci purus ac nibh. Ut enim sem, suscipit ac elementum vitae, sodales vel sem."
    end

    describe "general properties" do
      before { @nk = Nokogiri::HTML.parse(helper.best_in_place @user, :name) }

      it "should render a proper span" do
        span = @nk.css("span")
        span.should_not be_empty
      end

      it "should render the name as text" do
        span = @nk.css("span")
        span.text.should == "Lucia"
      end

      it "should have a proper id" do
        span = @nk.css("span")
        span.attribute("id").value.should == "best_in_place_user_name"

      end

      it "should have the best_in_place class" do
        span = @nk.css("span")
        span.attribute("class").value.should == "best_in_place"
      end

      it "should have the correct data-attribute" do
        span = @nk.css("span")
        span.attribute("data-attribute").value.should == "name"
      end

      it "should have the correct data-type" do
        span = @nk.css("span")
        span.attribute("data-type").value.should == "input"
      end

      it "should have the correct default url" do
        @user.save!
        @nk = Nokogiri::HTML.parse(helper.best_in_place @user, :name)
        span = @nk.css("span")
        span.attribute("data-url").value.should == "/users/#{@user.id}"
      end

      it "should have the correct data-object" do
        span = @nk.css("span")
        span.attribute("data-object").value.should == "user"
      end

    end
  end
end
