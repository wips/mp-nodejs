class User {
    static MODULE_NAME = 'User';
    private id: string;

    constructor(id: string) {
        this.id = id;
        User.logMe(User.MODULE_NAME);
    }

    getId() {
        return this.id;
    }

    serialize(): EntityDTO {
        return {
            id: this.id,
            'class': User.MODULE_NAME
        };
    }

    static logMe(myName: string): void {
        console.log(`${myName} module`); // eslint-disable-line no-console
    }
}

export default User;
