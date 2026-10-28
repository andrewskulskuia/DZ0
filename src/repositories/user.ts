import type { UserRepositoryContract } from "../domein/User/repository";
import type { User } from "../domein/User/entity";

export function createUserRepository(db: any): UserRepositoryContract {
    const userModel = db.orm.public.User;

    return {
        async createUser(email, password): Promise<User> {
            try {
                return await userModel.create({
                    email,
                    password,
                });
            } catch (error: any) {
                if (error?.sqlState === "23505") {
                    throw new Error(`Email ${email} is already used!`);
                }
                throw error;
            }
        },

        async getUserByEmail(email): Promise<User | null> {
            const result = await userModel.where({ email }).first();
            return result || null;
        },
    };
}