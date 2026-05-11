import connectDB from "./db/connect.js";

import UserService from "./services/user.service.js";
import EmailService from "./services/email.service.js";

async function startApp() {
    // Connect MongoDB
    await connectDB();

    // Start Services
    await UserService.start();
    await EmailService.start();

    try {
        // Create User
        const newUser = await UserService.call("user.createUser", {
            username: "Dhruv Patel",
            email: "dhruv10@gmail.com",
        });

        console.log("New User Created:", newUser);

        // Get Users
        const users = await UserService.call("user.getUsers");

        console.log("All Users:", users);

        // Send Email
        const emailResult = await EmailService.call("email.sendEmail", {
            recipent: newUser.email,
            subject: "Welcome to Our App",
            content: "Thank you for signing up!",
        });

        console.log(emailResult);
    } catch (error) {
        console.log(error);
    } finally {
        await UserService.stop();
        await EmailService.stop();
    }
}

startApp();