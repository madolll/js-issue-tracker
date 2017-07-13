$(document).ready(function() {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAUIeWePAGqpRYF0rdfGeeQCS7oH41spMU",
    authDomain: "js-issue-tracker.firebaseapp.com",
    databaseURL: "https://js-issue-tracker.firebaseio.com",
    projectId: "js-issue-tracker",
    storageBucket: "",
    messagingSenderId: "16138818854"
  };
  firebase.initializeApp(config);

  // Get a reference to the database service
  var database = firebase.database();

  var issueList;

  function writeIssueData(issue, severity, responsible, issueId) {
    database.ref('issues/' + issueId).set({
      description: issue,
      severity: severity,
      assignee: responsible
    });
  }

  function deleteIssueData(issueId) {
    database.ref('issues/' + issueId).remove();
  }

  function displayIssueData() {
    var issueRef = database.ref('issues');

    issueRef.on('value', function(snapshot) {
      issueList = snapshot.val();
      $(".item-rendered").remove();

      $.each(issueList, function(index, value) {
        var $template = $(".template").clone(false, false).removeClass("template hidden").addClass("item-rendered");

        $("[data-id='id']", $template).text(index);
        $("[data-id='description']", $template).text(value.description);
        $("[data-id='severity']", $template).text(value.severity);
        $("[data-id='person']", $template).text(value.assignee);

        $("#responses").append($template);

        $("[data-id='delete']", $template).on("click", function(){
          deleteIssueData(index);
        });
      });
    });
  }

  displayIssueData();

  $("#track-btn").on("click", function( event ) {
    event.preventDefault();

    var issue = $("#issue-description").val();
    var severity = $("#severity").val();
    var responsible = $("#responsible").val();

    writeIssueData(issue, severity, responsible, guid());


    //
    // $("[data-id='close']", $template).on("click", function(){
    //   var status = $template.attr("data-status");
    //   if (status == "open") {
    //     $("[data-id='status']", $template).text("closed").removeClass("btn-info").addClass("btn-success");
    //     $(this).text("reopen").removeClass("btn-warning").addClass("btn-info");
    //     $template.attr("data-status", "closed");
    //   } else {
    //     $("[data-id='status']", $template).text("open").removeClass("btn-success").addClass("btn-info");
    //     $(this).text("close").removeClass("btn-info").addClass("btn-warning");
    //     $template.attr("data-status", "open");
    //   }
    // });
    //


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