module BestInPlace
  module BestInPlaceHelpers
    def best_in_place(object, field, formType = :input, selectValues = [], urlObject = nil, nilValue = "-")
      field = field.to_s
      value = object.send(field).blank? ? nilValue.to_s : object.send(field)
      if formType == :select && !selectValues.blank?
        value = Hash[selectValues][object.send(field)]
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
      out += " data-url='" + (urlObject.blank? ? url_for(object).to_s : url_for(urlObject)) + "'"
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