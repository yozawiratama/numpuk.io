var chars = "c1OqJQ5bAxnKICMPDE6HhuTSeya8p7TNi9fVvGg4zWtmr2lk0wsXdB3RFLUZo";
GenerateUnique = function () {
    //harus unique jumlah bilangan antara 5-7
    var l = new Array();
    l[0] = 5;
    l[1] = 6;
    l[2] = 7;
    var le = (Math.floor(Math.random() * 331) + 17) % l.length;
    var result = generate(l[le]);

    return result;

}

function generate(length) {
    var result = "";
    for (var ii = 0; ii < length; ii++) {
        var pos = (Math.floor(Math.random() * 331) + 17) % chars.length;
        result += chars.substr(pos, 1);
    }
    if (TodoLists.find({
        Unique: result
    }).count() > 0) {
        return generate(length);
    } else return result;
}

trimInput = function (val) {
    return val.replace(/^\s*|\s*$/g, "");
}

detectmob = function() {
    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
        return true;
    } else {
        return false;
    }
}