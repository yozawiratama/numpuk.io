Meteor.methods({
    AddNewList: function (uni, title, desc, userid) {
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
    AddNewNote: function (uni, title, content, share, edit, userid) {
        console.log(uni);
        var note = Notes.insert({
            Title: title,
            Unique: uni,
            Content: content,
            IsPrivate : share,
            IsEditable : edit,
            CreatedBy: userid,
            CreatedAt: new Date(),
            LastModifiedBy: userid,
            LastModifiedAt: new Date(),
        });
        if (note) return uni;
        else return false;
    },
    CreateUnique: function (type, userid) {
        var uni = GenerateUnique();
        var ut = UniqueType.insert({
            Unique : uni,
            Type : type,
            CreatedBy: userid,
            CreatedAt: new Date(),
            LastModifiedBy: userid,
            LastModifiedAt: new Date(),
        });
        if (ut) return uni;
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