Template.tmp_app_layout.loggedin = function () {
    if (Meteor.user()) return true;
};
Template.tmp_app_layout.list_notes = function () {
    if (Meteor.user()) {
        return Notes.find({
            CreatedBy: Meteor.userId()
        });
    } else {
        return Notes.find();
    }
};
Template.tmp_app_layout.list_todolists = function () {
    if (Meteor.user()) {
        return TodoLists.find({
            CreatedBy: Meteor.userId()
        });
    } else {
        return TodoLists.find();
    }
};

Template.tmp_app_layout.userPhoto = function () {
    if (Meteor.userId()) return '/user_default.png';
    else return '/user_public.png';
};
Template.tmp_app_layout.notesOrHome = function () {
    if (Session.equals("AppPage", "Home") || Session.equals("AppPage", "Notes") || Session.equals("AppPage", "SignIn") || Session.equals("AppPage", "SignUp")) return true;
};
Template.tmp_app_layout.isNotesActive = function () {
    if (Session.equals("AppPage", "Home") || Session.equals("AppPage", "Notes")) return "active";
};
Template.tmp_app_layout.profile = function () {
    if (Session.equals("AppPage", "Profile")) return true;
};
Template.tmp_app_layout.isProfileActive = function () {
    if (Session.equals("AppPage", "Profile")) return "active";
};
Template.tmp_app_layout.todolist = function () {
    if (Session.equals("AppPage", "Todos")) return true;
};
Template.tmp_app_layout.isTodosActive = function () {
    if (Session.equals("AppPage", "Todos")) return "active";
};
Template.tmp_app_layout.isSignInActive = function () {
    if (Session.equals("AppPage", "SignIn")) return "active";
};
Template.tmp_app_layout.isSignUpActive = function () {
    if (Session.equals("AppPage", "SignUp")) return "active";
};

Template.tmp_app_layout.events({
    'click #hplSignOut': function (e) {
        Meteor.logout(function (err) {});
    }
});




Template.tmp_app_todo.ListTitle = function () {
    var list = TodoLists.findOne({
        Unique: Session.get(SessionRef.Name.TodoListUnique)
    });
    console.log(Session.get(SessionRef.Name.TodoListUnique));
    console.log(list);
    if (list) return list.Title;
};
Template.tmp_app_todo.ListDesc = function () {
    var list = TodoLists.findOne({
        Unique: Session.get(SessionRef.Name.TodoListUnique)
    });
    if (list) return list.Desc;
};
Template.tmp_app_todo.isPrivate = function () {
    var list = TodoLists.findOne({
        Unique: Session.get(SessionRef.Name.TodoListUnique)
    });
    if (list) {
        if (list.isPrivate)
            return "Private";
        else return "Public";
    }
};

Template.tmp_app_todo.unchecked_todos = function () {
    var ucTodos = Todos.find({
        ListUnique: Session.get(SessionRef.Name.TodoListUnique),
        IsDeleted: false,
        Checked: false
    }).fetch();
    var res = new Array();
    for (var ii = 0; ii < ucTodos.length; ii++) {
        res[ii] = {
            _id: ucTodos[ii]._id,
            Title: ucTodos[ii].Title,
            Desc: ucTodos[ii].Desc
        }
    }
    return res;
};
Template.tmp_app_todo.checked_todos = function () {
    var cTodos = Todos.find({
        ListUnique: Session.get(SessionRef.Name.TodoListUnique),
        IsDeleted: false,
        Checked: true
    }).fetch();
    var res = new Array();
    for (var ii = 0; ii < cTodos.length; ii++) {
        res[ii] = {
            _id: cTodos[ii]._id,
            Title: cTodos[ii].Title,
            Desc: cTodos[ii].Desc
        }
    }
    return res;
};

Template.tmp_app_todo.rendered = function () {
    var cId = Meteor.userId();
    if (Meteor.userId() == null) cId = "Anonymous";
    $.fn.editable.defaults.mode = 'inline';
    $('#todoTitle').editable({
        emptytext: "Title"
    });
    $('#todoDesc').editable({
        emptytext: "Description"
    });
    $('#inpPrivate').editable({
        source: [
            {
                value: true,
                text: 'Private'
            },
            {
                value: false,
                text: 'Public'
            }
           ]
    });

    $('#todoTitle').on('save', function (e, params) {
        if (Session.equals(SessionRef.Name.TodoListUnique, null)) {
            Meteor.call("AddNewTodoListByTitle", params.newValue, cId, function (err, response) {
                if (err) alert("fail create todo list");
                else {
                    Router.go('/app/todos/' + response);
                }
            });

        } else {
            Meteor.call("SetTodoListByTitle", Session.get(SessionRef.Name.TodoListUnique), params.newValue, cId, function (err, response) {
                if (err) alert("fail create todo");
            });
        }
    });
    $('#todoDesc').on('save', function (e, params) {
        if (Session.equals(SessionRef.Name.TodoListUnique, null)) {
            Meteor.call("AddNewTodoListByDesc", params.newValue, cId, function (err, response) {
                if (err) alert("fail create todo list");
                else {
                    Router.go('/app/todos/' + response);
                }
            });

        } else {
            Meteor.call("AddNewTodo", newTodo.val(), Session.get(SessionRef.Name.TodoListUnique), "", cId, function (err, response) {
                if (err) alert("fail create todo");
            });
        }
    });
    $('#inpPrivate').on('save', function (e, params) {
        if (Session.equals(SessionRef.Name.TodoListUnique, null)) {
            Meteor.call("AddNewTodoListByPrivate", params.newValue, cId, function (err, response) {
                if (err) alert("fail create todo list");
                else {
                    Router.go('/app/todos/' + response);

                }
            });

        } else {
            Meteor.call("AddNewTodo", newTodo.val(), Session.get(SessionRef.Name.TodoListUnique), "", cId, function (err, response) {
                if (err) alert("fail create todo");
            });
        }
    });
};

Template.tmp_app_todo.events({
    'keyup #inpNewTodo': function (e) {
        var newTodo = $('#inpNewTodo');
        if (e.which == 13) {
            console.log("masuk enter");
            console.log(newTodo.val());

            var cId = Meteor.userId();
            if (Meteor.userId() == null) cId = "Anonymous";
            Session.set("newtodoval", newTodo.val());
            if (Session.equals(SessionRef.Name.TodoListUnique, null)) {
                console.log("masuk disini");
                Meteor.call("AddNewTodoListByTodo", new Date().toDateString(), cId, function (err, response) {
                    if (err) alert("fail create todo list");
                    else {
                        console.log("berhasil buat todlist : " + response);
                        Session.set(SessionRef.Name.TodoListUnique, response);
                        Meteor.call("AddNewTodo", Session.get("newtodoval"), response, "", cId, function (err, response) {
                            if (err) alert("fail create todo after list"); {
                                Router.go('/app/todos/' + Session.get(SessionRef.Name.TodoListUnique));
                            }
                        });
                    }
                });

            } else {
                Meteor.call("AddNewTodo", newTodo.val(), Session.get(SessionRef.Name.TodoListUnique), "", cId, function (err, response) {
                    if (err) alert("fail create todo");
                });
            }
            newTodo.val("");
        }
    }
});