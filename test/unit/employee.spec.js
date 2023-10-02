import { expect } from 'chai';
import EmployeeModel from '../../src/api/models/employee.model';

describe('EmployeeModel [Unit]', () => {
    const employeeData = {
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
        manager: 'Jane Smith',
        photo: 'employee_photo.jpg',
    };

    describe('#Constructor', () => {
        it('should create an EmployeeModel object', () => {
            const employee = new EmployeeModel(employeeData);

            expect(employee).to.be.an.instanceOf(EmployeeModel);
        });

        it('should initialize employee properties correctly', () => {
            const employee = new EmployeeModel(employeeData);

            expect(employee.id).to.be.a('string');
            expect(employee.firstName).to.equal(employeeData.firstName);
            expect(employee.lastName).to.equal(employeeData.lastName);
            expect(employee.email).to.equal(employeeData.email);
            expect(employee.phoneNumber).to.equal(employeeData.phoneNumber);
        });
    });
});
