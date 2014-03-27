Template.tmp_todo.created = function () {};
Template.tmp_todo.rendered = function () {};

Template.tmp_todo.events({
    'keyup #inpNewTodo': function (e) {
        var newTodo = $('#inpNewTodo');
        if (e.which == 13) {
            var cId = Meteor.userId();
            if (Meteor.userId() == null) cId = "Anonymous";
            Session.set("newtodoval", newTodo.val());
            if (Session.equals(SessionRef.Name.ListUnique, null)) {
                Meteor.call("AddNewList", new Date().toDateString(), "", cId, function (err, response) {
                    if (err) alert("fail");
                    else {
                        Session.set(SessionRef.Name.ListUnique, response);
                        Meteor.call("AddNewTodo", Session.get("newtodoval"), response, "", cId, function (err, response) {
                            if (err) alert("fail"); {
                                Router.go("/" + Session.get(SessionRef.Name.ListUnique));
                            }
                        });
                    }
                });

            } else {
                Meteor.call("AddNewTodo", newTodo.val(), Session.get(SessionRef.Name.ListUnique), "", cId, function (err, response) {
                    if (err) alert("fail");
                });
            }
            newTodo.val("");
        }
    },
    'click .list-group-item': function (e) {
        e.preventDefault();
        var list = $(this[0]);
    },
    'change input[type=checkbox]': function (e) {
        e.preventDefault();
        var cbxId = "cbx" + $(this)[0]._id;
        var isChecked = $("#" + cbxId).is(':checked');
        console.log(cbxId);
        console.log(isChecked);
        Meteor.call("ChangeTodoCheck", $(this)[0]._id, isChecked, function (err, response) {
            if (err) alert("fail");
        });
    },
    'click .delete': function (e) {
        e.preventDefault();
        Meteor.call("DeleteTodo", $(this)[0]._id, function (err, response) {
            if (err) alert("fail");
        });
    }

});