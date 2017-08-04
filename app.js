$(document).ready(function() {
	// Custom form behavior
	$("form[name='issue-tracker']").off("submit");
  $("form[name='issue-tracker']").on("submit", function(event) {
    event.preventDefault();

		// Form data
    var description = $("[name='description']", this).val();
    var severity = $("[name='severity']", this).val();
    var responsible = $("[name='responsible']", this).val();

		// Custom template
    var $template = $(".template").clone(false, false).removeClass("template hidden");

		// Generate a unique ID
    $("[data-id='id']", $template).text(guid());

		// Fill the template with the form data
		$("[data-id='description']", $template).text(description);
    $("[data-id='severity']", $template).text(severity);
    $("[data-id='person']", $template).text(responsible);

		// Append the template to the list
    $("#responses").append($template);

		// Issue states ['open', 'closed']
		// Default state: open
		$("[data-id='close']", $template).off("click");
    $("[data-id='close']", $template).on("click", function(){
      var status = $template.attr("data-status");
			// If the status is open trigger the closed state
      if (status == "open") {
        $("[data-id='status']", $template).text("closed").removeClass("btn-info").addClass("btn-success"); // Change the text and switch classes on the status
        $(this).text("reopen").removeClass("btn-warning").addClass("btn-info"); // Change the text and switch classes on the button
        $template.attr("data-status", "closed"); // Save the new state
      } else {
			// If the status is closed trigger the open state
        $("[data-id='status']", $template).text("open").removeClass("btn-success").addClass("btn-info"); // Change the text and switch classes on the status
        $(this).text("close").removeClass("btn-info").addClass("btn-warning"); // Change the text and switch classes on the button
        $template.attr("data-status", "open"); // Save the new state
      }
    });

		// Remove the issue from the list
		$("[data-id='delete']", $template).off("click");
    $("[data-id='delete']", $template).on("click", function(){
      $($template).remove();
    });
  });
});


//Generates a unique id
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}