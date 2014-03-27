Template.tmp_note_editor.rendered = function () {

    $('#shareable').bootstrapSwitch();
    $('#editable').bootstrapSwitch();
};
Template.tmp_note_editor.events({
    'submit': function (e) {
        e.preventDefault();
        var title = $('#title').val();
        var content = $('#content').val();
        var share = $('#shareable').bootstrapSwitch('state');
        var edit = $('#editable').bootstrapSwitch('state');
        console.log(content);
        if (Session.equals(SessionRef.Name.NoteUnique, null)) {
            console.log("masuk");
            Meteor.call("AddNewNote", title, content, share, edit, Meteor.userId(), function (err, response) {
                if (err) console.log(err);
                else {
                    console.log(response);
                    Router.go("/note/"+response);
                }
            });
        } else {
            Meteor.call("AddNewNote", title, content, share, edit, Meteor.userId(), function (err, response) {
                if (err) console.log(err);
                else {
                    Router.go("/notes");
                }
            });
        }
    }




});