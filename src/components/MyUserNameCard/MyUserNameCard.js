import React from 'react';
import firebase from "../../firebase"
import 'firebase/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Container from '@material-ui/core/Container';
import "./MyUserNameCard.css";
const auth = firebase.auth();
const firestore = firebase.firestore();

function MyUserNameCard() {
    const { uid } = auth.currentUser;

    const usersRef = firestore.collection('users'); 
    const query = usersRef.where('uid', '==', uid).limit(1)

    const [users] = useCollectionData(query, { idField: 'id' });
    
    return (
        <div className= "ContentArea">
        <Container className="MyUserNameCard" maxWidth="sm">
            <div className="container">
              <div className="row">
                  {/* <img className="col-4 MyUserImage" src={photoURL} alt="photoURL"></img> */}
                  <div className="col MyUserNamePlate">
                    {users && users.map(user => <User key={user.id} message={user} />)}

                  </div>
              </div>
            </div>
        </Container>
        </div>
    )
}

function User(props) {
  const {displayName, photoURL} = props.message;
  return(

    <div className='container center-container'>
      <br></br>

      <div className='row photo'>
        <img  className="col-12 MyUserImage" src={photoURL} alt="photoURL"></img>
      </div>

      <hr></hr>

      <div className='row namePlate'>
        <div className='col-12 MyUserNamePlate'><h2>{displayName}</h2></div>
      </div>
      
      <br></br>
    </div>
    
  )
}

export default MyUserNameCard;