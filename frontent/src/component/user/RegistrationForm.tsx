import { useForm } from "react-hook-form";
import type { RegistrationForm } from "../../type/user";
import { useRegisterMutation } from "../../api/baseApi";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export function RegisterForm() {
    const {
        register,
        handleSubmit,
        setError,
        reset,
        formState: { errors },
    } = useForm<RegistrationForm>({
        mode: "onChange",
    });

    const [registerUser, { isLoading }] = useRegisterMutation();

    async function onSubmit(data: RegistrationForm) {
        try {
            const result = await registerUser(data).unwrap();
            reset();
            alert(`Succes Register! Welcom ${result.email}`);
        } catch (error) {
            const err = error as FetchBaseQueryError;
            if (err.status === 409) {
                setError("root", {
                    type: "server",
                    message: "Email already exists",
                });
            } else if (err.status === 400 || err.status === 401) {
                setError("root", {
                    type: "server",
                    message: "Invalid email or password",
                });
            } else if (err.status === 404) {
                setError("root", {
                    type: "server",
                    message: "User not found",
                });
            } else if (err.status === "FETCH_ERROR") {
                setError("root", {
                    type: "server",
                    message: "Failed to connect to server",
                });
            } else {
                setError("root", {
                    type: "server",
                    message: "Something went wrong",
                });
            }
        }
    }

    return (
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <p>Register</p>
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