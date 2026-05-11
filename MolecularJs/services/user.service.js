import { ServiceBroker } from "moleculer";
import User from "../models/user.model.js";

const broker = new ServiceBroker();

broker.createService({
    name: "user",

    actions: {
        async createUser(ctx) {
            try {
                const { username, email } = ctx.params;

                const newUser = await User.create({
                    username,
                    email,
                });

                return newUser;
            } catch (error) {
                throw error;
            }
        },

        async getUsers() {
            try {
                const users = await User.find();

                return users;
            } catch (error) {
                throw error;
            }
        },
    },
});

export default broker;