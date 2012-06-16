$(function() {
  var newError = function(msg, id) {
    id = id || "";
    console.log(msg);
    return $("<p />", {
      "class": "error",
      id: id,
      text: msg
    });
  };
  var isIncomplete = function($els) {
    var blank = false;
    $els.each(function(i) { !$els.eq(i).val() && (blank = true); });
    return blank;
  };

  var form = {
    $el: $("form"),
    submit: function(e) {
      var errors = form.$el.find(".error").length;
      errors && e.preventDefault();
    },
    comparePasswords: function() {
      var $pwds = form.$el.find(":password");
      form.$el.find(".error#password").remove();
      if (isIncomplete($pwds)) { return; }
      if ($pwds.eq(0).val() !== $pwds.eq(1).val()) {
        newError("Passwords must match", "password").insertBefore($pwds[1]);
      }
    },
    toggleSubmit: function() {
      form.$el.find(":submit").prop("disabled", isIncomplete(form.$el.find(":text, :email, :password")));
    },
    init: function() {
      form.$el.submit(form.submit);
      form.$el.on("blur.comparePasswords", ":password", form.comparePasswords);
      form.$el.on("blur.toggleSubmit", ":text, :email, :password", form.toggleSubmit);
      form.$el.find(":submit").prop("disabled", true);
    }
  };

  form.init();
});

(function($) {
  $.expr[":"].email = function(input) {
    return input.nodeName.toLowerCase() === "input" && "email" === input.type;
  };
})(jQuery);
