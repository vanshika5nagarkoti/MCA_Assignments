
let employees = [];

function addEmployee() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let department = document.getElementById("department").value;
    let salary = document.getElementById("salary").value;

    if (name == "" || email == "" ||
        department == "" || salary == "") {
        alert("Please fill all fields");
        return;
    }

    let employee = {
        name: name,
        email: email,
        department: department,
        salary: salary
    };

    employees.push(employee);

    displayEmployees();

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("department").value = "";
    document.getElementById("salary").value = "";
}

function displayEmployees() {
    let list = document.getElementById("employeeList");
    let search = document.getElementById("search").value.toLowerCase();
    let filter = document.getElementById("filter").value;

    list.innerHTML = "";

    employees.forEach(function(emp, index) {
        if (emp.name.toLowerCase().includes(search) &&
            (filter == "" || emp.department == filter)) {

            list.innerHTML += `
                <tr>
                    <td>${emp.name}</td>
                    <td>${emp.email}</td>
                    <td>${emp.department}</td>
                    <td>${emp.salary}</td>
                    <td>
                        <button class="edit"
                            onclick="editEmployee(${index})">
                            Edit
                        </button>

                        <button class="delete"
                            onclick="deleteEmployee(${index})">
                            Delete
                        </button>
                    </td>
                </tr>
            `;
        }
    });
}

function editEmployee(index) {
    let emp = employees[index];

    let name = prompt("Enter new name", emp.name);
    if (name == null || name.trim() == "") return;

    let email = prompt("Enter new email", emp.email);
    if (email == null || email.trim() == "") return;

    let department = prompt(
        "Enter department: IT, HR, Finance, Marketing",
        emp.department
    );
    if (department == null || department.trim() == "") return;

    department = department.trim().toUpperCase();

    if (!["IT", "HR", "FINANCE", "MARKETING"].includes(department)) {
        alert("Invalid department");
        return;
    }

    let salary = prompt("Enter new salary", emp.salary);
    if (salary == null || salary.trim() == "" ||
        isNaN(salary) || Number(salary) < 0) {
        alert("Invalid salary");
        return;
    }

    emp.name = name.trim();
    emp.email = email.trim();
    emp.department = department;
    emp.salary = salary;

    displayEmployees();
}

function deleteEmployee(index) {
    employees.splice(index, 1);
    displayEmployees();
}