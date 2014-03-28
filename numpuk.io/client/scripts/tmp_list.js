Template.tmp_list.created = function () {};
Template.tmp_list.rendered = function () {
};
Template.tmp_list.events({
    'keyup #inpNewList': function (e) {
        var newList = $('#inpNewList');
        if (e.which == 13) {
            
            Meteor.call("AddNewList", newList.val(), "", Meteor.userId(), function (err, response) {
                if (err) alert("fail");
            });
            newList.val("");
        }
    },
    'click .list-group-item': function (e) {
        e.preventDefault();
        var list = $(this)[0];
        //        console.log(list);
        Router.go("todos", {
            unique: list.Unique
        });
    },

});