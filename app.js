$(document).ready(function() {

    $("#track-btn").on("click", function( event ) {
      event.preventDefault();

      var issue = $("#issue-description").val();
      var severity = $("#severity").val();
      var responsible = $("#responsible").val();
      var $template = $(".template").clone(false, false).removeClass("template hidden");

      $("[data-id='id']", $template).text(guid());
      $("[data-id='description']", $template).text(issue);
      $("[data-id='severity']", $template).text(severity);
      $("[data-id='person']", $template).text(responsible);

      $("#responses").append($template);

      $("[data-id='close']", $template).on("click", function(){
        var status = $template.attr("data-status");
        if (status == "open") {
          $("[data-id='status']", $template).text("closed").removeClass("btn-info").addClass("btn-success");
          $(this).text("reopen").removeClass("btn-warning").addClass("btn-info");
          $template.attr("data-status", "closed");
        } else {
          $("[data-id='status']", $template).text("open").removeClass("btn-success").addClass("btn-info");
          $(this).text("close").removeClass("btn-info").addClass("btn-warning");
          $template.attr("data-status", "open");
        }
      });

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