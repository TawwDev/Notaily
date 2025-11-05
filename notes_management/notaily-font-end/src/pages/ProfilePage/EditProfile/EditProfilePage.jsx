import "./EditProfilePage.scss";
import { useState } from "react";

function EditProfilePage() {
    const [activeTab, setActiveTab] = useState("info"); // "info" | "password"

    return (
        <div className="edit-profile-page">
            <div className="edit-profile-card">
                <div className="tabs">
                    <button
                        className={`tab ${activeTab === "info" ? "active" : ""}`}
                        onClick={() => setActiveTab("info")}
                    >
                        Personal Information
                    </button>
                    <button
                        className={`tab ${activeTab === "password" ? "active" : ""}`}
                        onClick={() => setActiveTab("password")}
                    >
                        Change Password
                    </button>
                </div>

                <div className="form-body">
                    {activeTab === "info" ? <UserInfoForm /> : <ChangePasswordForm />}
                </div>

                <div className="form-footer">
                    <button className="btn-cancel">Cancel</button>
                    <button className="btn-save">Save Changes</button>
                </div>
            </div>
        </div>
    );
}

function UserInfoForm() {
    return (
        <div className="user-info__container">
            <div className="row">
                <div className="form-group col-6">
                    <label>First Name</label>
                    <input type="text" placeholder="Enter first name" className="form-control" />
                </div>
                <div className="form-group col-6">
                    <label>Last Name</label>
                    <input type="text" placeholder="Enter last name" className="form-control" />
                </div>
            </div>
            <div className="row">
                <div className="form-group col-6">
                    <label>Gender</label>
                    <div className="radio-group col-6">
                        <label className="radio-label">
                            <input type="radio" name="gender" defaultChecked />
                            <span>Male</span>
                        </label>
                        <label className="radio-label">
                            <input type="radio" name="gender" />
                            <span>Female</span>
                        </label>
                    </div>
                </div>
                <div className="form-group col-6">
                    <label>Date of Birth</label>
                    <input type="date" className="form-control" />
                </div>
            </div>

            <div className="row">
                <div className="form-group col-6">
                    <label>Username</label>
                    <input type="text" placeholder="Enter username" className="form-control" />
                </div>
                <div className="form-group col-6">
                    <label>Email</label>
                    <input type="email" placeholder="example@domain.com" className="form-control" />
                </div>
            </div>
        </div>
    );
}

function ChangePasswordForm() {
    return (
        <div className="form-stack">
            <div className="form-group">
                <label>Current Password</label>
                <input type="password" placeholder="Enter current password" className="form-control" />
            </div>
            <div className="form-group">
                <label>New Password</label>
                <input type="password" placeholder="Enter new password" className="form-control" />
            </div>
            <div className="form-group">
                <label>Confirm New Password</label>
                <input type="password" placeholder="Confirm new password" className="form-control" />
            </div>
        </div>
    );
}

export default EditProfilePage;