Template.tmp_note.created = function () {};
Template.tmp_note.rendered = function () {
};
Template.tmp_note.events({
    'keyup #inpNewNote': function (e) {
        var newNote = $('#inpNewNote');
        if (e.which == 13) {
            Meteor.call("AddNewNote", newNote.val(), "", Meteor.userId(), function (err, response) {
                if (err) alert("fail");
            });
            newNote.val("");
        }
    },
    'click .list-group-item': function (e) {
        e.preventDefault();
        var list = $(this)[0];
        //        Router.go("todos", {unique:list.Unique});
    },

});