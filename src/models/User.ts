class User {
    static MODULE_NAME = 'User';

    constructor() {
        User.logMe(User.MODULE_NAME);
    }

    static logMe(myName: string): void {
        console.log(`${myName} module`); // eslint-disable-line no-console
    }
}

export default User;
