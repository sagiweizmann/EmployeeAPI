import {CREATED, INTERNAL_SERVER_ERROR, NOT_FOUND, OK} from 'http-status'
import EmployeeModel from "../models/employee.model";
import {cloneDeep} from "lodash";

/**
 * @description Controller for get a specific employee
 * @param req
 * @param res
 * @param next
 */
export const getEmployee = (req, res, next) => {
    try{
        const employee = EmployeeModel.findAll(item => item["id"] === req.params.id)

        if (employee.length === 0) {
            return res.status(NOT_FOUND).json({
                "message" : "Employee not found"
            })
        }


        res.status(OK).json({
            employee
        })
    } catch(err){
        res.status(NOT_FOUND).json({
            "message" : "Employee not found"
        })
    }
}

/**
 * @description Controller for get all employees of a specific recipient
 * @param req
 * @param res
 * @param next
 */
export const getAllEmployee = (req, res, next) => {
    try{
        const employees = EmployeeModel.findAll(item => item["rec"] === req.params.firstName)

        res.status(OK).json({
            employees
        })
    } catch(err){
        res.status(NOT_FOUND).json({
            employees: []
        })
    }
}

/**
 * @description Controller for create a new employee
 * @param req
 * @param res
 * @param next
 */
export const createEmployee = (req, res, next) => {
    try {
        const employee = new EmployeeModel(req.body)

        employee.save()
        res.status(CREATED).json({
            employee: employee,
        })
    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR).json({
            "Error": err.toString()
        })
    }
}
/**
* @description Controller for deleting employee by id
* @param req
* @param res
* @param next
*/
export const deleteEmployee = (req, res, next) => {
    try{
        const employeeList = EmployeeModel.findAll(item => item["id"] === req.params.id)
        const employee = employeeList.length > 0 ? employeeList[0] : null

        if (employee === null) {
            res.status(NOT_FOUND).json({
                "message": "Employee not found"
            })
        }
        employee.delete()

        res.status(OK).json({
            "message": "Employee deleted successfully"
        })
    } catch(err){
        res.status(INTERNAL_SERVER_ERROR).json({
            "message" : "Employee not found",
            "Error": err.toString()
        })
    }
}
/**
 * @description Controller for patching employee by id and only the fields that are passed
 * @param req
 * @param res
 * @param next
 */
export const patchEmployee = (req, res, next) => {
    try{
        const employeeList = EmployeeModel.findAll(item => item["id"] === req.params.id)
        const employee = employeeList.length > 0 ? employeeList[0] : null

        if (employee === null) {
            return res.status(NOT_FOUND).json({
                "message": "Employee not found"
            })
        }

        const newEmployee = new EmployeeModel({
            ...cloneDeep(employee),
            ...req.body
        })

        employee.delete()
        newEmployee.save()

        res.status(OK).json(employee)
    } catch(err){
        res.status(INTERNAL_SERVER_ERROR).json({
            "message" : "Error while patching employee",
            "Error Message": err.toString()
        })
    }
}
