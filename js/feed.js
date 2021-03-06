//
// Startup Mentors
// feed.js
//

function generate_Guid() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

var feed = {
  categories : [
    "Contact",
    "Employees",
    "Founders",
    "Funding",
    "Revenue",
    "Other"
  ],
  entries : [
    {
      Type: "Milestone",
      Category: "Funding",
      DateTime: new Date(2011, 11, 20, 12, 39, 00, 00),
      
      Person: "John Smith",
      From : "$1,000,000",
      To : "$1,500,000",
      Comments : ["New Funding from Peter Thiel and Bessimer Partners"]
    },
    {
      Type: "Journal",
      Category: "Funding",
      DateTime: new Date(2011, 11, 20, 11, 12, 00, 00),
      
      Person: "John Smith",
      When : new Date(2011, 11, 20, 10, 24, 00, 00),
      Notes : "Talked about meeting with SV VCs.",
      Comments : [
        "Oh yeah, also discussed possible government funding."
      ]        
    },
    {
      Type: "Entry",
      Category: "Funding",
      DateTime: new Date(2011, 11, 19, 15, 44, 00, 00),
      
      Person: "John Smith",
      Notes : "We need to start looking for more funding.",
      Comments : []
    },
    {
      Type: "Milestone",
      Category: "Employee Hires",
      DateTime: new Date(2011, 11, 15, 12, 32, 00, 00),
      
      Person: "Jayne Smith",
      From : "3",
      To : "4",
      Comments : ["Hired new front end UX designer, Fravic Fernando"]
    },
    {
      Type: "Journal",
      Category: "Ecosystem Leveraging",
      DateTime: new Date(2011, 11, 20, 11, 12, 00, 00),
      
      Person: "John Smith",
      When : new Date(2011, 11, 20, 10, 24, 00, 00),
      Notes : "Talked about ecosystem strategy to monetize local-geo-coupon-social photos with hipster filters",
      Comments : [
        "This was so much fun!", "I looooove leveraging our ecosystem"
      ]        
    },
    {
      Type: "Entry",
      Category: "Shit Fans",
      DateTime: new Date(2011, 11, 19, 15, 44, 00, 00),
      
      Person: "John Smith",
      Notes : "Fan just hit the shit!",
      Comments : []
    }
  ],
  
  entryForGuid : function(Guid) {
    for (i = 0; i < feed.entries.length; i++) {
      if (this.entries[i].Guid == Guid) {
        return this.entries[i];
      }
    }
    return null;
  },
  
  end : 0,
  
  addEntryToStart : function(entry) {
    entry.Guid = generate_Guid();
    entry.Comments = [];
    
    this.entries.unshift(entry);
    $("#feed-list").prepend(this.generateEntry(0));
  },
  
  addEntryToEnd : function(entry) {
    entry.Guid = generate_Guid();
    entry.Comments = [];
    
    this.entries.push(entry);
    $("#feed-list").append(this.generateEntry(feed.entries.length - 1));
  },
  
  showMoreEntries : function(n) {
    for (i = 0; (i < n) && (this.end + i < feed.entries.length); i++) {
      $("#feed-list").append(this.generateEntry(this.end + i));
    }
    this.end += n + 1;
    if (this.end > feed.entries.length) {
      $('#feed-show-more').hide();
      this.end = feed.entries.length;
    }
  },
  
  generateEntry : function(i) {
    var li = document.createElement("li");
    li.setAttribute('class', 'feed-item well');
    
    var name = document.createElement("div");
    name.setAttribute('class', 'feed-item-name');
    
    var date = document.createElement("div");
    date.setAttribute('class', 'feed-item-date');
    
    li.appendChild(name);
    li.appendChild(date);
      $(li).addClass("category" + this.entries[i].Category);
    
    date.innerHTML = this.entries[i].DateTime.dateFormat("H:i m/d/Y");
    
    if (this.entries[i].Type == "Milestone") {
      name.innerHTML = "<b>" + this.entries[i].Person + "</b> changed <b>" + this.entries[i].Category + "</b> from <b>" + this.entries[i].From + "</b> to <b>" + this.entries[i].To + "</b>.";
    }
    else if (this.entries[i].Type == "Journal") {
      name.innerHTML = "<b>" + this.entries[i].Person + "</b> added notes for <b>" + this.entries[i].Category + "</b> meeting on <b>" + this.entries[i].When.dateFormat("m/d/Y") + "</b> at <b>" + this.entries[i].When.dateFormat("H:i") + "</b>:";
      
      var contents = document.createElement("div");
      contents.setAttribute('class', 'feed-item-contents');
      
      li.appendChild(contents);
      
      contents.innerHTML = this.entries[i].Notes;
    }
    else if (this.entries[i].Type == "Entry") {
      name.innerHTML = "<b>" + this.entries[i].Person + "</b> added notes for <b>" + this.entries[i].Category + "</b>:";
      
      var contents = document.createElement("div");
      contents.setAttribute('class', 'feed-item-contents');
      
      li.appendChild(contents);
      
      contents.innerHTML = this.entries[i].Notes;
    }

      var comments = $("#commentsTpl").clone();
      comments.attr("id", "comments" + this.entries[i].Guid);
      $(li).append(comments);

      var commentBtn = $("#commentBtnTpl").clone();
      commentBtn.attr("id", "commentBtn" + this.entries[i].Guid);
      $("A", commentBtn).attr("href", "javascript:feed.addComment(\'" + this.entries[i].Guid + "\');");
      $(".commentTextInput", commentBtn).data("idx", this.entries[i].Guid);
      $(li).append(commentBtn);
      
    for (j = 0; j < this.entries[i].Comments.length; j++) {
      var commentTxt, newComment, speakerDiv;
      
      commentTxt = this.entries[i].Comments[j];
      
      newComment = $("<div class=\"feed-comment\">");
      speakerDiv = $("<div>");
      speakerDiv.html("<b>John Smith</b> commented:");
      newComment.addClass("comment");
      newComment.append(speakerDiv);
      newComment.append(commentTxt);
      
      comments.append(newComment);
    }
    
    return li;
  },

    addComment : function(Guid) {
        var btn, commentTxt, comments, newComment, speakerDiv;

        btn = $("#commentBtn" + Guid);
        commentTxt = $("input", btn).val();
        
        var entry = this.entryForGuid(Guid);
        entry.Comments.push(commentTxt);

        newComment = $("<div class=\"feed-comment\">");
        speakerDiv = $("<div>");
        speakerDiv.html("<b>John Smith</b> commented:");
        newComment.addClass("comment");
        newComment.append(speakerDiv);
        newComment.append(commentTxt);

        comments = $("#comments" + Guid);
        comments.append(newComment);

        $("input", btn).val("");
    }
};

$(document).ready(function() {
  $('#feed').append("<ul id='feed-list'></ul>");
  for (i = 0; i < feed.entries.length; i++) {
    feed.entries[i].Guid = generate_Guid();
    if (i < 5) {
      $("#feed-list").append(feed.generateEntry(i));
      this.end++;
    }
  }
  if (feed.entries.length < 6) {
    $('#feed-show-more').hide();
  }
    for (i = 0; i < feed.categories.length; i++) {
        var newOption = $("<option>");
        newOption.attr("value", feed.categories[i]);
        newOption.html(feed.categories[i]);
        $("select[name='filter']").append(newOption);
    }

    $("select[name='filter']").change(function() {
        var val = $(this).val();
        $.each(feed.categories, function(idx, category) {
            if (category != val && val != "none") {
                $(".category" + category).hide();
            } else {
                $(".category" + category).show();
            }
        });
    });

    $(".commentTextInput").keypress(function(e){
        if (e.which == 13){
            feed.addComment($(this).data("idx"));
        }
    });

});