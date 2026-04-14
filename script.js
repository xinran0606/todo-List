function changeDate(){
    let selectedDate = document.getElementById("datePicker").value;
    currentDate = new Date(selectedDate);
    document.getElementById("date").textContent = selectedDate;
}

let allTasks = {}; // Can not put it in the addTask() function, otherwise it would be created as {} every time.

function addTask(){
    let taskText = document.getElementById("task").value;

    let li = document.createElement("li");         // Create a new "li" element

    let key = currentDate.toLocaleDateString();
    if (!allTasks[key]){
        allTasks[key] = [];
    }
    allTasks[key].push(taskText);

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    li.appendChild(checkbox);                      // <li><input type="checkbox"> </li>

    let textNode = document.createTextNode(taskText);
    li.appendChild(textNode);

    let doingBtn = document.createElement("button");
    doingBtn.type = "button";
    doingBtn.textContent = "Do";
    doingBtn.onclick = function(){
        moveToDoing(li);               // moveToDoing has to know which task it gonna work with
    };
    li.appendChild(doingBtn);          // <li><input type="checkbox"><button type="button" onclick="moveToDoing(li)">Do</button></li>

    document.getElementById("To-Do").appendChild(li);

    document.getElementById("task").value = "";
}

function moveToDoing(li){
    document.getElementById("doing").appendChild(li);
    let btn = li.querySelector("button");  // Find the first button in li
    btn.textContent = "Finished";
    btn.onclick = function(){
        moveToDone(li);
    }
}

function moveToDone(li){
    document.getElementById("done").appendChild(li);
    let btn = li.querySelector("button");
    btn.remove();

    let checkbox = li.querySelector("input");
    checkbox.remove();
}

function deleteTask(){
    let items = document.querySelectorAll("#To-Do li, #doing li");   // items = [task1, task2, task3]
    items.forEach(function(li){                     // Operation on every li
        let checkbox = li.querySelector("input");
        if (checkbox.checked){
            li.remove();
        }
    });
}

function important(){
    let items = document.querySelectorAll("#To-Do li, #doing li");
    items.forEach(function(li){
        let checkbox = li.querySelector("input");
        if (checkbox.checked){
            li.style.color = "red";
            li.style.fontWeight = "bold";
            let parent = li.parentElement;
            parent.prepend(li);
        }
    });
}

function unImportant(){
    let items = document.querySelectorAll("#To-Do li, #doing li");
    items.forEach(function(li){
        let checkbox = li.querySelector("input");
        if (checkbox.checked){
            li.style.color = "";
            li.style.fontWeight = "";
        }
    });
}



