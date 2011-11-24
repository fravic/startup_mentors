$(function(){
    
   	$('#datepicker').datepicker({
		changeMonth: true,
		changeYear: true,
		firstDay: 1,
		onSelect: function(dateText, inst) {
		    var d = dateText.split("/");
		    var myDate=new Date();
		    myDate.setFullYear(d[2],d[0]-1,d[1]);
		    var day = myDate.getDay();
            if( day !== 1 )                // Only manipulate the date if it isn't Mon.
                myDate.setHours(-24 * (day - 1));   // Set the hours to day number minus 1
            
	    }
	});
	
	$( "#datepicker" ).datepicker().click(function(event) {
        // highlight the TR
        $(".ui-datepicker-current-day").parent().addClass('highlight');
        // highlight the TD > A
        $(".ui-datepicker-current-day").siblings().find('a').addClass('white');
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
        
    var options = '';
    for (var i = 0; i < feed.categories.length; i++) {
        options += '<option value="' +  feed.categories[i] + '">' +  feed.categories[i] + '</option>';
    }
    $('#entryCategory').html(options);
       
});