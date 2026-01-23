import { GoogleOAuthProvider } from "@react-oauth/google";

const googleWrapperProvider = (children) => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      {children}
    </GoogleOAuthProvider>
  );
};

export const SigninWrapper = ({ children }) => {
  return googleWrapperProvider(children);
};