import { GoogleLogin } from 'react-google-login';

const handleGoogleResponse = async (response) => {
  const { tokenId } = response;
  
  const res = await fetch('http://localhost:5000/auth/google-login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tokenId }),
  });

  const data = await res.json();
  console.log('User:', data);
};

<GoogleLogin
  clientId="your_google_client_id"
  buttonText="Login with Google"
  onSuccess={handleGoogleResponse}
  onFailure={(err) => console.log('Login Failed', err)}
  cookiePolicy={'single_host_origin'}
/>;
