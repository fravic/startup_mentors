$(function(){
   	$('#datepicker').datepicker({
		changeMonth: true,
		changeYear: true
	});
    $('#newEntryModal').modal({
      backdrop: true,
      keyboard: true
    });
    $('#newRequestModal').modal({
      backdrop: true,
      keyboard: true
    });
    $('#newEntryButton').click(function () {
        var entry = {
          Type: "Entry",
          Category: "Funding",
          DateTime: new Date(),
          Person: "John Smith",
          Notes: $("#textarea").val()
        };

        feed.addEntryToStart(entry);
        $("#textarea").val("");
        $('#newEntryModal').modal('hide');
    });
    
    var options = '<option value="Choose Category">Choose Category</option>';
    for (var i = 0; i < feed.categories; i++) {
        options += '<option value="' + j[i] + '">' + j[i] + '</option>';
    }
    $('#entryCategory').html(options);
       
});