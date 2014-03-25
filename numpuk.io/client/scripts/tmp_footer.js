Template.tmp_footer.created = function () {};
Template.tmp_footer.rendered = function () {};
Template.tmp_footer.events({
    'click #hplAbout': function (e) {
        e.preventDefault();
        Router.navigate("/about", true);
    }
});