var num_btns = document.querySelectorAll(".num_btn");
    for(let j = 0; j < num_btns.length; j++) {
        num_btns[j].addEventListener("click", function() {
            input.value += num_btns[j].innerText;
        })
    }
var oper_btns = document.querySelectorAll(".oper_btn");
var dot = document.getElementById("dot");
    for(let j = 0; j < oper_btns.length; j++) {
        oper_btns[j].addEventListener("click", function() {
            input.value += oper_btns[j].innerText;
            var i = input.value.length;
            if (input.value[i-1] == "+" || input.value[i-1] == "-" || input.value[i-1] == "*" || input.value[i-1] == "/" || input.value[i-1] == ".") {   
                if (input.value[i-2] == "+" || input.value[i-2] == "-" || input.value[i-2] == "*" || input.value[i-2] == "/" || input.value[i-2] == ".") {
                    input.value = input.value.replace(input.value[i-2].concat(input.value[i-1]), input.value[i-1]);
                }
            }
            if (input.value[i-1] == ".") {
                var dot_count = [];
                var temp_dot = -1;
                var dot_error = false;
                for(i = 0; i < input.value.length; i++) {
                    temp_dot = input.value.indexOf(".", temp_dot + 1);
                    if(temp_dot != -1) {
                        function dot_check() {
                            dot_count.forEach(element => {
                                if(element == temp_dot) {
                                    dot_error = true;
                                }
                            });
                        }
                        dot_check();
                        if(!dot_error) {
                            dot_count.push(temp_dot);
                        }
                    }
                }
                var find_plus = input.value.lastIndexOf("+");
                var find_minus = input.value.lastIndexOf("-"); 
                var find_mult = input.value.lastIndexOf("*");
                var find_div = input.value.lastIndexOf("/");
                if(dot_count[dot_count.length - 2] != undefined) {
                    if((dot_count[dot_count.length - 2] < find_plus && find_plus < dot_count[dot_count.length - 1]) || 
                    (dot_count[dot_count.length - 2] < find_minus && find_minus < dot_count[dot_count.length - 1]) || 
                    (dot_count[dot_count.length - 2] < find_mult && find_mult < dot_count[dot_count.length - 1]) || 
                    (dot_count[dot_count.length - 2] < find_div && find_div < dot_count[dot_count.length - 1])) {
                    } else {
                        input.value = input.value.slice(0, -1);
                    }
                }
                if(dot_count[0] == 0) {
                    input.value = input.value.slice(0, -1);
                }
            }
        })
    }
var c = document.getElementById("c");
c.addEventListener("click", function() {
    input.value = "";
});
var equal = document.getElementById("equal");
var output = document.getElementById("output");
var temp = "";
var temp_eval = "";
var error_zero = false;
equal.addEventListener("click", function() {
    var split = input.value.split("");
    if(split[0] == input.value || split[split.length-1] == "+" || split[split.length-1] == "-" || split[split.length-1] == "*" || split[split.length-1] == "/" || split[split.length-1] == ".") {
        output.value = "Ошибка - операторы введены не корректно"
    } else {
        input.value = "";
        for(i = 0; i < split.length; i++) {
            console.log(split);
            if(!isNaN(split[i]) && !isNaN(split[i + 1]) || split[i + 1] == ".") {
                temp = split[i].concat(split[i + 1]);
                split.splice(split.indexOf(split[i]), 2, temp);
                i = -1;
            }
            console.log(split);
        }
        for(i = 0; i < split.length; i++) {
            if(!isNaN(split[i])) {
                split[i] = Number(split[i]);
            }
        }
        for(i = 0; i < split.length; i++) {
            if(split[i] == "*") {
                temp_eval = split[i - 1] * split[i + 1];
                split.splice(i - 1, 3, temp_eval);
                i = -1;
            } else if(split[i] == "/") {
                if(split[i + 1] == 0) {
                    error_zero = true;
                }
                temp_eval = split[i - 1] / split[i + 1];
                split.splice(i - 1, 3, temp_eval);
                i = -1;
            }
        }
        for(i = 0; i < split.length; i++) {
            if(split[i] == "+") {
                temp_eval = split[i - 1] + split[i + 1];
                split.splice(i - 1, 3, temp_eval);
                i = -1;
            } else if(split[i] == "-") {
                if(split[i + 1] == 0) {
                    error_zero = true;
                }
                temp_eval = split[i - 1] - split[i + 1];
                split.splice(i - 1, 3, temp_eval);
                i = -1;
            }
        }
        if(!error_zero) {
            output.value = split[0];
        } else {
            output.value = "На ноль делить нельзя!"
        }
    }
});