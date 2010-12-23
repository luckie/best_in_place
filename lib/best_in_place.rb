module BestInPlace
  module BestInPlaceHelpers
    def best_in_place(object, field, formType="input", selectValues="")
      out = "<span class='best_in_place'"
      out += " id='best_in_place_" + object.class.to_s.underscore + "_" + field + "'"
      out += " data-url='" + url_for(object).to_s + "'"
      out += " data-object='" + object.class.to_s.underscore + "'"
      out += " data-selectValues='" + selectValues + "'" if selectValues != ""
      out += " data-attribute='" + field + "'"
      out += " data-formType='" + formType + "'>"
      out += (object.send(field).blank? ? "-" : object.send(field)).to_s
      out +=  "</span>"
      raw(out)
    end

    # def include_best_in_place
    #   javascript_include_tag("best_in_place")
    # end
  end


end


ActionView::Base.send(:include, BestInPlace::BestInPlaceHelpers)