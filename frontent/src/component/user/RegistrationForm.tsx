import { useForm } from "react-hook-form";
import type { RegistrationForm} from "../../type/user";
import { useRegisterMutation } from "../../api/baseApi";

export function RegisterForm(){
    const { register, handleSubmit } = useForm<RegistrationForm>()
    const [ registerUser, { isLoading }] = useRegisterMutation()

    async function onSubmit(data: RegistrationForm){
        try{
            const result = await registerUser(data).unwrap()
            alert(`Succes Register! Welcom ${result.email}`)
        }
        catch(error){
            alert(`error: ${JSON.stringify(error)}`)
        }
    }

    return(
        <form action="" className="form" onSubmit={handleSubmit(onSubmit)}>
            <p>Register</p>
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