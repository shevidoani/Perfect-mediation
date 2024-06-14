// // const usersRepository = require('../repositories/users.repository');
// // const passwordRepository = require('../repositories/passwords.repository');
// // const usersPermissionsRepository = require('../repositories/usersPermissions.repository');
// // const bcrypt = require('bcrypt');
// // class LoginService {
// //     constructor(Repository) {
// //         return this.Repository = Repository;
// //     }

// //     async login(data) {
// //         try {
// //             const user = await usersRepository.getByEmail(data.email);
// //             if (!user) {
// //                 throw new Error('User does not exist');
// //             }
// //             const password = await passwordRepository.getById(user.id);
// //             const isPasswordValid = await bcrypt.compare(data.password, password.password);
// //             const permissions = userPermissions.map(permission => permission.idPermissions);
// //             if (!isPasswordValid) {
// //                 throw new Error('Invalid email or password');
// //             }

// //             const userPermissions = await usersPermissionsRepository.getbyUserId(user.id);
// //             const userWithPermissions = {
// //                 id: user.id,
// //                 email: user.email,
// //                 name: user.name,
// //                 permissions: permissions
// //             };

// //             return userWithPermissions;
// //         } catch (err) {
// //             throw new Error('An error occurred during login');
// //         }
// //     }

// // }

// // module.exports =new LoginService(usersRepository, usersPermissionsRepository, passwordRepository);


// const usersRepository = require('../repositories/users.repository');
// const passwordRepository = require('../repositories/passwords.repository');
// const usersPermissionsRepository = require('../repositories/usersPermissions.repository');
// const bcrypt = require('bcrypt');

// class LoginService {
//     constructor(usersRepository, usersPermissionsRepository, passwordRepository) {
//         this.usersRepository = usersRepository;
//         this.usersPermissionsRepository = usersPermissionsRepository;
//         this.passwordRepository = passwordRepository;
//     }

//     async login(data) {
//         try {
//             const user = await this.usersRepository.getByEmail(data.email);

//             if (!user) {
//                 throw new Error('User does not exist');
//             }

//             const password = await this.passwordRepository.getById(user.id);
//             const isPasswordValid = await bcrypt.compare(data.password, password.password);
//             if (!isPasswordValid) {
//                 throw new Error('Invalid email or password');
//             }

//             const userPermissions = await this.usersPermissionsRepository.getByUserId(user.id);
//             const permissions = userPermissions.map(permission => permission.idPermissions);

//             const userWithPermissions = {
//                 id: user.id,
//                 email: user.email,
//                 name: user.name,
//                 permissions: permissions
//             };

//             return userWithPermissions;
//         } catch (err) {
//             throw new Error('An error occurred during login');
//         }
//     }

// }

// module.exports = LoginService;

// const usersRepository = require('../repositories/users.repository');
// const passwordRepository = require('../repositories/passwords.repository');
// const usersPermissionsRepository = require('../repositories/usersPermissions.repository');
// const bcrypt = require('bcrypt');

// class LoginService {
//     constructor(usersRepository, usersPermissionsRepository, passwordRepository) {
//         this.usersRepository = usersRepository;
//         this.usersPermissionsRepository = usersPermissionsRepository;
//         this.passwordRepository = passwordRepository;
//     }

//     async login(data) {
//         try {
//             console.log('45');
//             const user = await this.usersRepository.getByEmail(data.email);

//             if (!user) {
//                 throw new Error('User does not exist');
//             }

//             const password = await this.passwordRepository.getById(user.id);
//             const isPasswordValid = await bcrypt.compare(data.password, password.password);
//             if (!isPasswordValid) {
//                 throw new Error('Invalid email or password');
//             }

//             const userPermissions = await this.usersPermissionsRepository.getByUserId(user.id);
//             const permissions = userPermissions.map(permission => permission.idPermissions);

//                 const userWithPermissions = {
//                     id: user.id,
//                     email: user.email,
//                     name: user.name,
//                     permissions: permissions
//                 };

//                 return userWithPermissions;
//             } catch (err) {
//                 console.error(err); // הדפסת השגיאה לניתוח נוסף
//                 throw new Error('An error occurred during login');
//             }
//         }

//     }

//     module.exports = LoginService;

const usersRepository = require('../repositories/users.repository');
const passwordRepository = require('../repositories/passwords.repository');
const usersPermissionsRepository = require('../repositories/usersPermissions.repository');

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
            console.log(user.data[0].id);
            const newUser=user.data[0];
            if (!user) {
                throw new Error('User does not exist');
            }

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
                permissions: userPermissions.idPermissions
            };

            return userWithPermissions;
        } catch (err) {
            console.error(err);
            throw new Error('An error occurred during login');
        }
    }
}

module.exports = LoginService;
