import express from 'express'
import {validate} from 'express-validation'
import * as controller from '../../controllers/employee.controller'
import * as validation from '../../validation/employee.validation'

const router = express.Router()

/**
 * @swagger
 * /v1/employee/{id}:
 *   get:
 *     summary: Get employee by ID.
 *     description: Get employee by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Employee ID
 *     responses:
 *       '200':
 *         description: A successful response
 *       '404':
 *         description: Employee not found
 *       '500':
 *         description: Internal server error
 */
router.route('/:id')
    /**
     * @api {get} /v1/employee/:id Get employee by id.
     * @apiName GetEmployee
     * @apiGroup EmployeeModel
     * @apiVersion 1.0.0
     * @apiPermission public
     * @apiDescription Get employee by id
     * @apiParam {String} [id] EmployeeModel id
     */
    .get(validate(validation.getEmployee), controller.getEmployee)

/**
 * @swagger
 * /v1/employee:
 *   get:
 *     summary: Get all employees of a specific recipient.
 *     description: Get all employees of a specific recipient.
 *     responses:
 *       '200':
 *         description: A successful response
 *   post:
 *     summary: Create a new employee
 *     description: Create a new employee with the provided information
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phoneNumber:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *               address:
 *                 type: string
 *               department:
 *                 type: string
 *               position:
 *                 type: string
 *               salary:
 *                 type: number
 *               hireDate:
 *                 type: string
 *                 format: date
 *               manager:
 *                 type: string
 *               photo:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Employee created successfully
 *       '400':
 *         description: Bad request - Invalid input data
 *     examples:
 *       EmployeeExample:
 *         value:
 *           firstName: "John"
 *           lastName: "Doe"
 *           email: "john.doe@example.com"
 *           phoneNumber: "555-123-4567"
 *           dateOfBirth: "1985-05-15"
 *           address: "123 Main Street, City, Country"
 *           department: "Engineering"
 *           position: "Software Developer"
 *           salary: 75000
 *           hireDate: "2020-02-10"
 *           manager: "Jane Smith"
 *           photo: "employee_photo.jpg"
 */


router.route('/')
    /**
     * @api {get} /v1/employee Get all employees of specific recipient.
     * @apiName GetEmployees
     * @apiGroup EmployeeModel
     * @apiVersion 1.0.0
     * @apiPermission public
     * @apiDescription Get all employees
     */
    .get(controller.getAllEmployee)
    /**
     * @api {post} /v1/employee Create a new employee.
     * @apiName CreateEmployee
     * @apiGroup EmployeeModel
     * @apiVersion 1.0.0
     * @apiPermission public
     * @apiDescription Create a new employee
     * @apiParam {String} [firstName] EmployeeModel firstName
     * @apiParam {String} [lastName] EmployeeModel lastName
     * @apiParam {String} [email] EmployeeModel email
     * @apiParam {String} [phone] EmployeeModel phone
     * @apiParam {String} [address] EmployeeModel address
     * @apiParam {String} [department] EmployeeModel department
     * @apiParam {String} [position] EmployeeModel position
     * @apiParam {String} [salary] EmployeeModel salary
     * @apiParam {String} [hireDate] EmployeeModel hireDate
     * @apiParam {String} [manager] EmployeeModel manager
     * @apiParam {String} [photo] EmployeeModel photo
     */
    .post(validate(validation.createEmployee), controller.createEmployee)

/**
 * @swagger
 * /v1/employee/{id}:
 *   delete:
 *     summary: Delete employee by ID.
 *     description: Delete employee by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Employee ID
 *     responses:
 *       '200':
 *         description: Employee deleted successfully
 *       '400':
 *         description: Bad request - Invalid input data
 *       '404':
 *         description: Employee not found
 *       '500':
 *         description: Internal server error
 */
router.route('/:id')
    /**
     * @api {delete} /v1/employee/:id delete employee by id.
     * @apiName DeleteEmployee
     * @apiGroup EmployeeModel
     * @apiVersion 1.0.0
     * @apiPermission public
     * @apiDescription Delete employee by id
     * @apiParam {String} [id] EmployeeModel id
     */
    .delete(validate(validation.deleteEmployee), controller.deleteEmployee)

/**
 * @swagger
 * /v1/employee/{id}:
 *   patch:
 *     summary: Update employee by ID.
 *     description: Update employee by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Employee ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phoneNumber:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *               address:
 *                 type: string
 *               department:
 *                 type: string
 *               position:
 *                 type: string
 *               salary:
 *                 type: number
 *               hireDate:
 *                 type: string
 *                 format: date
 *               manager:
 *                 type: string
 *               photo:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Employee updated successfully
 *       '400':
 *         description: Bad request - Invalid input data
 *       '404':
 *         description: Employee not found
 *       '500':
 *         description: Internal server error
 */

router.route('/:id')
    /**
     * @api {delete} /v1/employee/:id Update employee by id.
     * @apiName UpdateEmployee
     * @apiGroup EmployeeModel
     * @apiVersion 1.0.0
     * @apiPermission public
     * @apiDescription Update employee by id
     * @apiParam {String} [id] EmployeeModel id
     */
    .patch(validate(validation.updateEmployee), controller.patchEmployee)


export default router
