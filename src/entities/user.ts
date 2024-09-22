export default class User {
    constructor( firstName: string, lastName: string, id: number ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.id = id;
    }
    firstName: string;
    lastName: string;
    id: number;
}