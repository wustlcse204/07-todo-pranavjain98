let idarray = ["0"];
let statusarray = [10];

function listfromajax(){
    idarray = ["0"];
    statusarray = [10];
    document.getElementById("list").innerHTML="<p style=\"text-align:center\"><b>To-Dos:</b></p>";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var todos = JSON.parse(this.responseText);
        console.log(todos[0].text);
        console.log(todos[0].id);
        for (x in todos) {
            console.log(todos[x].completed);
            if(todos[x].completed){
                statusarray.push(1);
                document.getElementById("list").innerHTML+="<div class=\"doel\"><p><input type=\"checkbox\" class=\"form-check-input\" checked=\"checked\" id=\"c"+todos[x].id+"\"><label class=\"form-check-label\" for=\"c"+todos[x].id+"\">"+todos[x].text+"</label></p><button id=\"d"+todos[x].id+"\" type=\"submit\" class=\"btn btn-danger\">delete</button></div>";
            }
            else{
                statusarray.push(0);
                document.getElementById("list").innerHTML+="<div class=\"doel\"><p><input type=\"checkbox\" class=\"form-check-input\" id=\"c"+todos[x].id+"\"><label class=\"form-check-label\" for=\"c"+todos[x].id+"\">"+todos[x].text+"</label></p><button id=\"d"+todos[x].id+"\" type=\"submit\" class=\"btn btn-danger\">delete</button></div>";
            }
            console.log(statusarray);
            idarray.push(todos[x].id);
        }
        console.log(idarray);
        for(let i=1;i<idarray.length;i++){
            console.log("b");
            console.log(i);
            $(document).ready(function(){
                $("#c"+idarray[i]).change(function(){
                    console.log("hello");
                    if(statusarray[i]===0){
                        var data = {
                            completed: true
                        }
                        statusarray[i]=1;
                    }
                    else{
                        var data = {
                            completed: false
                        }
                        statusarray[i]=0;
                    }
                    // Setting variable for ToDo id
                    var id = idarray[i];

                    // Initalize AJAX Request
                    var xhttp2 = new XMLHttpRequest();

                    // Response handler
                    xhttp2.onreadystatechange = function() {

                        // Wait for readyState = 4 & 200 response
                        if (this.readyState == 4 && this.status == 200) {

                            // parse JSON response
                            console.log("success");

                        } else if (this.readyState == 4) {

                            // this.status !== 200, error from server
                            console.log(this.responseText);

                        }
                    };
                    console.log(id);
                    xhttp2.open("PUT", "https://api.kraigh.net/todos/"+id, true);

                    xhttp2.setRequestHeader("Content-type", "application/json");
                    xhttp2.setRequestHeader("x-api-key","f62900f59c408141a2f962c363abc46ede1d6a5923e3cda089e4448baa332819");
                    xhttp2.send(JSON.stringify(data));
                });
                $("#d"+idarray[i]).click(function(){
                    // Setting variable for ToDo id
                    var id = idarray[i];

                    // Initalize AJAX Request
                    var xhttp2 = new XMLHttpRequest();

                    // Response handler
                    xhttp2.onreadystatechange = function() {

                        // Wait for readyState = 4 & 200 response
                        if (this.readyState == 4 && this.status == 200) {

                            // parse JSON response
                            console.log("success");
                            listfromajax();

                        } else if (this.readyState == 4) {

                            // this.status !== 200, error from server
                            console.log(this.responseText);

                        }
                    };
                    console.log(id);
                    xhttp2.open("DELETE", "https://api.kraigh.net/todos/"+id, true);

                    xhttp2.setRequestHeader("Content-type", "application/json");
                    xhttp2.setRequestHeader("x-api-key","f62900f59c408141a2f962c363abc46ede1d6a5923e3cda089e4448baa332819");
                    xhttp2.send();
                });
            });
        }
    }
    };
    xhttp.open("GET", "https://api.kraigh.net/todos", true);
    xhttp.setRequestHeader("x-api-key","f62900f59c408141a2f962c363abc46ede1d6a5923e3cda089e4448baa332819");
    xhttp.send();
}
listfromajax();

function addtodoajax(){
    // Setting variable for form input (get from HTML form)
    let inputText = document.getElementById("todoinput").value;
    console.log(inputText);
    var data = {
        text: inputText
    }
    document.getElementById("todoinput").value=" ";
    //Initalize AJAX Request
    var xhttp2 = new XMLHttpRequest();

    // Response handler
    xhttp2.onreadystatechange = function() {

        // Wait for readyState = 4 & 200 response
        if (this.readyState == 4 && this.status == 200) {

            // parse JSON response
            var todo = JSON.parse(this.responseText);
            // document.getElementById("list").innerHTML+="<div class=\"doel\"><p><input type=\"checkbox\" class=\"form-check-input\" id=\"c"+todo.id+"\"><label class=\"form-check-label\" for=\"c"+todo.id+"\">"+todo.text+"</label></p><button id=\"d"+todo.id+"\" type=\"submit\" class=\"btn btn-danger\">delete</button></div>";
            // idarray.push(todo.id);
            // statusarray.push(0);
            listfromajax();
            console.log(todo);

        } else if (this.readyState == 4) {

            // this.status !== 200, error from server
            console.log(this.responseText);

        }
    };

    xhttp2.open("POST", "https://api.kraigh.net/todos", true);

    xhttp2.setRequestHeader("Content-type", "application/json");
    xhttp2.setRequestHeader("x-api-key", "f62900f59c408141a2f962c363abc46ede1d6a5923e3cda089e4448baa332819");
    xhttp2.send(JSON.stringify(data));
}

document.getElementById("todoadd").addEventListener("click",addtodoajax,false);