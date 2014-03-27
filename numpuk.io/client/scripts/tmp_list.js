Template.tmp_list.created = function () {};
Template.tmp_list.rendered = function () {
    $('#liLists').addClass('active');
};
Template.tmp_list.events({
    'keyup #inpNewList': function (e) {
        var newList = $('#inpNewList').val();
        if (e.which == 13) {
            Meteor.call("CreateUnique", 'list', Meteor.userId(), function (err, res) {
                if (err) {} else {
                    Meteor.call("AddNewList", res, newList, "", Meteor.userId(), function (err, response) {
                        if (err) alert("fail");
                    });
                }

            });
//            Meteor.call("AddNewList", newList.val(), "", Meteor.userId(), function (err, response) {
//                if (err) alert("fail");
//            });
            newList.val("");
        }
    },
    'click .list-group-item': function (e) {
        e.preventDefault();
        var list = $(this)[0];
        //        console.log(list);
        Router.go("todoornote", {
            unique: list.Unique
        });
    },

});