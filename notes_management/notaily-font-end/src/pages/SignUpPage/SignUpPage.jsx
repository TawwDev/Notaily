import logo from "../../assets/images/logo.jpg";
import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./SignUppage.scss"
import { use, useState } from "react";
import { useForm } from "react-hook-form";
import { isEmpty, isValidUsername, isValidEmail, isValidPassword, isValidName } from "../../util/validator";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { apiAuth } from "../../api/AuthenticationApi";
import {popupSuccess} from "../../util/popups";

function SignUpPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [apiError, setApiError] = useState("");
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const {
        register,
        handleSubmit,
        getValues,
        reset,
        formState: { errors }
    } = useForm({
        mode: "onTouched"
    });

    const onSubmit = async (data) => {
        try {
            const response = await apiAuth.signUp(data.username, data.password, data.email, data.firstName, data.lastName);
            setApiError("");
            reset();
            console.log(data);
            console.log("sign-up success", response);
            popupSuccess("Đăng kí thành công!");
        } catch (error) {
            if (error.response) {
                const serverMessage = error.response.data.message;
                setApiError(serverMessage);
                console.log("Lỗi từ Server:", serverMessage);
            }
        }
    }

    return (
        <>
            <section className="sign-up">
                <div className="container">
                    <div className="sign-up-content">
                        <div className="sign-up-content__logo">
                            <img src={logo}></img>
                            <span>Notaily</span>
                        </div>
                        <div className="sign-up-content__header">
                            <div className="sign-up-content__text">
                                <h4>Sign Up</h4>
                                <span>Create your account.</span>
                            </div>
                            <form className="sign-up-content__form" onSubmit={handleSubmit(onSubmit)}>
                                <div className="sign-up-content__name">
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                                            placeholder="First Name"
                                            {...register("firstName", {
                                                required: "Vui lòng nhập tên.",
                                                validate: {
                                                    notEmpty: (value) => !isEmpty(value) || "Không được chứa chỉ khoảng trắng",
                                                    validFormat: (value) =>
                                                        isValidName(value) || "Vui lòng nhập đúng định dạng(chỉ chứa kí tự)."
                                                }
                                            })}
                                        />
                                        <div>
                                            {errors.firstName && <small className="text-danger">{errors.firstName.message}</small>}
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                                            placeholder="Last Name"
                                            {...register("lastName", {
                                                required: "Vui lòng nhập họ.",
                                                validate: {
                                                    notEmpty: (value) => !isEmpty(value) || "Không được chứa chỉ khoảng trắng",
                                                    validFormat: (value) =>
                                                        isValidName(value) || "Vui lòng nhập đúng định dạng(chỉ chứa kí tự)."
                                                }
                                            })}
                                        />
                                        <div>
                                            {errors.lastName && <small className="text-danger">{errors.lastName.message}</small>}
                                        </div>
                                    </div>

                                </div>
                                <div className="mb-3">
                                    <input
                                        type="email"
                                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                        placeholder="Email"
                                        {...register("email", {
                                            required: "Vui lòng nhập email.",
                                            validate: {
                                                notEmpty: (value) => !isEmpty(value) || "Không được chứa chỉ khoảng trắng",
                                                validFormat: (value) =>
                                                    isValidEmail(value) || "Vui lòng nhập đúng định dạng Email."
                                            }
                                        })}
                                    />
                                    <div>
                                        {errors.email && <small className="text-danger">{errors.email.message}</small>}
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className={`form-control ${errors.username ? "is-invalid" : ""}`}
                                        placeholder="Username"
                                        {...register("username", {
                                            required: "Vui lòng nhập user name.",
                                            validate: {
                                                notEmpty: (value) => !isEmpty(value) || "Không được chứa chỉ khoảng trắng",
                                                validFormat: (value) =>
                                                    isValidUsername(value) || "Vui lòng nhập đúng định dạng. (kí tự & số)"
                                            }
                                        })}
                                    />
                                    <div>
                                        {errors.username && <small className="text-danger">{errors.username.message}</small>}
                                    </div>
                                </div>

                                <div className="sign-up-content__password">
                                    <div className="mb-3">
                                        <div className="password-wrapper">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                className={`form-control ${errors.password ? "password-invalid" : ""}`}
                                                placeholder="Password"
                                                {...register("password", {
                                                    required: "Vui lòng nhập password",
                                                    validate: {
                                                        notEmpty: (value) => !isEmpty(value) || "Không được chứa chỉ khoảng trắng",
                                                        validFormat: (value) =>
                                                            isValidPassword(value) || "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt."
                                                    }
                                                })}
                                            />
                                            <button
                                                className="btn btn-show-pass"
                                                type="button"
                                                onClick={togglePasswordVisibility}
                                            >
                                                {showPassword ? (
                                                    <IoEyeOffOutline />
                                                ) : (
                                                    <IoEyeOutline />
                                                )}
                                            </button>
                                        </div>
                                        <div>
                                            {errors.password && <small className="text-danger">{errors.password.message}</small>}
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="confirm-password-wrapper">
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                className={`form-control ${errors.confirmPassword ? "password-invalid" : ""}`}
                                                placeholder="Confirm password"
                                                {...register("confirmPassword", {
                                                    required: "Vui lòng nhập confirm password",
                                                    validate: {
                                                        notEmpty: (value) =>
                                                            !isEmpty(value) || "Không được chứa chỉ khoảng trắng",
                                                        validFormat: (value) =>
                                                            isValidPassword(value) || "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.",
                                                        matchesPreviousPassword: (value) =>
                                                            value === getValues("password") || "Mật khẩu xác nhận không khớp."
                                                    }
                                                })}
                                            />
                                            <button
                                                className="btn btn-show-confirm-pass"
                                                type="button"
                                                onClick={toggleConfirmPasswordVisibility}
                                            >
                                                {showConfirmPassword ? (
                                                    <IoEyeOffOutline />
                                                ) : (
                                                    <IoEyeOutline />
                                                )}
                                            </button>
                                        </div>
                                        <div>
                                            {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword.message}</small>}
                                            {apiError === "" ? "" : <small className="text-danger">{apiError}</small>}
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="sign-up-content__action">
                                    <input type="checkbox" className="custom-control-input" />
                                    <span>I agree with the terms of use</span>
                                </div> */}
                                <div className="sign-up-content__footer">
                                    <button className="sign-up-content__button">Sign Up</button>
                                    <div className="sign-up-content__sign-in">
                                        <span>Already have an Account </span>
                                        <NavLink to={"/login"}>Sign In</NavLink>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SignUpPage;