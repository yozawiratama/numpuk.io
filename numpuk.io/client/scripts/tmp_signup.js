Template.tmp_signup.created = function () {};
Template.tmp_signup.rendered = function () {
$('#liSignUp').addClass('active');
    $('#liSignIn').removeClass('active');
};
Template.tmp_signup.events({
    'submit': function (e) {
        e.preventDefault();
        var username = trimInput($('#inpSignupUserName').val());
        var name = trimInput($('#inpSignupName').val());
        var email = trimInput($('#inpSignupEmail').val());
        var pwd = trimInput($('#inpSignupPwd').val());
        var repwd = trimInput($('#inpSignupRePwd').val());
        if (pwd == repwd) {
            Accounts.createUser({
                username: username,
                email: email,
                password: pwd,
                profile : {
                Name : name
                }
            }, function (err) {
                if (err) {
                    console.log(err.message);
                    alert("fail");
                } else {

                    //                    console.log(this.userId);
                    //                    Accounts.sendVerificationEmail(this.userId, email);
                    var to = email;
                    var from = "info@numpuk.io";
                    var subject = "numpuk - email verification";
                    var text = "";
                    Meteor.call("sendEmail", email, "info@numpuk.io", "verification", "content", function (err, res) {
                        if (err) {
                            console.log(err);
                            alert("fail email");
                        }
                        else{
                            
                            alert("Email verification sent");
                        }
                    });
                    console.log(Meteor.userId());
                    Router.go("");
                    //                    alert("success!");
                }

            });
        }

        return false;
    }

});