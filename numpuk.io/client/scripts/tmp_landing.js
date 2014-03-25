Template.tmp_landing.created = function () {};
Template.tmp_landing.rendered = function () {};
Template.tmp_landing.events({
    'click #btnNewTodo': function (e) {
        e.preventDefault();
        Router.go("/new");
    }
});