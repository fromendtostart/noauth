import { useEffect } from 'react';
import './App.css';
import GoogleLogin from 'react-google-login';
import { gapi } from 'gapi-script';

const clientId = "53521480346-i60ruhb8i24lqk1g4bcg37i5gnqjkgp9.apps.googleusercontent.com";

const MOCKBIN_API_URL = "https://api.jsonbin.io/v3/b/6793ffd2acd3cb34a8d262d5";
const MASTER_KEY = "$2a$10$svmtkg5ryhVjWkf04V.ycOQcfSfwAj9BG3ageYhmiWkUrhekc7.zC";

function Login() {
  const responseGoogle = (response) => {
    if (response?.accessToken) {
      console.log("Access Token:", response.accessToken);

      fetch(MOCKBIN_API_URL, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "X-Access-Key": MASTER_KEY
        },
        body: JSON.stringify({ accessToken: response.accessToken })
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Mockbin Response:", data);
        })
        .catch((err) => {
          console.error("Error posting to Mockbin:", err);
        });
    } else {
      console.error("No access token received");
    }
  };

  return (
    <>
      <div className="component">
        <GoogleLogin
          clientId={clientId}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
        />
      </div>
    </>
  );
}

function App() {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId,
        scope: ""
      });
    }
    gapi.load('client:auth2', start);
  }, []);

  return (
    <div className="component">
      <Login />
    </div>
  );
}

export default App;
