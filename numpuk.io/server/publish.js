Meteor.publish('list', function (user_id, unique) {
    if (user_id != null) {
        return Lists.find({
            CreatedBy: user_id
        });
    } else {
        return Lists.find({
            Unique: unique
        });
    }
});
Meteor.publish('note', function (user_id, unique) {
    if (user_id != null) {
        return Notes.find({
            CreatedBy: user_id
        });
    } else {
        return Notes.find({
            Unique: unique
        });
    }
});
Meteor.publish('todo', function (unique) {
    return Todos.find({
        ListUnique: unique
    });
});