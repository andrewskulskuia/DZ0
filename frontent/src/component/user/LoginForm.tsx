import { useForm } from "react-hook-form";
import type { LoginForm as LoginFormType } from "../../type/user";
import { useLoginMutation } from "../../api/baseApi";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export function LoginForm() {
    const {
        register,
        handleSubmit,
        setError,
        reset,
        formState: { errors },
    } = useForm<LoginFormType>({
        mode: "onChange",
    });

    const [login, { isLoading }] = useLoginMutation();

    async function onSubmit(data: LoginFormType) {
        try {
            const result = await login(data).unwrap();
            reset();
            alert(`Succes Login Welcom ${result.email}`);
        } catch (error) {
            const err = error as FetchBaseQueryError
            if (err.status === 400 || err.status === 401) {
                setError("root", {
                    type: "server",
                    message: "invalid email or password",
                });
          } else if (err.status === 404) {
                setError("root", {
                    type: "server",
                    message: "user not found",
                });
            } else if (err.status === "FETCH_ERROR") {
                setError("root", {
                    type: "server",
                    message: "failed to connect to server",
                });
            } else {
                setError("root", {
                    type: "server",
                    message: "something went wrong",
                });
            }
        }
    }

    return (
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <p>Login</p>
            {errors.root && <div className="error">{errors.root.message}</div>}
            <div className="inputs">
                <div className="email-div">
                    <input
                        type="email"
                        placeholder="email"
                        className="email-input"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^\S+@\S+\.\S+$/,
                                message: "Invalid email format",
                            },
                        })}
                    />
                    {errors.email && <span className="error">{errors.email.message}</span>}
                </div>
                <div className="password-div">
                    <input
                        type="password"
                        placeholder="password"
                        className="password-input"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Minimum 6 characters",
                            },
                        })}
                    />
                    {errors.password && (
                        <span className="error">{errors.password.message}</span>
                    )}
                </div>
            </div>
            <div>
                <button className="send-form-button" type="submit" disabled={isLoading}>
                    {isLoading ? "Submitting" : "Submit"}
                </button>
            </div>
        </form>
    );
}