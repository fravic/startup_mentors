function _Profile() {
    var self = this;
    var _tempFounders = ["John Smith", "Simon Oliver"];

    this.founders = ["John Smith", "Simon Oliver"];
    this.contact = "contactus@startupy.com";
    this.employees = 2;
    this.revenue = "$100,000/year";
    this.funding = "$1,500,000";

    this.editProfile = function () {
        $(".profileHidden").show();
        $(".profileField").hide();
    }

    this.finishEditing = function (save) {
        $(".profileHidden").hide();
        $(".profileField").show();

        if (save) {            
            if (this.founders.toString() != _tempFounders.toString()) {
              var entry = {
                  Type: "Milestone",
                  Category: "Founders",
                  DateTime: new Date(),
                  
                  Person: "John Smith",
                  From : this.founders.length,
                  To : _tempFounders.length
              };
              feed.addEntryToStart(entry);
              this.founders = _tempFounders.slice(0);
            }
            if (self.contact != $("#profileHiddenContact").val()) {
              var entry = {
                  Type: "Milestone",
                  Category: "Contact",
                  DateTime: new Date(),
                  
                  Person: "John Smith",
                  From : self.contact,
                  To : $("#profileHiddenContact").val()
              };
              feed.addEntryToStart(entry);
              self.contact = $("#profileHiddenContact").val();
            }
            if (self.employees != $("#profileHiddenEmployees").val()) {
              var entry = {
                  Type: "Milestone",
                  Category: "Employees",
                  DateTime: new Date(),
                  
                  Person: "John Smith",
                  From : self.employees,
                  To : $("#profileHiddenEmployees").val()
              };
              feed.addEntryToStart(entry);
              self.employees = $("#profileHiddenEmployees").val();
            }
            if (self.revenue != $("#profileHiddenRevenue").val()) {
              var entry = {
                  Type: "Milestone",
                  Category: "Revenue",
                  DateTime: new Date(),
                  
                  Person: "John Smith",
                  From : self.revenue,
                  To : $("#profileHiddenRevenue").val()
              };
              feed.addEntryToStart(entry);
              self.revenue = $("#profileHiddenRevenue").val();
            }
            if (self.funding != $("#profileHiddenFunding").val()) {
              var entry = {
                  Type: "Milestone",
                  Category: "Funding",
                  DateTime: new Date(),
                  
                  Person: "John Smith",
                  From : self.funding,
                  To : $("#profileHiddenFunding").val()
              };
              feed.addEntryToStart(entry);
              self.funding = $("#profileHiddenFunding").val();
            }
        } else {
            _tempFounders = this.founders.slice(0);
        }

        updateFields();
    }

    this.addFounder = function () {
        _tempFounders.push($("#profileHiddenFounder").val());
        $("#profileHiddenFounder").val("");

        updateFounders();
    }

    function updateFounders() {
        var newLi, newA;

        $("#profileFieldFounders").empty();
        for (var i = 0; i < _tempFounders.length; i++) {
            newLi = $("<li />");
            newA = $("<a href='#' />");
            newLi.append(newA);
            newA.html(_tempFounders[i]);
            $("#profileFieldFounders").append(newLi);
            $("#profileHiddenFounders").html();
        }
    }

    function updateFields() {
        updateFounders();

        $("#profileFieldContact").html("<a href=\"mailto:" + self.contact + "\">" + self.contact + "</a>");
        $("#profileFieldEmployees").html(self.employees);
        $("#profileFieldRevenue").html(self.revenue);
        $("#profileFieldFunding").html(self.funding);
    }

    $(document).ready(updateFields);
}

var Profile = new _Profile();