import EntityModel      from './entity.model'
import { v4 as uuidv4 } from 'uuid';

/**
 * EmployeeModel class
 */
export default class EmployeeModel extends EntityModel{
    static ENTITY_TYPE = 'employee';
    /**
     * EmployeeModel constructor
     * @param id
     * @param firstName
     * @param lastName
     * @param email
     * @param phoneNumber
     * @param dateOfBirth
     * @param address
     * @param department
     * @param position
     * @param salary
     * @param hireDate
     * @param manager
     * @param photo
     */
    constructor({id, firstName, lastName, email, phoneNumber, dateOfBirth, address, department, position, salary, hireDate, manager, photo}){
        super(EmployeeModel.ENTITY_TYPE)

        this.id = id || uuidv4()
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.dateOfBirth = dateOfBirth;
        this.address = address;
        this.department = department;
        this.position = position;
        this.salary = salary;
        this.hireDate = hireDate;
        this.manager = manager;
        this.photo = photo;
    }
}
