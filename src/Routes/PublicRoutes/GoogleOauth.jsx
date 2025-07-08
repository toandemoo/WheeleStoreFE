const server = import.meta.env.VITE_SERVER;

export const GoogleOauthLogin = () => {
   window.location.href = `${server}/api/googleoauth/login-google`;
};