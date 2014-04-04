Template.tmp_header.created = function () {};
Template.tmp_header.rendered = function () {};
Template.tmp_header.mobile = function () {
    return detectmob();
};

Template.tmp_header.email = function () {
    if (Meteor.user())
        return Meteor.user().emails[0].address;
};

Template.tmp_header.loggedin = function () {
    if (Meteor.userId() == null) return false;
    else return true;
};
Template.tmp_header.events({
    'click #hplSignout': function (e) {
        e.preventDefault();
        Router.go("/");
        Meteor.logout(function (err) {});
    }
});