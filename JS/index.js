var LOG_MEN = document.getElementById("main_menu");

function SET_MODULE(MOD) {
    document.location = "m"+(MOD+7)+".html";
}

var XMLREQ = new XMLHttpRequest();
var DAT_JSON;
XMLREQ.onreadystatechange = function() {
    if(XMLREQ.readyState == 4 && XMLREQ.status == 200) {
        var loaded_d = XMLREQ.responseText;
        DAT_JSON = loaded_d;
    }
}


XMLREQ.open("GET", "JS/Module_7.json", false);
XMLREQ.send();
var par = JSON.parse(DAT_JSON);

function login() {
    if(FORMR.FLUX_P.value == par.P) {
        localStorage.setItem("LOG", par.P);
        LOG_MEN.style.display = "none";
    } else {
        localStorage.setItem("LOG", false);      
    }
}

if(localStorage.getItem("LOG") == par.P) {
    LOG_MEN.style.display = "none";
} else {
    LOG_MEN.style.display = "flex";
}


console.log(localStorage.getItem("LOG"));





