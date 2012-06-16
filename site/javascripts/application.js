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

  $("form").submit(function(e) {
    var errors = $(this).find(".error").length;
    errors && e.preventDefault();
  });

  $("form :password").blur(function() {
    var $pwds = $("form :password");
    $("form .error#password").remove();
    if (isIncomplete($pwds)) { return; }
    if ($pwds.eq(0).val() !== $pwds.eq(1).val()) {
      newError("Passwords must match", "password").insertBefore($pwds[1]);
    }
  });

  $("form :text, form :email, form :password").blur(function() {
    $("form :submit").prop("disabled", isIncomplete($("form :text, form :email, form :password")));
  });

  $("form :submit").prop("disabled", true);

});

(function($) {
  $.expr[":"].email = function(input) {
    return input.nodeName.toLowerCase() === "input" && "email" === input.type;
  };
})(jQuery);
