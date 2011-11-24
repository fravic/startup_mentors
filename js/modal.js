function showTimePicker(date) {
   $("#time-picker").show();
   $(".timepicker th").each(function(index) {
     $(this).text(date.getDate() + index);
   });
    $(".timepicker td").each(function(index) {
      var day = index % 7;
      var minutes = 9 * 60 + 30 * Math.floor(index / 7);
      var myDate = new Date(date);
      myDate.setDate(date.getDate() + day);
      myDate.setMinutes(date.getMinutes() + minutes);
      $(this).attr("date", myDate);
    });  
}

$(function(){
    $(".selections td").addClass("unused");
    $("#time-picker").hide();
    $(".timepicker td").not(".info").click(function () {
       $(this).toggleClass("blackify");
       $(".unused").first().removeClass("unused").text($(this).attr("date").toString());
    });
    
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
                showTimePicker(myDate);
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