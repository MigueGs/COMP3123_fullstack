// Miguel angel Gutierrez Serrano 
//ID 101449899
var http = require("http");
const employeeModule = require("./employee"); // Importar el módulo de empleados

console.log("Lab 03 - NodeJs");

// Define Server Port
const port = process.env.PORT || 8082;

// Create Web Server using CORE API
const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "application/json"); // Establecer cabecera para JSON

    if (req.method !== 'GET') {
        res.writeHead(405, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ "error": http.STATUS_CODES[405] }));
        return;
    }

    if (req.url === '/') {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h1>Welcome to Lab Exercise 03</h1>");
        return;
    }

    if (req.url === '/employee') {
        res.writeHead(200);
        res.end(JSON.stringify(employeeModule.getAllEmployees()));
        return;
    }

    if (req.url === '/employee/names') {
        const names = employeeModule.getEmployeeNames();
        res.writeHead(200);
        res.end(JSON.stringify(names));
        return;
    }

    if (req.url === '/employee/totalsalary') {
        const totalSalary = employeeModule.getTotalSalary();
        res.writeHead(200);
        res.end(JSON.stringify({ "total_salary": totalSalary }));
        return;
    }

    res.writeHead(404);
    res.end(JSON.stringify({ "error": http.STATUS_CODES[404] }));
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
