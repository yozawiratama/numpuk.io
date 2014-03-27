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
        Meteor.call("CreateUnique", 'note', Meteor.userId(), function (err, res) {
            if (err) {} else {
                console.log(res);
                Meteor.call("AddNewNote", res, title, content, share, edit, Meteor.userId(), function (err, response) {
                    if (err)console.log(err);
                });
            }

        });

    }
});