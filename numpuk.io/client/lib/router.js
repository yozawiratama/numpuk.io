Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'page_404',
    yieldTemplates: {
        'tmp_header': {
            to: 'header'
        },
        'tmp_footer': {
            to: 'footer'
        }
    }
});

Router.map(function () {
    this.route('home', {
        path: '/',
        template: 'tmp_landing'
    });
    this.route('about', {
        path: '/about',
        template: 'tmp_about'
    });
    this.route('newtodos', {
        path: '/new',
        template: 'tmp_todo',
        before: function () {
            Session.set(SessionRef.Name.ListUnique, null);
        }
    });
    this.route('signin', {
        path: '/signin',
        template: 'tmp_signin'
    });
    this.route('signup', {
        path: '/signup',
        template: 'tmp_signup'
    });
    this.route('lists', {
        path: '/list',
        template: 'tmp_list',
        after: function () {
            if (Meteor.userId() == null)
                Router.go("/signin");
            else {
                
            }
        },
        data: {
            lists: function () {
                return Lists.find({
                    CreatedBy: Meteor.userId()
                });
            }
        }
    });
    this.route('notes', {
        path: '/notes',
        template: 'tmp_note',
        after: function () {
            if (Meteor.userId() == null)
                Router.go("/signin");
        },
        data: {
            notes: function () {
                return Notes.find({
                    CreatedBy: Meteor.userId()
                });
            } 
        }
    });
    this.route('todos', {
        path: '/:unique',
        template: 'tmp_todo',
        before: function () {
            Session.set(SessionRef.Name.ListUnique, this.params.unique);
        },
        data: {
            ListTitle: function () {
                var list = Lists.findOne({
                    Unique: Session.get(SessionRef.Name.ListUnique)
                });
                if (list) return list.Title;
            },
            ListDesc: function () {
                var list = Lists.findOne({
                    Unique: Session.get(SessionRef.Name.ListUnique)
                });
                if (list) return list.Desc;
            },
            checked_todos: function () {
                var cTodos = Todos.find({
                    ListUnique: Session.get(SessionRef.Name.ListUnique),
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
            },
            unchecked_todos: function () {
                var ucTodos = Todos.find({
                    ListUnique: Session.get(SessionRef.Name.ListUnique),
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
            }
        }
    });

});