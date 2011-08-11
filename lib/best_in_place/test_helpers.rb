module BestInPlace
  module TestHelpers
    def bip_text(model, attr, new_value)
      page.execute_script <<-JS
        $("#best_in_place_#{model}_#{attr}").click();
        $("#best_in_place_#{model}_#{attr} input[name='#{attr}']").val('#{new_value}');
        $("#best_in_place_#{model}_#{attr} form").submit();
      JS
    end

    def bip_bool(model, attr)
      page.execute_script("$('#best_in_place_#{model}_#{attr}').click();")
    end

    def bip_select(model, attr, name)
      page.execute_script <<-JS
        (function() {
          $("#best_in_place_#{model}_#{attr}").click();
          var opt_value = $("#best_in_place_#{model}_#{attr} select option:contains('#{name}')").attr('value');
          $("#best_in_place_#{model}_#{attr} select option[value='" + opt_value + "']").attr('selected', true);
          $("#best_in_place_#{model}_#{attr} select").change();
        })();
      JS
    end
  end
end
