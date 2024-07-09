import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { Button, message } from 'antd';
import { useRouter } from 'next/navigation';
import { auth } from '../app/firebase'; // import auth from your firebase config
import { useGoogleSignInMutation } from '../lib/api-slices/authApiSlice';
import { setUser } from '@/lib/slices/userSlice';

const OAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [googleSignIn, { isLoading }] = useGoogleSignInMutation();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log('Firebase User:', user);

      const userData = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      };

      const response = await googleSignIn(userData).unwrap();
      dispatch(setUser({ user: response, accessToken: response.token }));
      message.success('Login successful!');
      router.push('/');
    } catch (error) {
      console.error('Could not sign in with Google', error);
      message.error('Login failed!');
    }
  };

  return (
    <Button
      onClick={handleGoogleClick}
      className="text-secondary w-full mt-3"
      loading={isLoading}
    >
      Continue with Google
    </Button>
  );
};

export default OAuth;
