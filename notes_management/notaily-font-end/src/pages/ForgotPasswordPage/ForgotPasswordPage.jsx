import logo from "../../assets/images/logo.jpg";
import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./ForgotPasswordPage.scss";
function ForgotPassWordPage() {
    return (
        <>
            <section className="reset-pass">
                <div className="container">
                    <div className="reset-pass-content">
                        <div className="reset-pass-content__logo">
                            <img src={logo}></img>
                            <span>Notaily</span>
                        </div>
                        <div className="reset-pass-content__header">
                            <div className="reset-pass-content__text">
                                <h4>Reset Password</h4>
                                <span>Enter your email address and we'll send you an email with instructions to reset your password..</span>
                            </div>
                            <form className="reset-pass-content__form">
                                <input type="text" className="form-control" placeholder="Email" />
                                <button className="reset-pass-content__button">Reset Password</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ForgotPassWordPage;