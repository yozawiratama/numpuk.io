Meteor.startup(function () {
    process.env.MAIL_URL = "smtp://putusatwika:sijiecard2@smtp.sendgrid.net:465";
    Meteor.methods({
        sendEmail: function (to, from, subject, text) {
            check([to, from, subject, text], [String]);
            this.unblock();
            Email.send({
                to: to,
                from: from,
                subject: subject,
                text: text
            });

        }
    });
});
