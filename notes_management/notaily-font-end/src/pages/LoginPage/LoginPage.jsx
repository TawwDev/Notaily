import logo from "../../assets/images/logo.jpg";
import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./LoginPage.scss";
function LoginPage() {
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

                            <form className="login-content__form">
                                <div className="login-content__input">
                                    <input type="text" className="login-content__email form-control" placeholder="Email" />
                                    <input type="password" className="login-content__password form-control" placeholder="Password" />
                                </div>
                                <div className="login-content__action">
                                    <div>
                                        <input type="checkbox" className="custom-control-input" />
                                        <span>Remember Me</span>
                                    </div>
                                    <NavLink to={"/forgot-password"}>Forgot Password?</NavLink>
                                </div>
                                <button className="login-content__button">Sign In</button>
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