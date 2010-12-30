module BestInPlace
  module BestInPlaceHelpers
    def best_in_place(object, field, formType='input', selectValues=[])
      value = object.send(field).blank? ? "-" : object.send(field)
      unless selectValues.blank?
        value = selectValues.at(object.send(field).to_i)[0]
        selectValues = selectValues.to_json
      end
      out = "<span class='best_in_place'"
      out += " id='best_in_place_" + object.class.to_s.underscore + "_" + field + "'"
      out += " data-url='" + url_for(object).to_s + "'"
      out += " data-object='" + object.class.to_s.underscore + "'"
      out += " data-selectValues='" + selectValues + "'" if !selectValues.blank?
      out += " data-attribute='" + field + "'"
      out += " data-formType='" + formType + "'>"
      out += value.to_s
      out +=  "</span>"
      raw(out)
    end

    # def include_best_in_place
    #   javascript_include_tag("best_in_place")
    # end
  end


end


ActionView::Base.send(:include, BestInPlace::BestInPlaceHelpers)