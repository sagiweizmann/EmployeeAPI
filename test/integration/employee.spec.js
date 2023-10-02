const request = require('supertest');
const httpStatus = require('http-status');
const { expect } = require('chai');
const app = require('../../src/index');
const Employee = require('../../src/api/models/employee.model');
import DataBase from '../../src/utility/dataBase'

const appRequest = request(app);


async function insertEmployee() {
    const empl = appRequest
        .post('/v1/employee')
        .send({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phoneNumber: '555-123-4567',
            dateOfBirth: '1985-05-15',
            address: '123 Main Street, City, Country',
            department: 'Engineering',
            position: 'Software Developer',
            salary: 75000,
            hireDate: '2020-02-10',
            manager: "Jane Smith",
            photo: 'employee_photo.jpg',
        })
    const response = await empl;
    const {id: employeeId} = response.body.employee
    return employeeId;
}

describe('Employee Model [API]', () => {
    afterEach(() => {
        DataBase.destroy()
    })

    describe('POST /v1/employee', () => {
        it('should create a new employee when request is ok', () => {
            return appRequest
                .post('/v1/employee')
                .send({
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john.doe@example.com',
                    phoneNumber: '555-123-4567',
                    dateOfBirth: '1985-05-15',
                    address: '123 Main Street, City, Country',
                    department: 'Engineering',
                    position: 'Software Developer',
                    salary: 75000,
                    hireDate: '2020-02-10',
                    manager: "Jane Smith",
                    photo: 'employee_photo.jpg',
                })
                .expect(httpStatus.CREATED);
        });

        it('should report an error when required fields are not provided', () => {
            return appRequest
                .post('/v1/employee')
                .send({
                    firstName: 'John',
                    lastName: 'Doe',
                })
                .expect(httpStatus.INTERNAL_SERVER_ERROR);
        });
    });

    describe('GET /v1/employee', () => {
        it('should get all employees', () => {
            return appRequest
                .get('/v1/employee')
                .expect(httpStatus.OK);
        });
    });

    describe('GET /v1/employee/:id', () => {
        it('should get an employee by ID when a valid ID is provided', async () => {
            // Create a new employee
            const employeeId = await insertEmployee();

            return appRequest
                .get(`/v1/employee/${employeeId}`)
                .expect(httpStatus.OK);
        });

        it('should return an error when an invalid ID is provided', () => {
            const invalidId = '22222';
            return appRequest
                .get(`/v1/employee/${invalidId}`)
                .expect(httpStatus.NOT_FOUND);
        });
    });

    describe('PATCH /v1/employee/:id', () => {
        it('should update an employee by ID when a valid ID and request body are provided', async () => {
            // Create a new employee
            const employeeId = await insertEmployee();

            // Update the employee using the extracted ID
            return appRequest
                .patch(`/v1/employee/${employeeId}`)
                .send({
                    firstName: 'Sagi',
                    lastName: 'Weizmann',
                })
                .expect(httpStatus.OK);
        });

        it('should return an error when an invalid ID is provided', () => {
            const invalidId = 'invalidId';
            return appRequest
                .patch(`/v1/employee/${invalidId}`)
                .send({
                    firstName: 'Sagi'
                })
                .expect(httpStatus.NOT_FOUND);
        });
    });

    describe('DELETE /v1/employee/:id', () => {
        it('should delete an employee by ID when a valid ID is provided', async () => {
            // Create a new employee
            const employeeId = await insertEmployee();

            return appRequest
                .delete(`/v1/employee/${employeeId}`)
                .expect(httpStatus.OK);
        });

        it('should return an error when an invalid ID is provided', () => {
            const invalidId = '2222';
            return appRequest
                .delete(`/v1/employee/${invalidId}`)
                .expect(httpStatus.NOT_FOUND);
        });
    });
});
