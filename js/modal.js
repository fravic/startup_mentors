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
            var i=0;
            html = "<h4>Select up to 10 time slots for meeting:</h4>"
            html += '<table class="times">';
            html += '<tr><th class="info"></th></tr>';
            for (i=9;i<=12;i++){
                html += '<tr><th class="info">'+i+'</th></tr>';
            }
            for (i=1;i<=5;i++){
                html += '<tr><th class="info">'+i+'</th></tr>';
            }
            html += '</table><table class="timepicker"><tr>';
            
            for (i=0;i<5;i++){
                html+= '<td class="info">'+ myDate.getDate() +'</td>'
                myDate.setDate(myDate.getDate()+1);
            }
            
            html += '</tr>';
            
            for (i=1;i<=18;i++){
                html += '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>';
            }
            
            html += '<table class="selections"><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr></table>';
            
            console.log(html);
            // $("#timepicker").html(html);
            $("#timetest").html(html);
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