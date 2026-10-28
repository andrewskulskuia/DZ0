export function createUserService(repository: any) {
    return {
        async register(email: string, password: string) {
            const user = await repository.createUser(
                email.trim(),
                password
            )

            return {
                id: user.id,
                email: user.email,
            }
        },

        async login(email: string, password: string) {
            const user = await repository.getUserByEmail(email.trim())

            if (!user || user.password !== password) {
                throw new Error("INVALID CREDENTIALS")
            }

            return {
                user: {
                    id: user.id,
                    email: user.email,
                },
                token: "token-" + user.id,
            }
        },
    }
}