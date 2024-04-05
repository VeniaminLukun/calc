var num_btns = document.querySelectorAll(".num_btn");
    for(let j = 0; j < num_btns.length; j++) {
        num_btns[j].addEventListener("click", function() {
            input.value += num_btns[j].innerText;
        })
    }
var oper_btns = document.querySelectorAll(".oper_btn");
    for(let j = 0; j < oper_btns.length; j++) {
        oper_btns[j].addEventListener("click", function() {
            input.value += oper_btns[j].innerText;
            var i = input.value.length;
            
            if (input.value[i-1] == "+" || input.value[i-1] == "-" || input.value[i-1] == "*" || input.value[i-1] == "/") {
                
                if (input.value[i-2] == "+" || input.value[i-2] == "-" || input.value[i-2] == "*" || input.value[i-2] == "/") {
                    input.value = input.value.replace(input.value[i-2].concat(input.value[i-1]), input.value[i-1]);
                }
            }
        })
    }