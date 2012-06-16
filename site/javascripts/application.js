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

  (function($form) {
    $form.submit(function(e) {
      var errors = $form.find(".error").length;
      errors && e.preventDefault();
    });

    $form.find(":password").blur(function() {
      var $pwds = $form.find(":password");
      $form.find(".error#password").remove();
      if (isIncomplete($pwds)) { return; }
      if ($pwds.eq(0).val() !== $pwds.eq(1).val()) {
        newError("Passwords must match", "password").insertBefore($pwds[1]);
      }
    });

    $form.find(":text, :email, :password").blur(function() {
      $form.find(":submit").prop("disabled", isIncomplete($form.find(":text, :email, :password")));
    });

    $form.find(":submit").prop("disabled", true);
  })($("form"));

});

(function($) {
  $.expr[":"].email = function(input) {
    return input.nodeName.toLowerCase() === "input" && "email" === input.type;
  };
})(jQuery);
