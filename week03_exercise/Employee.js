// employee.js
// Miguel angel Gutierrez Serrano 
//ID 101449899

let employees = [
    {id: 1, firstName: "Pritesh", lastName: "Patel", email: "pritesh@gmail.com", salary: 5000},
    {id: 2, firstName: "Krish", lastName: "Lee", email: "krish@gmail.com", salary: 4000},
    {id: 3, firstName: "Racks", lastName: "Jacson", email: "racks@gmail.com", salary: 5500},
    {id: 4, firstName: "Denial", lastName: "Roast", email: "denial@gmail.com", salary: 9000}
];

const getAllEmployees = () => employees;

const getEmployeeNames = () => {
    return employees.map(emp => `${emp.firstName} ${emp.lastName}`).sort();
};

const getTotalSalary = () => {
    return employees.reduce((total, emp) => total + emp.salary, 0);
};

module.exports = {
    getAllEmployees,
    getEmployeeNames,
    getTotalSalary,
};
