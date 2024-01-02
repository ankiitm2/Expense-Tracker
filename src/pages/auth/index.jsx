import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate, Navigate } from 'react-router-dom';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';


export const Auth = () => {
    const navigate = useNavigate();
    const { isAuth } = useGetUserInfo();

    const signInWithGoogle = async () => {
        const results = await signInWithPopup(auth, provider)
        const authInfo = {
            userID: results.user.uid,
            name: results.user.displayName,
            profilePhoto: results.user.photoURL,
            isAuth: true,
        }
        localStorage.setItem("auth", JSON.stringify(authInfo));
        navigate('/expenseTracker');
    }

    if (isAuth) {
        return <Navigate to='/expenseTracker' />
    }

    return (
        <div className="Login-page">
            <figure>
                <img src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" alt="" className="w-25" />
            </figure>
            <p className="text-white fs-3">Sign in with Google to Continue</p>
            <button className="w-25 btn btn-primary" onClick={signInWithGoogle}><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png" className="w-25" alt="logo" />
                {""} Sign In
            </button>
        </div>

    )
}