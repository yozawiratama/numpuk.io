Router.map(function () {
    this.route('home', {
        path: '/',
        template: 'tmp_landing',
        layoutTemplate: 'main_layout',
        loadingTemplate: 'loading',
        notFoundTemplate: 'page_404',
        yieldTemplates: {
            'tmp_header': {
                to: 'header'
            },
            'tmp_footer': {
                to: 'footer'
            }
        },
        after: function () {
            $('#liSignIn').removeClass('active');
            $('#liSignUp').removeClass('active');
        }
    });
    this.route('about', {
        path: '/about',
        template: 'tmp_about',
        layoutTemplate: 'main_layout',
        loadingTemplate: 'loading',
        notFoundTemplate: 'page_404',
        yieldTemplates: {
            'tmp_header': {
                to: 'header'
            },
            'tmp_footer': {
                to: 'footer'
            }
        },
        after: function () {
            $('#liSignIn').removeClass('active');
            $('#liSignUp').removeClass('active');
        }
    });
    this.route('newtodos', {
        path: '/new',
        template: 'tmp_todo',
        layoutTemplate: 'main_layout',
        loadingTemplate: 'loading',
        notFoundTemplate: 'page_404',
        yieldTemplates: {
            'tmp_header': {
                to: 'header'
            },
            'tmp_footer': {
                to: 'footer'
            }
        },
        before: function () {
            Session.set(SessionRef.Name.ListUnique, null);
        },
        after: function () {
            $('#liSignIn').removeClass('active');
            $('#liSignUp').removeClass('active');
        }
    });
    this.route('newnote', {
        path: '/new/note',
        template: 'tmp_note_editor',
        layoutTemplate: 'main_layout',
        loadingTemplate: 'loading',
        notFoundTemplate: 'page_404',
        yieldTemplates: {
            'tmp_header': {
                to: 'header'
            },
            'tmp_footer': {
                to: 'footer'
            }
        },
        before: function () {
            Session.set(SessionRef.Name.NoteUnique, null);
        },
        after: function () {
            $('#liSignIn').removeClass('active');
            $('#liSignUp').removeClass('active');
        }
    });
    this.route('signin', {
        path: '/signin',
        template: 'tmp_signin',
        layoutTemplate: 'main_layout',
        loadingTemplate: 'loading',
        notFoundTemplate: 'page_404',
        yieldTemplates: {
            'tmp_header': {
                to: 'header'
            },
            'tmp_footer': {
                to: 'footer'
            }
        },

    });
    this.route('signup', {
        path: '/signup',
        template: 'tmp_signup',
        layoutTemplate: 'main_layout',
        loadingTemplate: 'loading',
        notFoundTemplate: 'page_404',
        yieldTemplates: {
            'tmp_header': {
                to: 'header'
            },
            'tmp_footer': {
                to: 'footer'
            }
        },
    });
    this.route('lists', {
        path: '/list',
        template: 'tmp_list',
        layoutTemplate: 'main_layout',
        loadingTemplate: 'loading',
        notFoundTemplate: 'page_404',
        yieldTemplates: {
            'tmp_header': {
                to: 'header'
            },
            'tmp_footer': {
                to: 'footer'
            }
        },
        after: function () {
            $('#liSignIn').removeClass('active');
            $('#liSignUp').removeClass('active');
            if (Meteor.userId() == null)
                Router.go("/signin");
            else {

            }
        },
        data: {
            lists: function () {
                return Lists.find({
                    CreatedBy: Meteor.userId()
                }, {
                    sort: {
                        CreatedAt: -1
                    }
                });
            }
        }
    });
    this.route('notes', {
        path: '/notes',
        template: 'tmp_note',
        layoutTemplate: 'main_layout',
        loadingTemplate: 'loading',
        notFoundTemplate: 'page_404',
        yieldTemplates: {
            'tmp_header': {
                to: 'header'
            },
            'tmp_footer': {
                to: 'footer'
            }
        },
        after: function () {
            $('#liSignIn').removeClass('active');
            $('#liSignUp').removeClass('active');
            if (Meteor.userId() == null)
                Router.go("/signin");
        },
        data: {
            notes: function () {
                return Notes.find({
                    CreatedBy: Meteor.userId()
                }, {
                    sort: {
                        CreatedAt: -1
                    }
                });
            } 
        }
    });
    this.route('notes', {
        path: '/notes/:userid',
        template: 'tmp_note',
        layoutTemplate: 'main_layout',
        loadingTemplate: 'loading',
        notFoundTemplate: 'page_404',
        yieldTemplates: {
            'tmp_header': {
                to: 'header'
            },
            'tmp_footer': {
                to: 'footer'
            }
        },
        after: function () {
            $('#liSignIn').removeClass('active');
            $('#liSignUp').removeClass('active');
            console.log(this.params.userid);
        },
        data: {

        }
    });
    this.route('note_editor_new', {
        path: '/note/editor',
        template: 'tmp_note_editor',
        layoutTemplate: 'main_layout',
        loadingTemplate: 'loading',
        notFoundTemplate: 'page_404',
        yieldTemplates: {
            'tmp_header': {
                to: 'header'
            },
            'tmp_footer': {
                to: 'footer'
            }
        },
        after: function () {
            if (Meteor.userId() == null)
                Router.go("/signin");
        },
        data: {

        }
    });
    this.route('note', {
        path: '/note/:unique',
        template: 'tmp_note',
        layoutTemplate: 'main_layout',
        loadingTemplate: 'loading',
        notFoundTemplate: 'page_404',
        yieldTemplates: {
            'tmp_header': {
                to: 'header'
            },
            'tmp_footer': {
                to: 'footer'
            }
        },
        before: function () {
            Session.set(SessionRef.Name.NoteUnique, this.params.unique);
        },
        after: function () {
            $('#liSignIn').removeClass('active');
            $('#liSignUp').removeClass('active');
        },
        data: {
            notes: function () {
                return Notes.find({
                    Unique: Session.get(SessionRef.Name.NoteUnique)
                }, {
                    sort: {
                        CreatedAt: -1
                    }
                });
            }
        }
    });

    this.route('note_editor_edit', {
        path: '/note/editor/:unique',
        template: 'tmp_note_editor',
        layoutTemplate: 'main_layout',
        loadingTemplate: 'loading',
        notFoundTemplate: 'page_404',
        yieldTemplates: {
            'tmp_header': {
                to: 'header'
            },
            'tmp_footer': {
                to: 'footer'
            }
        },
        after: function () {
            if (Meteor.userId() == null)
                Router.go("/signin");
        },
        data: {

        }
    });
    this.route('foo', {
        path: '/foo',
        template: 'foo',
        layoutTemplate: 'main_layout',
        loadingTemplate: 'loading',
        notFoundTemplate: 'page_404',
        yieldTemplates: {
            'tmp_header': {
                to: 'header'
            },
            'tmp_footer': {
                to: 'footer'
            }
        },
        before: function () {
            console.log("before");
            if (typeof (Package.ui) == 'undefined') {
                // Spark code here
                console.log("spark");
            } else {
                // Blaze code here
                console.log("blaze");
            }
            //            UI.insert(UI.render(Template.tmp_landing), $('#content'))
        }
    });
    this.route('todos', {
        path: '/:unique',
        template: 'tmp_todo',
        layoutTemplate: 'main_layout',
        loadingTemplate: 'loading',
        notFoundTemplate: 'page_404',
        yieldTemplates: {
            'tmp_header': {
                to: 'header'
            },
            'tmp_footer': {
                to: 'footer'
            }
        },
        after: function () {
            $('#liSignIn').removeClass('active');
            $('#liSignUp').removeClass('active');
        },
        before: function () {
            Session.set(SessionRef.Name.ListUnique, this.params.unique);
        },
        data: {
            Unique: function () {
                return Session.get(SessionRef.Name.ListUnique);
            },
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

function Render(template) {
    var fragment = Meteor.render(function () {
        if (Template[template] !== undefined) {
            return Template[template]();
        } else {
            console.log("{2}before pagenotfound is rendered");
            return Template[TemplateRef.PageNotFound]();
        }

    });

    $('#divContent').html(fragment);
}