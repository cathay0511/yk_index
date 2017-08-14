var htmlEncodeByRegExp = function (str){
    var s = "";
    if(str.length == 0) return "";
    s = str.replace(/&/g,"&amp;");
    s = s.replace(/</g,"&lt;");
    s = s.replace(/>/g,"&gt;");
    s = s.replace(/ /g,"&nbsp;");
    s = s.replace(/\'/g,"&#39;");
    s = s.replace(/\"/g,"&quot;");
    return s;
}

function stripscript(str) {
    var s = '';
    if (typeof (s) !== 'string') {
        return s;
    }
    s = str;
    s = s.replace(/<script/g, '&lt;script');
    s = s.replace(/<\/.*script/g, '&lt;/script');

    return s;
}

$('#go').on('click', function () {
    var script = $('input[name=script]').val();
    script = stripscript(script);
    console.log(script);
    $('#show_script').html(script);
});
