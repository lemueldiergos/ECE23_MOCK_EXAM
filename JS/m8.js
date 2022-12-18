let q_id =                  document.getElementById("q_id"),
    a_id =                  document.getElementById("a_id"),
    n_id =                  document.getElementById("next_btn"),
    n1_id =                 document.getElementById("next1_btn"),
    menu_start_internal =   document.getElementById("main_menu_internal"),
    menu_end_internal =     document.getElementById("end_of_quiz"),
    result_shower   =       document.getElementById("result_correction");

// --------------     XML GARDEN -------------------------------

var XMLREQ = new XMLHttpRequest();

XMLREQ.onreadystatechange = function() {
    if(XMLREQ.readyState == 4 && XMLREQ.status == 200) {
        var loaded_d = XMLREQ.responseText;
        DAT_JSON = loaded_d;
    }
}


XMLREQ.open("GET", "JS/Module_8.json", false);
XMLREQ.send();




// -----------------------------------------------------------

var DAT_JSON,
    DAT_PARSE;

DAT_PARSE = JSON.parse(DAT_JSON);


var ITEM_LIMIT      = DAT_PARSE.Q.length-1,
    RAND            =  Math.ceil(Math.random()*ITEM_LIMIT),
    ITEM_LIST       = [RAND];

var ANSWER_CORRECT  = 0,
    SELECTED_ANSWER = 0;

// FUNCTION GARDEN

// Question and Answer Creator
function CREATOR_QA(x) {
    // QUESTION
    q_id.innerHTML = DAT_PARSE.Q[x];

    // ANSWER
    for(i = 0 ; i < DAT_PARSE.A[x].length ; i++) {
        let INPUTR     = document.createElement("input");
        let br         = document.createElement("br");
        let LABELR     = document.createElement("label");
        
        with(INPUTR) {
            type        = "radio";
            value       = i;
            name        = "RADR";
            id          = "iden_"+i;
        }

       
        INPUTR.className = "ans";
        
        var for_get     = document.createAttribute("for");
        for_get.value   = "iden_"+i;

        LABELR.setAttributeNode(for_get);
        LABELR.className = "px-4";
        LABELR.innerHTML = DAT_PARSE.A[x][i];

        a_id.appendChild(INPUTR);
        a_id.appendChild(LABELR);
        a_id.appendChild(br);
        
        INPUTR.addEventListener("click", ()=> {
          //  console.log(INPUTR.value);
            SELECTED_ANSWER = INPUTR.value;
        });
    }
}


// AVOID GETTING SAME QUESTION 

function SIMILARITY_AVOIDANCE() {
    do {
        RAND = Math.ceil(Math.random()*ITEM_LIMIT);
    } while(ITEM_LIST.includes(RAND));
    ITEM_LIST.push(RAND);

}

// ANSWER VALIDATOR
function ANSWER_VALIDATION() {
   // console.log(SELECTED_ANSWER +" : "+ DAT_PARSE.C[RAND])
    if(SELECTED_ANSWER == DAT_PARSE.C[RAND])  {

            console.log(ITEM_LIST.length +" : " + (ITEM_LIMIT-1));

            if(ITEM_LIST.length == (ITEM_LIMIT-1)) {
                menu_end_internal.style.display = "flex";
            }

            SIMILARITY_AVOIDANCE();
            return true;
    }
    else    {
        result_shower.innerHTML = DAT_PARSE.A[RAND][DAT_PARSE.C[RAND]];
        return false;
    }
}  

// CLEAR CHILD 
function CLEAR_FORM_CHILD() {
    while(a_id.hasChildNodes()) {
        a_id.removeChild(a_id.firstChild);    
    }
}


// INITIAL STATE
CREATOR_QA(RAND);
//n1_id.disabled = true;
result_shower.innerHTML = "";


// SUBMITTING FUNCTION
function submitting() {
    
    CLEAR_FORM_CHILD();
    result_shower.innerHTML = "";
    ANSWER_VALIDATION();
   // console.log(RAND);
    CREATOR_QA(RAND);
    



}

