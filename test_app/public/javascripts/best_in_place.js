/*
        BestInPlace (for jQuery)
        version: 0.1.0 (01/01/2011)
        @requires jQuery >= v1.4
        @requires jQuery.purr to display pop-up windows

        By Bernat Farrero based on the work of Jan Varwig.
        Examples at http://bernatfarrero.com

        Licensed under the MIT:
          http://www.opensource.org/licenses/mit-license.php

        Usage:

        Attention.
        The format of the JSON object given to the select inputs is the following:
        [["key", "value"],["key", "value"]]
        The format of the JSON object given to the checkbox inputs is the following:
        ["falseValue", "trueValue"]
*/

function BestInPlaceEditor(e) {
  this.element = jQuery(e)
  this.initOptions()
  this.bindForm()
  $(this.activator).bind('click', {editor: this}, this.clickHandler)
}

BestInPlaceEditor.prototype = {
  // Public Interface Functions //////////////////////////////////////////////

  activate : function() {
		var elem = this.element.html()
    this.oldValue = elem
    $(this.activator).unbind("click", this.clickHandler)
    this.activateForm()
  },

  abort : function() {
    this.element.html(this.oldValue)
    $(this.activator).bind('click', {editor: this}, this.clickHandler)
  },

  update : function() {
    var editor = this
    if (this.formType in {"input":1, "textarea":1} && this.getValue() == this.oldValue)
    { // Avoid request if no change is made
      editor.element.html(this.getValue())
      $(this.activator).bind('click', {editor: this}, this.clickHandler)
      return true
    }
    editor.ajax({
      "type"       : "post",
      "dataType"   : "text",
      "data"       : editor.requestData(),
      "success"    : function(data){ editor.loadSuccessCallback(data) },
      "error"      : function(request, error){ editor.loadErrorCallback(request, error) }
    })
    if (this.formType == "select") {
      var value = this.getValue()
      $.each(this.values, function(i, v) { if (value == v[0]) editor.element.html(v[1])} )
    } else if (this.formType == "checkbox") {
      editor.element.html(this.getValue() ? this.values[1] : this.values[0])
    } else editor.element.html(this.getValue())
  },

  activateForm : function() {
    alert("The form was not properly initialized. activateForm is unbound")
  },

  // Helper Functions ////////////////////////////////////////////////////////

  initOptions : function() {
    // Try parent supplied info
    var self = this
    self.element.parents().each(function(){
      self.url           = self.url           || jQuery(this).attr("data-url")
      self.collection    = self.collection    || jQuery(this).attr("data-collection")
      self.formType      = self.formType      || jQuery(this).attr("data-type")
      self.objectName    = self.objectName    || jQuery(this).attr("data-object")
      self.attributeName = self.attributeName || jQuery(this).attr("data-attribute")
    })

    // Try Rails-id based if parents did not explicitly supply something
    self.element.parents().each(function(){
      var res
      if (res = this.id.match(/^(\w+)_(\d+)$/i)) {
        self.objectName = self.objectName || res[1]
      }
    })

    // Load own attributes (overrides all others)
    self.url           = self.element.attr("data-url")                || self.url      || document.location.pathname
    self.collection    = self.element.attr("data-collection")         || self.collection
    self.formType      = self.element.attr("data-type")               || self.formtype || "input"
    self.objectName    = self.element.attr("data-object")             || self.objectName
    self.attributeName = self.element.attr("data-attribute")          || self.attributeName
    self.activator     = self.element.attr("data-activator")          || self.element

    if (!self.element.attr("data-sanitize")) self.sanitize = true
    else self.sanitize = (self.element.attr("data-sanitize") == "true")


    if ((self.formType == "select" || self.formType == "checkbox") && self.collection != null)
    {
      self.values = jQuery.parseJSON(self.collection)
    }
  },

  bindForm : function() {
    this.activateForm = BestInPlaceEditor.forms[this.formType].activateForm
    this.getValue     = BestInPlaceEditor.forms[this.formType].getValue
  },

  getValue : function() {
    alert("The form was not properly initialized. getValue is unbound")
  },

  // Trim and Strips HTML from text
  sanitizeValue : function(s) {
    if (this.sanitize)
    {
      var tmp = document.createElement("DIV")
      tmp.innerHTML = s
      s = tmp.textContent || tmp.innerText
    }
   return jQuery.trim(s)
  },

  /* Generate the data sent in the POST request */
  requestData : function() {
    //jq14: data as JS object, not string.
    var data = "_method=put"
    data += "&"+this.objectName+'['+this.attributeName+']='+encodeURIComponent(this.getValue())
    if (window.rails_authenticity_token) {
      data += "&authenticity_token="+encodeURIComponent(window.rails_authenticity_token)
    }
    return data
  },

  ajax : function(options) {
    options.url = this.url
    options.beforeSend = function(xhr){ xhr.setRequestHeader("Accept", "application/json") }
    return jQuery.ajax(options)
  },

  // Handlers ////////////////////////////////////////////////////////////////

  loadSuccessCallback : function(data) {
    //jq14: data as JS object, not string.
    if (jQuery.fn.jquery < "1.4") data = eval('(' + data + ')' )
    this.element.html(data[this.objectName])

		// Binding back after being clicked
    $(this.activator).bind('click', {editor: this}, this.clickHandler)
  },

  loadErrorCallback : function(request, error) {
    this.element.html(this.oldValue)

    // Display all error messages from server side validation
    $.each(jQuery.parseJSON(request.responseText), function(index, value) {
      var container = $("<span class='flash-error'></span>").html(value)
      container.purr()
    })

		// Binding back after being clicked
    $(this.activator).bind('click', {editor: this}, this.clickHandler)
  },

  clickHandler : function(event) {
    event.data.editor.activate()
  }
}


BestInPlaceEditor.forms = {
  "input" : {
    activateForm : function() {
      var form = '<form class="form_in_place" action="javascript:void(0)" style="display:inline;"><input type="text" value="' + this.sanitizeValue(this.oldValue) + '"></form>'
      this.element.html(form)
      this.element.find('input')[0].select()
      this.element.find("form").bind('submit', {editor: this}, BestInPlaceEditor.forms.input.submitHandler)
      this.element.find("input").bind('blur',   {editor: this}, BestInPlaceEditor.forms.input.inputBlurHandler)
      this.element.find("input").bind('keyup', {editor: this}, BestInPlaceEditor.forms.input.keyupHandler)
    },

    getValue :  function() {
      return this.sanitizeValue(this.element.find("input").val())
    },

    inputBlurHandler : function(event) {
      event.data.editor.update()
    },

    submitHandler : function(event) {
      event.data.editor.update()
    },

    keyupHandler : function(event) {
      if (event.keyCode == 27) event.data.editor.abort()
    }
  },

  "select" : {
    activateForm : function() {
      var output = "<form action='javascript:void(0)' style='display:inline;'><select>"
      var selected = ""
      var oldValue = this.oldValue
      $.each(this.values, function(index, value) {
        selected = (value[1] == oldValue ? "selected='selected'" : "")
        output += "<option value='" + value[0] + "' " + selected + ">" + value[1] + "</option>"
       })
      output += "</select></form>"
      this.element.html(output)
      this.element.find("select").bind('change', {editor: this}, BestInPlaceEditor.forms.select.blurHandler)
    },

    getValue : function() {
      return this.sanitizeValue(this.element.find("select").val())
    },

    blurHandler : function(event) {
      event.data.editor.update()
    },
  },

  "checkbox" : {
    activateForm : function() {
      var newValue = Boolean(this.oldValue != this.values[1])
      var output = newValue ? this.values[1] : this.values[0]
      this.element.html(output)
      this.update()
    },

    getValue : function() {
      return Boolean(this.element.html() == this.values[1])
    }
  },

  "textarea" : {
    activateForm : function() {
      this.element.html('<form action="javascript:void(0)" style="display:inline;"><textarea>' + this.sanitizeValue(this.oldValue) + '</textarea></form>')
      this.element.find('textarea')[0].select()
      this.element.find("textarea").bind('blur', {editor: this}, BestInPlaceEditor.forms.textarea.blurHandler)
      this.element.find("textarea").bind('keyup', {editor: this}, BestInPlaceEditor.forms.textarea.keyupHandler)
    },

    getValue :  function() {
      return this.sanitizeValue(this.element.find("textarea").val())
    },

    blurHandler : function(event) {
      event.data.editor.update()
    },

    keyupHandler : function(event) {
      if (event.keyCode == 27) event.data.editor.abort()
    }

  }
}

jQuery.fn.best_in_place = function() {
  this.each(function(){
    jQuery(this).data('bestInPlaceEditor', new BestInPlaceEditor(this))
  })
  return this
}