listhandle = null;
notehandle = null;
todohandle = null;

Deps.autorun(function () {
    var user_id = Meteor.userId();
    var unique = Session.get(SessionRef.Name.ListUnique);
    listhandle = Meteor.subscribe('list', user_id, unique);
    notehandle = Meteor.subscribe('note', user_id, unique);
    todohandle = Meteor.subscribe('todo', unique);


});