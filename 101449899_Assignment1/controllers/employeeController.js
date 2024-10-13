const Employee = require('../models/Employee');

exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching employees.' });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json({ message: 'Employee created successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating employee.' });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.eid);
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching employee.' });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndUpdate(req.params.eid, req.body);
    res.status(200).json({ message: 'Employee details updated successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating employee.' });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.query.eid);
    res.status(204).json({ message: 'Employee deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting employee.' });
  }
};
