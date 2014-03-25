Meteor.methods({
    AddNewList: function (title, desc, userid) {
        var uni = GenerateUnique();
        var list = Lists.insert({
            Title: title,
            Unique: uni,
            Desc: desc,
            IsPrivate : false,
            IsEditable : true,
            CreatedBy: userid,
            CreatedAt: new Date(),
            LastModifiedBy: userid,
            LastModifiedAt: new Date(),
        });
        if (list) return uni;
        else return false;
    },
    AddNewNote: function (title, desc, userid) {
        var uni = GenerateUnique();
        var note = Notes.insert({
            Title: title,
            Unique: uni,
            Desc: desc,
            IsPrivate : false,
            IsEditable : true,
            CreatedBy: userid,
            CreatedAt: new Date(),
            LastModifiedBy: userid,
            LastModifiedAt: new Date(),
        });
        if (note) return uni;
        else return false;
    },
    AddNewTodo: function (title, listunique, desc, userid) {
        var todo = Todos.insert({
            Title: title,
            ListUnique: listunique,
            Desc: desc,
            Checked: false,
            CreatedBy: userid,
            CreatedAt: new Date(),
            LastModifiedBy: userid,
            LastModifiedAt: new Date(),
            IsDeleted: false
        });
        return todo;
    },
    DeleteTodo: function (todoId) {
        Todos.update({
            _id: todoId
        }, {
            $set: {
                IsDeleted: true
            }
        });
    },
    ChangeTodoCheck: function (todoId, isChecked) {
        Todos.update({
            _id: todoId
        }, {
            $set: {
                Checked: isChecked
            }
        });
    }
});