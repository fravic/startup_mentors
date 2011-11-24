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
          Category: $('#entryCategory').val(),
          DateTime: new Date(),
          Person: "John Smith",
          Notes: $("#textarea").val()
        };

        feed.addEntryToStart(entry);
        $("#textarea").val("");
        $('#newEntryModal').modal('hide');
    });
    
    console.log(feed);
    console.log(feed.categories);
    
    var options = '';
    for (var i = 0; i < feed.categories.length; i++) {
        options += '<option value="' +  feed.categories[i] + '">' +  feed.categories[i] + '</option>';
    }
    $('#entryCategory').html(options);
       
});