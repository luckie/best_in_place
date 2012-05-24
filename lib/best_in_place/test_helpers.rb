module BestInPlace
  module TestHelpers

    def bip_area(model, attr, new_value)
      id = BestInPlace::Utils.build_best_in_place_id model, attr
      page.execute_script <<-JS
        jQuery("##{id}").click();
        jQuery("##{id} form textarea").val('#{new_value}');
        jQuery("##{id} form textarea").blur();
      JS
    end

    def bip_text(model, attr, new_value)
      id = BestInPlace::Utils.build_best_in_place_id model, attr
      page.execute_script <<-JS
        jQuery("##{id}").click();
        jQuery("##{id} input[name='#{attr}']").val('#{new_value}');
        jQuery("##{id} form").submit();
      JS
    end

    def bip_bool(model, attr)
      id = BestInPlace::Utils.build_best_in_place_id model, attr
      page.execute_script("jQuery('##{id}').click();")
    end

    def bip_select(model, attr, name)
      id = BestInPlace::Utils.build_best_in_place_id model, attr
      page.execute_script <<-JS
        (function() {
          jQuery("##{id}").click();
          var opt_value = jQuery("##{id} select option:contains('#{name}')").attr('value');
          jQuery("##{id} select option[value='" + opt_value + "']").attr('selected', true);
          jQuery("##{id} select").change();
        })();
      JS
    end
  end
end
