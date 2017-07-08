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

      $("[data-id='closed']", $template).on("click", function(){
        $("[data-id='status']", $template).text("closed").removeClass("btn-info").addClass("btn-success");
      });

      $("[data-id='deleted']", $template).on("click", function(){
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