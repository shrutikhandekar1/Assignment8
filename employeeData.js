/*eslint-env browser*/

var employeeList = [["shruti k", "Web Developer", 334],["Aamod Dinkar", "Manager", 563],["Mona Mehta", "Manager", 234],["Ani Douzdijan", "Realtor", 466],["Andres D", "CFO", 345]];
var buttonList = [];

//helper functions
var $ = function(id) {
    "use strict";
    return window.document.getElementById(id);
};


var table, thead, tbody, cell, row, th, btn;
var headings =          ["name", "title", "extension", ""];
var employeeForm =      $("employeeForm");
var employeeTable =     $("employees");
var addEmployeeBtn =    $("addemployee");
var employeeName =      $("name");
var employeeTitle =     $("title");
var employeeExtension = $("extension");

//window.console.log(employeeTable);

var createTable = function(tableHeadings) {
    "use strict";
    table = document.createElement('table');
    table.id = "employees";
    thead = document.createElement('thead');
    row=document.createElement("tr");

    tableHeadings.forEach(function (heading) {
        cell = document.createElement('td');
        cell.appendChild(document.createTextNode(heading));
        row.appendChild(cell);
    });
    thead.appendChild(row);

    table.appendChild(thead);
    document.body.appendChild(table);
    tbody = document.createElement("tbody");
};

var entry = function() {

};

var addRow = function (tableData) {
    "use strict";

       
    //tableData.forEach(function (dataEntry)
    for (var x=0;x<tableData.length;x++) {
        var td;
        var newRow = table.insertRow(-1);

        btn = document.createElement('input');
        btn.type = "button";
        btn.className = "delbtn";
        btn.value = "delete";
        btn.id="delbtn"+[x];
        buttonList.push(btn.id);

        btn.addEventListener('click',function(e){
            var currow = this.closest('tr').rowIndex;
            deleteEmployeeRow(currow);
        });

        for (var i=0;i<tableData[x].length;i++) {
            var cell = newRow.insertCell(i);
            cell.innerHTML = tableData[x][i];
        }

        newRow.insertCell().appendChild(btn);   
        tbody.appendChild(newRow); 
    };
    table.appendChild(tbody);
    updateEmployeeCount();
};

var addEmployee = function(newEntry) {
    "use strict";
    employeeList.push(newEntry);
    addRow([newEntry]);

};

var deleteEmployeeRow = function(rowIndex)  {
    "use strict";
    table.deleteRow(rowIndex);
            employeeList.splice(rowIndex-1, 1);
            updateEmployeeCount();
};

var updateEmployeeCount = function()  {
    "use strict";
    //console.log(employeeList.length);
    var employeeCount = $("employeeCount");
    employeeCount.innerHTML = "Showing " + employeeList.length + " employees";
};

var validateFields = function()  {
    "use strict";

    var msg = "";
    var span = $('errorMsg');

    var spanList = document.getElementsByTagName("span");
    //console.log(spanList);

    for(var i=0;i<spanList.length;i++) {
        //console.log(spanList[i]);
        employeeForm.removeChild(spanList[i]);
    }
    
    //Check if Employee name is populated
    if(employeeName.value == "" || employeeName.value == null) {
        msg = "<span id='errorMsg'>Employee name cannot be blank</span>";
        if(employeeName.nextElementSibling.tagName !== "SPAN") {
            employeeName.insertAdjacentHTML('afterend', msg);
        }
    }

    //Check if Employee name is valid alphanumeric characters
    else if(!/^[a-zA-Z]+$/.test(employeeName.value)){
        //console.log("here");
        msg = "<span id='errorMsg'>Please use alphanumeric characters for Employee name</span>";
        if(employeeName.nextElementSibling.tagName !== "SPAN")
            employeeName.insertAdjacentHTML('afterend', msg);
    }

    //Check if Employee title is populated
    if(employeeTitle.value == "" || employeeTitle.value == null) {
        msg = "<span id='errorMsg'>Employee title cannot be blank</span>";
        console.log(employeeTitle.nextElementSibling.tagName);
        if(employeeTitle.nextElementSibling.tagName !== "SPAN")
            employeeTitle.insertAdjacentHTML('afterend', msg);
    }

    //Check if Employee title is valid alphanumeric characters
    else if(!/^[a-zA-Z]+$/.test(employeeTitle.value)){
            msg = "<span id='errorMsg'>Please enter a valid employee title</span>";
            if(employeeTitle.nextElementSibling.tagName !== "SPAN")
            employeeTitle.insertAdjacentHTML('afterend', msg);
    }
    

    //Check if Employee extension is populated
    if(employeeExtension.value == "" || employeeExtension.value == null) {
        msg = "<span id='errorMsg'>Employee extension cannot be blank</span>";
        if(employeeExtension.nextElementSibling.tagName !== "SPAN")
            employeeExtension.insertAdjacentHTML('afterend', msg);
    }
    //check if employee extension are numbers
    else if(/^[a-zA-Z]+$/.test(employeeExtension.value)) {
        msg = "<span id='errorMsg'>Employee extension cannot be string</span>";
        if(employeeExtension.nextElementSibling.tagName !== "SPAN")
            employeeExtension.insertAdjacentHTML('afterend', msg);
    }
    //Check if Employee extension is valid 3 digit number
    else if(!employeeExtension.value.match(/\d/g).length===3){
        msg = "<span id='errorMsg'>Please enter a valid 3 digit employee extension</span>";
        if(employeeExtension.nextElementSibling.tagName !== "SPAN")
            employeeExtension.insertAdjacentHTML('afterend', msg);
    }

    if(msg !== "") {

        return false;
    }       
    else{
        //errorMsg.innerText ="";
        addEmployee([employeeName.value,employeeTitle.value,employeeExtension.value]);
        return true;
    }
    
};


createTable(headings);
addRow(employeeList);
addEmployeeBtn.addEventListener("click", validateFields);
console.log("1");




