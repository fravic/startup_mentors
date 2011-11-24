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
            this.founders = _tempFounders;

            self.contact = $("#profileHiddenContact").val();
            self.employees = $("#profileHiddenEmployees").val();
            self.revenue = $("#profileHiddenRevenue").val();
            self.funding = $("#profileHiddenFunding").val();
        } else {
            _tempFounders = this.founders;
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

        $("#profileFieldContact").html(self.contact);
        $("#profileFieldEmployees").html(self.employees);
        $("#profileFieldRevenue").html(self.revenue);
        $("#profileFieldFunding").html(self.funding);

        console.log($("#profileFieldContact").html(), this.contact);
    }

    $(document).ready(updateFields);
}

var Profile = new _Profile();