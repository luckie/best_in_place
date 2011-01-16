module BestInPlace
  module BestInPlaceHelpers
    def best_in_place(object, field, formType = :input, selectValues = [])
      field = field.to_s
      value = object.send(field).blank? ? "-" : object.send(field)
      if formType == :select && !selectValues.blank?
        value = Hash[selectValues][object.send(field).to_i]
        selectValues = selectValues.to_json
      end
      if formType == :checkbox
        fieldValue = !!object.send(field)
        if selectValues.blank? || selectValues.size != 2
          selectValues = ["No", "Yes"]
        end
        value = fieldValue ? selectValues[1] : selectValues[0]
        selectValues = selectValues.to_json
      end
      out = "<span class='best_in_place'"
      out += " id='best_in_place_" + object.class.to_s.underscore + "_" + field.to_s + "'"
      out += " data-url='" + url_for(object).to_s + "'"
      out += " data-object='" + object.class.to_s.underscore + "'"
      out += " data-selectValues='" + selectValues + "'" if !selectValues.blank?
      out += " data-attribute='" + field + "'"
      out += " data-formType='" + formType.to_s + "'>"
      out += value.to_s
      out +=  "</span>"
      raw(out)
    end
  end
end


ActionView::Base.send(:include, BestInPlace::BestInPlaceHelpers)