import React from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import { FcGoogle } from 'react-icons/fc'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const GoogleLogin = () => {
    const { googleLogin } = useAuth();
    const navigate = useNavigate();

    const credentialResponse = async (authResult) => {
        try {
            if (authResult['code']) {
                await googleLogin(authResult['code']);
                navigate('/shop');
            }
        } catch (error) {
            console.log('Error fetching user info:', error);
        }
    }

    const googleBtnLogin = useGoogleLogin({
        onSuccess: credentialResponse,
        onError: () => {
            console.log("Google login failed");
        },
        flow: 'auth-code',
        redirect_uri: window.location.origin, // Dynamic redirect URI
    });


    return (
        <button
            className="flex items-center justify-center gap-2 py-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-all active:scale-95"
            onClick={googleBtnLogin}>
            <FcGoogle className="text-lg" />
            <span className="text-sm font-medium text-neutral-600">Google</span>
        </button >
    )
}

export default GoogleLogin