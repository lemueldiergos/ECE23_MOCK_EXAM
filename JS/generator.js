var question =          [];
var answers =           [];
var correct_answers =   [];

var generated_disp = document.getElementById("generated_out");
var generated_disp_body = document.getElementById("generated");

function generateMe() {
    var q = arguments[0];
    var a = [
        arguments[1],
        arguments[2],
        arguments[3],
        arguments[4]
    ];  
    var c = arguments[5];

    question.push(q);

    answers.push(a);

    correct_answers.push(c);

    var x = {Q: question, A: answers,C: correct_answers,P: "la.on"};
    var TOTAL_JSON = JSON.stringify(x);

    console.log(TOTAL_JSON);

    generated_disp_body.style.display="flex";
    generated_disp.innerHTML = TOTAL_JSON;

}