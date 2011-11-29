function showTimePicker(date) {
    $("#time-picker").show();
    $("#datepicker").hide();
    $(".timepicker th").not(":first").each(function(index) {
        var d = new Date(date);
        d.setDate(date.getDate() + index)
        $(this).text(d.dateFormat("m/d"));
    });

    $(".timepicker td").not(".info").each(function(index) {
      $(this).css("width", "300px");
      var day = index % 7;
      var minutes = 9 * 60 + 30 * Math.floor(index / 7);
      var myDate = new Date(date);
      myDate.setDate(date.getDate() + day);
      myDate.setMinutes(minutes);
      $(this).attr("date", myDate);
    });  
}


var dates = [];

$(function(){
    $("#time-picker").hide();
    $(".timepicker td").not(".info").click(function () {
       $(this).toggleClass("blackify");

       var date = $(this).attr("date");
       if(_(dates).include(date)) {
           dates = _(dates).without(date);
       } else {
           dates.push($(this).attr("date"));
       }

       var list = document.createElement("ul");
       for (j = 0; j < dates.length; j++) {
         var datetime = document.createElement("li");
         datetime.innerHTML = "<b>" + (new Date(dates[j])).dateFormat("m/d/Y H:i") + "</b>";
         list.appendChild(datetime);
       }
       $(".selections").html(list);
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
            $("#newRequestButton").removeClass("disabled");
            }
    });
    
    $( "#backToDate" ).click(function(){
        $("#datepicker").show();
        $("#time-picker").hide();
        $(".selections").html("");
        $(".timepicker td").removeClass("blackify");
        $("#newRequestButton").addClass("disabled");
        dates = [];
    })
    
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
    
    // when Request Modal Dialog closes...
    // reset the content
    $("#newRequestModal").bind('hidden', function () {
        $("#datepicker").show();
        $("#time-picker").hide();
        $(".selections").html("");
        $(".timepicker td").removeClass("blackify");
        $('#datepicker').datepicker('setDate', null);
        $("#newRequestButton").addClass('disabled');
        dates = [];
        
    })
    
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
        return false;
    });

    $('#newRequestButton').click(function () {
        if (!$(this).hasClass('disabled')){
            var request = {
              Type: "Request",
              Category: $('#meetingCategory').val(),
              DateTime: new Date(2011, 11, 17, 9, 26, 00, 00),

              Person: "John Smith",
              When : _(dates).map(function(d){return new Date(d);}).sort(function(d1, d2) {return (d1 > d2) ? 1 : -1}),
            };


            feed.addEntryToStart(request);
            $("#textarea").val("");
            $('#newRequestModal').modal('hide');
        }
        return false;
    });

        
    var options = '';
    for (var i = 0; i < feed.categories.length; i++) {
        options += '<option value="' +  feed.categories[i] + '">' +  feed.categories[i] + '</option>';
    }
    $('#entryCategory').html(options);
    $('#meetingCategory').html(options);
       
});