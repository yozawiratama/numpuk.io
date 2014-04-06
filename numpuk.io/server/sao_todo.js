Meteor.methods({
    AddNewTodoListByTitle: function (title, userid) {
        var uni = GenerateUnique();
        var list = TodoLists.insert({
            Title: title,
            Unique: uni,
            Desc: "",
            IsPrivate: false,
            IsEditable: true,
            CreatedBy: userid,
            CreatedAt: new Date(),
            LastModifiedBy: userid,
            LastModifiedAt: new Date(),
        });
        if (list) return uni;
        else return false;
    },
    AddNewTodoListByDesc: function (desc, userid) {
        var uni = GenerateUnique();
        var list = TodoLists.insert({
            Title: "",
            Unique: uni,
            Desc: desc,
            IsPrivate: false,
            IsEditable: true,
            CreatedBy: userid,
            CreatedAt: new Date(),
            LastModifiedBy: userid,
            LastModifiedAt: new Date(),
        });
        if (list) return uni;
        else return false;
    },
    AddNewTodoListByPrivate: function (isprivate, userid) {
        var uni = GenerateUnique();
        var list = TodoLists.insert({
            Title: "",
            Unique: uni,
            Desc: "",
            IsPrivate: isprivate,
            IsEditable: true,
            CreatedBy: userid,
            CreatedAt: new Date(),
            LastModifiedBy: userid,
            LastModifiedAt: new Date(),
        });
        if (list) return uni;
        else return false;
    },
    AddNewTodoListByTodo: function (title, userid) {
        var uni = GenerateUnique();
        var list = TodoLists.insert({
            Title: title,
            Unique: uni,
            Desc: "",
            IsPrivate: false,
            IsEditable: true,
            CreatedBy: userid,
            CreatedAt: new Date(),
            LastModifiedBy: userid,
            LastModifiedAt: new Date(),
        });
        if (list) return uni;
        else return false;
    },

    SetTodoListByTitle: function (unique, title, userid) {
        console.log(title);
        TodoLists.update({
            Unique: unique
        }, {
            $set: {
                Title: title,
                LastModifiedBy: userid,
                LastModifiedAt: new Date()
            }
        });
    }
});