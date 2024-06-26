const bcrypt = require('bcrypt');

class LoginService {
    constructor(usersRepository, usersPermissionsRepository, passwordRepository) {
        this.usersRepository = usersRepository;
        this.usersPermissionsRepository = usersPermissionsRepository;
        this.passwordRepository = passwordRepository;
    }

    async login(data) {
        try {
            const user = await this.usersRepository.getByEmail(data.email);
            if (!user || !user.data || user.data.length === 0) {
                throw new Error('User does not exist');
            }
            const newUser = user.data[0];
            const password = await this.passwordRepository.getPasswordById(newUser.id);
            const isPasswordValid = await bcrypt.compare(data.password, password);
            if (!isPasswordValid) {
                throw new Error('Invalid email or password');
            }

            const userPermissions = await this.usersPermissionsRepository.getByUserId(newUser.id);

            // const permissions = userPermissions.map(permission => permission.idPermissions);

            const userWithPermissions = {
                id: newUser.id,
                email: newUser.email,
                name: newUser.name,
                permissions: userPermissions.data
            };

            return userWithPermissions;
        } catch (err) {
            console.error(err);
            throw new Error('An error occurred during login');
        }
    }
}

module.exports = LoginService;
