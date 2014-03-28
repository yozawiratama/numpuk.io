Template.tmp_note_editor.events({
    'submit': function (e) {
        e.preventDefault();
        var title = $('#title').val();
        var content = $('#content').val();
        var share = true;
        var edit = false;
        var createdby = Meteor.userId();
        if(createdby == null) createdby = "Anonymous";
        if (Session.equals(SessionRef.Name.NoteUnique, null)) {
            Meteor.call("AddNewNote", title, content, share, edit, createdby, function (err, response) {
                if (err) console.log(err);
                else {
                    console.log(response);
                    Router.go("/note/"+response);
                }
            });
        } else {
            Meteor.call("AddNewNote", title, content, share, edit, createdby, function (err, response) {
                if (err) console.log(err);
                else {
                    Router.go("/notes");
                }
            });
        }
    }




});