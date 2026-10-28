import type { User } from "./entity";
import type { Contract } from "../../prisma/contract.d"; // Шлях до твого контракту

export interface UserRepositoryContract {
    createUser: (email: string, password: string) => Promise<User>;
    getUserByEmail: (email: string) => Promise<User | null>;
}

export function createUserRepository(db: any): UserRepositoryContract {
    return {
        async createUser(email, password) {
            const model = db.models?.User || db.User || db.user || db.contract?.User;
            
            if (!model || typeof model.create !== 'function') {
                throw new Error("Contract client: User model or 'create' method not found on db instance.");
            }

            return model.create({ data: { email, password } });
        },

        async getUserByEmail(email) {
            const model = db.models?.User || db.User || db.user || db.contract?.User;
            
            if (!model || typeof model.findUnique !== 'function') {
                return null;
            }

            return model.findUnique({ where: { email } });
        }
    }
}