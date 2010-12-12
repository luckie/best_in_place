module ApplicationHelper
  def rest_in_place(object, field, selectValues="", formType="input") 
    out = "<span "
    out += "class='rest_in_place' "
    out += "id='rest_in_place_" + object.class.to_s.underscore + "_" + field + "'"
    out += "data-url='" + url_for(object).to_s + "'"
    out += "data-object='" + object.class.to_s.underscore + "'"
    out += "data-selectValues='" + selectValues + "'"
    out += "data-attribute='" + field + "'"
    out += "data-formType='" + formType + "'"
    out += ">" + (object.send(field).blank? ? "-" : object.send(field)).to_s + "</span>"
    raw(out)
  end
end
