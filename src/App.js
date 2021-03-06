
import './App.css';
import { FacebookAuthProvider, getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import app from './firebase.init';
import { useState } from 'react';
const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({});
  const [success,setSuccess] = useState('');
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const googleSignInBtn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        setUser(user);
        console.log(user);
        setSuccess('Successfully logged in');
      })
      .catch(error => {
        console.error('error', error);
      })
  }
  const facebookSignInBtn = () => {
    signInWithPopup(auth, facebookProvider)
      .then(result => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch(error => {
        console.error('error', error);
      })
  }
  const googleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
        setSuccess('');
      })
      .catch((error) => {
        setUser({});
      })

  }
  const githubSignInBtn = () => {
    signInWithPopup(auth,githubProvider)
    .then(result =>{
      const user = result.user;
      setUser(user)
      console.log(user);
    })
    .catch(error =>{
      console.error(error);
    })
  }

  return (
    <div className="App">
      {user.uid ?
        <button onClick={googleSignOut}>Sign Out</button>
        :
        <div>
          <button onClick={googleSignInBtn}>Google Sign In</button>
          <button onClick={facebookSignInBtn}>Facebook Sign In</button>
          <button onClick={githubSignInBtn}>Github Sign In</button>
        </div>
      }
      <h3 className='success'>{success}</h3>
      <h2>Name: {user.displayName}</h2>
      <p>Email: {user.email}</p>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
