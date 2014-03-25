Template.tmp_signin.created = function () {};
Template.tmp_signin.rendered = function () {
$('#liSignIn').addClass('active');
    $('#liSignUp').removeClass('active');
};
Template.tmp_signin.events({
    'submit': function (e) {
        e.preventDefault();
        console.log("sign in");
        var email = $('#inpSigninEmail').val();
        var pwd = $('#inpSigninPwd').val();
        Meteor.loginWithPassword(email, pwd, function (err) {
            if (err) {
                console.log(err);
                alert("Incorrect");
            } else {
                Router.go("/list");
            }
        });
        return false;
    },
    'click #hplforgot': function (e) {
        e.preventDefault();
        alert("Coming Soon");
    }

});