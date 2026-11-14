import { useForm } from "react-hook-form";
import type { LoginForm as LoginFormType } from "../../type/user";
import { useLoginMutation } from "../../api/baseApi";

export function LoginForm(){
    const { register, handleSubmit } = useForm<LoginFormType>()
    const [ login, { isLoading }] = useLoginMutation()

    async function onSubmit(data: LoginFormType){
        try{
            const result = await login(data).unwrap()
            alert(`Succes Login! Welcom ${result.email}`)
        }
        catch(error){
            alert(`error: ${JSON.stringify(error)}`)
        }
    }

    return(
        <form action="" className="form" onSubmit={handleSubmit(onSubmit)}>
            <p>Login</p>
            <div className="inputs">
                <div className="email-div">
                    <input 
                        type="email" 
                        placeholder="email" 
                        className="email-input"
                        {...register("email")}
                    />
                </div>
                <div className="password-div">
                    <input 
                        type="password" 
                        placeholder="password" 
                        className="password-input"
                        {...register("password")}
                    />
                </div>
            </div>
            <div className="">
                <button className="send-form-button" type="submit" disabled={isLoading}>
                    {isLoading ? "Submitting" : "Submit"}
                </button>
            </div>
        </form>
    )
}