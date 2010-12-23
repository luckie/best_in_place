function RestInPlaceEditor(e) {
  this.element = jQuery(e);
  this.initOptions();
  this.bindForm();
  this.activator.bind('click', {editor: this}, this.clickHandler);
}

RestInPlaceEditor.prototype = {
  // Public Interface Functions //////////////////////////////////////////////

  activate : function() {
		var elem = this.element.html();
    this.oldValue = elem;
    this.activator.unbind("click", this.clickHandler);
    this.activateForm();
  },

  abort : function() {
    this.element.html(this.oldValue).bind('click', {editor: this}, this.clickHandler);
  },

  update : function() {
    var editor = this;
    editor.ajax({
      "type"       : "post",
      "dataType"   : "text",
      "data"       : editor.requestData(),
      "success"    : function(data){ editor.loadSuccessCallback(data) },
      "error"      : function(request, error){ editor.loadErrorCallback(request, error) }
    });
    editor.element.html(this.getValue());
  },

  activateForm : function() {
    alert("The form was not properly initialized. activateForm is unbound");
  },

  // Helper Functions ////////////////////////////////////////////////////////

  initOptions : function() {
    // Try parent supplied info
    var self = this;
    self.element.parents().each(function(){
      self.url           = self.url           || jQuery(this).attr("data-url");
      self.selectValues  = self.selectValues  || jQuery(this).attr("data-selectValues");
      self.formType      = self.formType      || jQuery(this).attr("data-formType");
      self.objectName    = self.objectName    || jQuery(this).attr("data-object");
      self.attributeName = self.attributeName || jQuery(this).attr("data-attribute");
    });
    // Try Rails-id based if parents did not explicitly supply something
    self.element.parents().each(function(){
      var res;
      if (res = this.id.match(/^(\w+)_(\d+)$/i)) {
        self.objectName = self.objectName || res[1];
      }
    });
    
    var ft = (self.selectValues != null ? "select" : "input");
    
    // Load own attributes (overrides all others)
    self.url           = self.element.attr("data-url")          || self.url      || document.location.pathname;
    self.selectValues  = self.element.attr("data-selectValues") || self.selectValues;
    self.formType      = self.element.attr("data-formType")     || self.formtype || ft
    self.objectName    = self.element.attr("data-object")       || self.objectName;
    self.attributeName = self.element.attr("data-attribute")    || self.attributeName;
    self.activator     = self.element.attr("data-activator")    || self.element;

    if (self.formType == "select" && self.selectValues != null)
    {
      var type = typeof self.selectValues;
      if (type == "string" && self.selectValues != "")
      {
        $.get(self.selectValues, function(data) {
          self.values = data;
        });
      }
      else if (type == "object")// Values are given via javascript data()
      {
        self.values = self.selectValues;
      }
    }
  },

  bindForm : function() {
    this.activateForm = RestInPlaceEditor.forms[this.formType].activateForm;
    this.getValue     = RestInPlaceEditor.forms[this.formType].getValue;
  },

  getValue : function() {
    alert("The form was not properly initialized. getValue is unbound");
  },

  // Trim and Strips HTML from text
  sanitize : function(s) {
     var tmp = document.createElement("DIV");
     tmp.innerHTML = s;
     return jQuery.trim(tmp.textContent||tmp.innerText);
  },

  /* Generate the data sent in the POST request */
  requestData : function() {
    //jq14: data as JS object, not string.
    var data = "_method=put";
    data += "&"+this.objectName+'['+this.attributeName+']='+encodeURIComponent(this.getValue());
    if (window.rails_authenticity_token) {
      data += "&authenticity_token="+encodeURIComponent(window.rails_authenticity_token);
    }
    return data;
  },

  ajax : function(options) {
    options.url = this.url;
    options.beforeSend = function(xhr){ xhr.setRequestHeader("Accept", "application/json"); };
    try { var ajaxRequest = jQuery.ajax(options) }
    catch(e) { alert("error"); }
    return ajaxRequest;
  },

  // Handlers ////////////////////////////////////////////////////////////////

  loadSuccessCallback : function(data) {
    //jq14: data as JS object, not string.
    if (jQuery.fn.jquery < "1.4") data = eval('(' + data + ')' );
    this.element.html(data[this.objectName]);

		// Binding back after being clicked
    this.element.bind('click', {editor: this}, this.clickHandler);
  },

  loadErrorCallback : function(request, error) {
    this.element.html(this.oldValue);

    // Display all error messages from server side validation
    $.each(jQuery.parseJSON(request.responseText), function(index, value) {
      var container = $("<span class='flash-error'></span>").html(index + ': ' + value);
      container.purr();
    });

		// Binding back after being clicked
    this.element.bind('click', {editor: this}, this.clickHandler);
  },

  clickHandler : function(event) {
    event.data.editor.activate();
  }
}


RestInPlaceEditor.forms = {
  "input" : {
    /* is bound to the editor and called to replace the element's content with a form for editing data */
    activateForm : function() {
      var form = '<form class="form_in_place" action="javascript:void(0)" style="display:inline;"><input type="text" value="' + this.sanitize(this.oldValue) + '"></form>'
      this.element.html(form);
      this.element.find('input')[0].select();
      this.element.find("form")
        .bind('submit', {editor: this}, RestInPlaceEditor.forms.input.submitHandler);
      this.element.find("input")
        .bind('blur',   {editor: this}, RestInPlaceEditor.forms.input.inputBlurHandler);
    },

    getValue :  function() {
      return this.sanitize(this.element.find("input").val());
    },

    inputBlurHandler : function(event) {
      event.data.editor.abort();
    },

    submitHandler : function(event) {
      event.data.editor.update();
      return false;
    }
  },

  "select" : {
    activateForm : function() {
      var output = "<form action='javascript:void(0)' style='display:inline;'><select>";
      var selected = "";
      var oldValue = this.oldValue;
      $.each(this.values, function(index, value) {
        selected = (index == oldValue ? "selected='selected'" : "")
        output += "<option value='" + index + "' " + selected + ">" + value + "</option>"
       });
      output += "</select></form>"
      this.element.html(output);
      this.element.find("select").bind('change', {editor: this}, RestInPlaceEditor.forms.select.blurHandler);
    },
  
    getValue : function() {
      return this.sanitize(this.element.find("select").val());
    },
  
    blurHandler : function(event) {
      event.data.editor.update();
    }
  },
  
  "checkbox" : {
    activateForm : function() {
      var output = "<form action='javascript:void(0)' style='display:inline;'>";
      checked = (this.oldValue ? "checked='checked'" : "");
      output += "<input type='checkbox' " + checked + "/></form>"
      this.element.html(output);
      this.element.find("input").bind('change', {editor: this}, RestInPlaceEditor.forms.select.blurHandler);
    },
  
    getValue : function() {
      return this.sanitize(this.element.find("input").val());
    },
  
    blurHandler : function(event) {
      event.data.editor.update();
    }
  },

  "textarea" : {
    /* is bound to the editor and called to replace the element's content with a form for editing data */
    activateForm : function() {
      this.element.html('<form action="javascript:void(0)" style="display:inline;"><textarea>' + this.sanitize(this.oldValue) + '</textarea></form>');
      this.element.find('textarea')[0].select();
      this.element.find("textarea").bind('blur', {editor: this}, RestInPlaceEditor.forms.textarea.blurHandler);
    },

    getValue :  function() {
      return this.sanitize(this.element.find("textarea").val());
    },

    blurHandler : function(event) {
      this.update();
    }

  }
}

jQuery.fn.rest_in_place = function(options) {
  this.each(function(){
    jQuery(this).data('restInPlaceEditor', new RestInPlaceEditor(this));
  })
  return this;
}




// TODO
// ====
// - Sanitize HTML + Trim spaces √
// - Server Side Validation and exception catching √
// - Populate select fields with collections √
// - Checkbox
// - Client Side Validation
// - Accepts given click handlers
// - Accepts handler to activate all rest_in_place fields at once