import logo from "../../assets/images/logo.jpg";
import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./LoginPage.scss";
import { apiAuth } from "../../api/AuthenticationApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isEmpty, isValidUsername, isValidEmail, isValidPassword } from "../../util/validator";
import { useForm } from "react-hook-form";

function LoginPage() {
    const [form, setForm] = useState({ username: "", password: "" });
    const [apiError, setApiError] = useState("");
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: "onTouched"
    });

    const onSubmit = async (data) => {
        try {
            const response = await apiAuth.logIn(data.username, data.password);

            if (!response) {
                console.log("Login failed", response);
                setApiError("Tài khoản hoặc mật khẩu không đúng.");
                return;
            }
            console.log("Login success", response);
            setTimeout(() => navigate("/"), 1000);
        } catch (err) {
            alert.error("Sai thông tin đăng nhập");
        }
    };

    return (
        <>
            <section className="login">
                <div className="container">
                    <div className="login-content">
                        <div className="login-content__logo">
                            <img src={logo}></img>
                            <span>Notaily</span>
                        </div>
                        <div className="login-content__header">
                            <div className="login-content__text">
                                <h4>Sign In</h4>
                                <span>Login to stay connected</span>
                            </div>
                            <form className="login-content__form" onSubmit={handleSubmit(onSubmit)}>
                                <div className="login-content__input">
                                    <div className="mb-3 ">
                                        <input
                                            type="text"
                                            className={`login-content__email form-control ${errors.username ? "is-invalid" : ""}`}
                                            placeholder="Email or UserName"
                                            {...register("username", {
                                                required: "Vui lòng nhập tên đăng nhập.",
                                                validate: {
                                                    notEmpty: (value) => !isEmpty(value) || "Không được chứa chỉ khoảng trắng",
                                                    validFormat: (value) => 
                                                        (isValidEmail(value) || isValidUsername(value)) || "Vui lòng nhập đúng định dạng Email hoặc chỉ chứa kí tự."
                                                }
                                            })}
                                        />
                                        {errors.username && <small className="text-danger">{errors.username.message}</small>}
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="password"
                                            className={`login-content__password form-control ${errors.password ? "is-invalid" : ""}`}
                                            placeholder="Password"
                                            {...register("password", {
                                                required: "Vui lòng nhập mật khẩu"
                                            })}
                                        />
                                        {errors.password && <small className="text-danger">{errors.password.message}</small>}
                                        {apiError && <small className="text-danger">{apiError}</small>}
                                    </div>

                                </div>

                                <div className="login-content__action">
                                    <div>
                                        <input type="checkbox" className="custom-control-input" />
                                        <span>Remember Me</span>
                                    </div>
                                    <NavLink to={"/forgot-password"}>Forgot Password?</NavLink>
                                </div>
                                <button type="submit" className="login-content__button">Sign In</button>
                                <div className="login-content__sign-up">
                                    <span>Create an Account </span>
                                    <NavLink to={"/sign-up"}>Sign Up</NavLink>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default LoginPage;