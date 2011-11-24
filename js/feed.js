//
// Startup Mentors
// feed.js
//

var feed = {
  entries : [
    {
      Type: "Milestone",
      Category: "Funding",
      DateTime: new Date(2011, 11, 20, 12, 39, 00, 00),
      
      Person: "John Smith",
      From : "$1,000,000",
      To : "$1,500,000",
    },
    {
      Type: "Journal",
      Category: "Funding",
      DateTime: new Date(2011, 11, 20, 11, 12, 00, 00),
      
      Person: "John Smith",
      When : new Date(2011, 11, 20, 10, 24, 00, 00),
      Notes : "Talked about awesome stuff."
    },
    {
      Type: "Entry",
      Category: "Funding",
      DateTime: new Date(2011, 11, 19, 15, 44, 00, 00),
      
      Person: "John Smith",
      Notes : "Fund all the things!"
    }
  ],
  
  end : 0,
  
  addEntryToStart : function(entry) {
    this.entries.unshift(entry);
    $("#feed-list").prepend(this.generateEntry(0));
  },
  
  addEntryToEnd : function(entry) {
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
    
    return li;
  }
};

$(document).ready(function() {
  $('#feed').append("<ul id='feed-list'></ul>");
  for (i = 0; (i < feed.entries.length) && (i < 5); i++) {
    $("#feed-list").append(feed.generateEntry(i));
    this.end++;
  }
  if (feed.entries.length < 6) {
    $('#feed-show-more').hide();
  }
});