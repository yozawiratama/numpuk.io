listhandle = null;
notehandle = null;
todohandle = null;

Deps.autorun(function () {
    var user_id = Meteor.userId();
    var listunique = Session.get(SessionRef.Name.ListUnique);
    var noteunique = Session.get(SessionRef.Name.NoteUnique);
    listhandle = Meteor.subscribe('list', user_id, listunique);
    notehandle = Meteor.subscribe('note', user_id, noteunique);
    todohandle = Meteor.subscribe('todo', listunique);


});