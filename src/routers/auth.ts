import { Router } from 'express'

export function createAuthRouter(userService: any) {
    const router = Router()

    router.post('/sign-up', async (req, res) => {
        try {
            const { email, password } = req.body
            const user = await userService.register(email, password)
            res.status(201).json(user)
        } catch (error: any) {
            if (error.code === 'P2002') {
                return res.status(409).json({ error: 'Email already exists' })
            }
            res.status(400).json({ error: error.message })
        }
    })

    router.post('/sign-in', async (req, res) => {
        try {
            const { email, password } = req.body
            const result = await userService.login(email, password)
            res.cookie('accessToken', result.token, { httpOnly: true })
            res.json(result.user)
        } catch {
            res.status(401).json({ error: 'INVALID CREDENTIALS' })
        }
    })

    return router
}