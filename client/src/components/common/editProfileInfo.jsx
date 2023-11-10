import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import {
    UPDATE_USER_EMAIL, UPDATE_USER_PASSWORD, UPDATE_USER_USERNAME, LOGIN_USER
} from '../../utils/mutations';

import Auth from '../../utils/auth';

function ProfileEditComponent() {
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [message, setMessage] = useState('');
    const [isReAuth, setIsReAuth] = useState(false);
    const [signinState, setSigninState] = useState({ email: '', password: '' });
    const [userId, setUserId] = useState(null);

    const [updateUserPassword] = useMutation(UPDATE_USER_PASSWORD);
    const [updateUserEmail] = useMutation(UPDATE_USER_EMAIL);
    const [updateUserUsername] = useMutation(UPDATE_USER_USERNAME);
    const [login] = useMutation(LOGIN_USER);

    useEffect(() => {

        const token = Auth.getToken();
        const userProfile = Auth.getProfile(token);
        console.log(userProfile._id);
        setUserId(userProfile._id);


        // This assumes that we are logged in
        // setUserId(Auth.getProfile().data._id);
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setSigninState({
            ...signinState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(signinState);
        try {
            const { data } = await login({
                variables: { ...signinState },
            });

            Auth.login(data.login.token);
        } catch (e) {
            console.error(e);
        }
        setIsReAuth(true);
    }

    const validatePassword = () => {
        return newPassword === confirmPassword;
    };


    const handlePasswordChange = async () => {
        if (!validatePassword()) {
            setMessage('Passwords do not match.');
            return;
        }
        try {
            const { data } = await updateUserPassword({
                variables: {
                    password: newPassword,
                },
            });

            setNewPassword('');
        } catch (error) {
            console.error(error);
            setMessage('Failed to change password');
        }
    };

    const handleEmailChange = async () => {
        try {
            const { data } = await updateUserEmail({
                variables: {
                    email: newEmail,
                },
            });

            setNewEmail('');
        } catch (error) {
            console.error(error);
            setMessage('Failed to change email');

        }
    };

    const handleUsernameChange = async () => {
        try {
            const { data } = await updateUserUsername({
                variables: {
                    username: newUsername,
                },
            });

            setNewUsername('');
        } catch (error) {
            console.error(error);
            setMessage('Failed to change username');

        }
    };

    const handleProfileEdit = async () => {
        if (newPassword) {
            await handlePasswordChange();
        }
        if (newEmail) {
            await handleEmailChange();
        }
        if (newUsername) {
            await handleUsernameChange();
        }
        setMessage('Profile Updated');
    };

    return (
        <div>
            <h2>Edit Profile</h2>
            {!isReAuth && (
                <div>
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={signinState.email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={signinState.password}
                        onChange={handleChange}
                    />
                    <button onClick={handleFormSubmit}>Reauthenticate</button>
                </div>
            )}
            {isReAuth && (
                <div>
                    <input
                        type="email"
                        placeholder="New Email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <input 
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="New Username"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                    />
                    <button onClick={handleProfileEdit}>Save Changes</button>
                    <p>{message}</p>
                </div>
            )}
        </div>
    );
};
export default ProfileEditComponent;