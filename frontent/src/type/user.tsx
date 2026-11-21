export interface UserForm{
    email: string
    password: string
}

export interface User{
    id: number
    email: string
}
export type RegistrationForm = UserForm
export type LoginForm = UserForm