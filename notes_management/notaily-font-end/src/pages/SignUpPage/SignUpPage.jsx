import logo from "../../assets/images/logo.jpg";
import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./SignUppage.scss"
function SignUpPage() {
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
                            <form className="sign-up-content__form">
                                <div className="sign-up-content__name">
                                    <input type="text" className="form-control" placeholder="First Name" />
                                    <input type="text" className="form-control" placeholder="Last Name" />
                                </div>
                                <input type="email" className="form-control" placeholder="Email" />
                                <div className="sign-up-content__password">
                                    <input type="password" className="form-control" placeholder="Password" />
                                    <input type="password" className="form-control" placeholder="Confirm password" />
                                </div>
                                <div className="sign-up-content__action">
                                    <input type="checkbox" className="custom-control-input" />
                                    <span>I agree with the terms of use</span>
                                </div>
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