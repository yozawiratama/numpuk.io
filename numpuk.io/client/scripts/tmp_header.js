Template.tmp_header.created = function () {};
Template.tmp_header.rendered = function () {};
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