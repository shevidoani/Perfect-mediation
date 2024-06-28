const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

class SignupService {
    constructor(usersRepository, usersPermissionsRepository,
        passwordRepository, permissionsRepository, temporaryPasswordsRepository) {
        this.usersRepository = usersRepository;
        this.usersPermissionsRepository = usersPermissionsRepository;
        this.passwordRepository = passwordRepository;
        this.permissionsRepository = permissionsRepository;
        this.temporaryPasswordsRepository = temporaryPasswordsRepository;
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'edusync3@gmail.com',
                pass: 'orry nddi nmtn bxnj'
            }
        });
    }

    async createHash(password) {
        const saltRounds = 10;
        try {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            return hashedPassword;
        } catch (error) {
            console.error('Error creating hashed password:', error);
            throw new Error('Failed to create hashed password');
        }
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }



    async checkUserExists(email, usersRepository) {
        const user = await usersRepository.getIfExistsByEmail(email);
        if (user) {
            throw new Error('User already exists');
        }
    }

    async createHash(password) {
        const saltRounds = 10;
        try {
            return await bcrypt.hash(password, saltRounds);
        } catch (error) {
            console.error('Error creating hashed password:', error);
            throw new Error('Failed to create hashed password');
        }
    }

    async createUser(data, usersRepository) {
        const newUser = { name: data.name, email: data.email };
        console.log('Creating user with data:', newUser);

        const createUser = await usersRepository.create(newUser);
        console.log(createUser);
        if (createUser.success) {
            console.error('Failed to create user');
            throw new Error('Failed to create user');
        }
        console.log(`User created successfully with ID: ${createUser.insertId}`);
        return createUser.insertId;
    }

    async createPassword(userId, hashedPassword, passwordRepository, usersRepository) {
        const newPassword = { id: userId, password: hashedPassword };
        try {
            const response = await passwordRepository.create(newPassword);
            if (response.success) {
                usersRepository.delete(userId);
                console.error('Failed to create password');
                throw new Error('Failed to create password');
            }
            console.log(`Password created successfully with ID: ${response.insertId}`);
        } catch (error) {
            console.error('Error during password creation:', error);
            usersRepository.delete(userId);
            throw new Error('Failed to create password');
        }
    }

    async createPermissions(userId, types, permissionsRepository, usersPermissionsRepository, usersRepository) {
        for (const type of types) {
            const permission = await permissionsRepository.getByType(type);
            if (!permission || !permission.data || permission.data.length === 0) {
                throw new Error(`Permission of type ${type} does not exist or is empty`);
            }

            const userPermission = { idUser: userId, idPermission: permission.data[0].id };
            try {
                const response = await usersPermissionsRepository.create(userPermission);
                if (response.success) {
                    usersRepository.delete(userId);
                    console.error('Failed to create permission');
                    throw new Error('Failed to create permission');
                }
                console.log(`Permission created successfully with ID: ${response.id}`);
            } catch (error) {
                console.error('Error during permission creation:', error);
                usersRepository.delete(userId);
                throw new Error('Failed to create permission');
            }
        }
    }

    async createTemporaryPasswords(temporaryPassword) {
        const newTemporaryPassword = { password: temporaryPassword };
        try {
            const response = await this.temporaryPasswordsRepository.create(newTemporaryPassword);
            if (response.success) {
                this.usersRepository.delete(userId);
                console.error('Failed to create permission');
                throw new Error('Failed to create permission');
            }
            console.log(`Permission created successfully with ID: ${response.id}`);
            return response.insertId;
        } catch (error) {
            console.error('Error during permission creation:', error);
            this.temporaryPasswordsRepository.delete(userId);
            throw new Error('Failed to create permission');
        }
    }

    generatePassword() {
        let password = '';
        const length = 5;
        const characters = '0123456789';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            password += characters[randomIndex];
        }

        return password;
    }

    async sendWelcomeEmail(data, transporter, usersRepository, userId) {
        const newPassword = this.generatePassword();
        console.log(newPassword);
        const mailOptions = {
            from: `"Perfect brokerage" <edusync3@gmail.com>`,
            to: data.email,
            subject: 'Welcome to Our App',
            text: `Dear ${data.name},\n\nWelcome to our application. Your account has been successfully created. this your password :${newPassword}`
        };
        const createTemporaryPasswords = await this.createTemporaryPasswords(newPassword);
        try {
            await transporter.sendMail(mailOptions);
            console.log('Email sent successfully');
            return createTemporaryPasswords;
        } catch (error) {
            console.error('Error sending email:', error);
            usersRepository.delete(userId);
            throw new Error('Failed to send confirmation email');
        }

    }


    async completeSignup(data) {
        try {
            console.log(data);
            const checkPassword = await this.temporaryPasswordsRepository.getById(data.id.temporaryPasswordId);

            if (!checkPassword || !checkPassword.data || checkPassword.data.length === 0) {
                throw new Error('פרטי ההרשמה אינם תקינים');
            }

            const storedPassword = checkPassword.data[0].password;
            const getUser = await this.usersRepository.getByEmail(data.email);

            if (storedPassword !== data.checkPassword) {
                console.log(getUser);
                const deleteUser = await this.usersRepository.delete(getUser.data[0].id);
                throw new Error('פרטי ההרשמה אינם תקינים');
            } else {
                const returnUser = { id: getUser.data[0].id, name: getUser.data[0].name, email: data.email };
                return returnUser;
            }
        } catch (error) {
            throw error;
        }
    }


    async signup(data) {
        try {
            if (!this.validateEmail(data.email)) {
                throw new Error('פורמט כתובת המייל אינו תקין');
            }

            await this.checkUserExists(data.email, this.usersRepository);

            const hashedPassword = await this.createHash(data.password);
            console.log('הסיסמה נהשתה בהצלחה:', hashedPassword);

            const userId = await this.createUser(data, this.usersRepository);

            await this.createPassword(userId, hashedPassword, this.passwordRepository, this.usersRepository);

            await this.createPermissions(userId, data.type, this.permissionsRepository, this.usersPermissionsRepository, this.usersRepository);

            const temporaryPasswordId = await this.sendWelcomeEmail(data, this.transporter, this.usersRepository, userId);

            const returnUser = { temporaryPasswordId: temporaryPasswordId };
            console.log(`משתמש חדש נוצר בהצלחה: ${JSON.stringify(returnUser)}`);
            return returnUser;
        } catch (err) {
            console.error('אירעה שגיאה במהלך ההרשמה:', err);
            throw err;
        }
    }

 

}

module.exports = SignupService;


