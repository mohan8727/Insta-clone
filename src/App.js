import React, { useState,useEffect } from 'react';
import './App.css';
import Post from './Post';
import {db,auth} from './firebase';
import Modal from '@material-ui/core/Modal';
import {Button, Input} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ImageUpload from './imageUpload';
import InstagramEmbed from 'react-instagram-embed';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));



function App() {
  const classes=useStyles();
  const[modalStyle]=useState(getModalStyle);
  const [posts,setPosts]=useState([]);
  const [open ,setOpen]=useState(false);
  const [openSignIn,setOpenSignIn]=useState(false);
  const [username ,setUsername]=useState('');
  const [password ,setPassword]=useState('');
  const [email ,setEmail]=useState('');
  const [user,setUser]=useState(null);

useEffect(()=> {
const unsubscribe=auth.onAuthStateChanged((authUser )=>{
  if(authUser){
    console.log(authUser);
    setUser(authUser);
  
if(authUser.displayName)
{
console.log(authUser);
setUser(authUser);
}
else
{
  //if we just created someone
  return authUser.updateProfile({
    displayName:username,
  });
}
}else {
setUser(null);
}

})

return () =>{
  unsubscribe();
}
},[user,username]);

useEffect(()=>{
  db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot =>{
    setPosts(snapshot.docs.map(doc => ({
      id: doc.id,
      post:doc.data()
    })))
  })
})



const signUp=(event) =>{

event.preventDefault();
auth
.createUserWithEmailAndPassword(email,password)
.then((authUser) => {
  return authUser.user.updateProfile({
    displayName:username,
  })
})
.catch((error) => alert(error.message))
}

const signIn=(event) =>{
event.preventDefault();

auth
.signInWithEmailAndPassword(email,password)
.catch((error)  => alert(error.message));

setOpenSignIn(false);
}
  return (
    <div className="App">
      <Modal
    open={open}
    onClose={() =>setOpen(false)}
    >
    <div style={modalStyle} className={classes.paper}>
     <form  className="app__signup"> 
     <center>
      <img 
     className="app__headerImage"
    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
    alt=""
     />
     </center> 
     
     <Input
     placeholder="username"
     type="text"
     value={username}
     onChange={(e) =>setUsername(e.target.value)}
     />

     <Input
     placeholder="email"
     type="text"
     value={email}
     onChange={(e) =>setEmail(e.target.value)}
     />
     
     <Input
     placeholder="password"
     type="password"
     value={password}
     onChange={(e) =>setPassword(e.target.value)}
     />
    
    
     <Button  type="submit"  onClick={signIn}>Sign In</Button>
    </form>
    </div>
    </Modal>

    <div className="app__header">
    <img className="app__headerImage"
    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
    alt=""
    />

    </div>
    {user ? (
      <Button onClick={() => auth.signOut()}>Logout</Button>
    ):(
      <div  className="app__loginconc"> 
      <Button onClick={()=> setOpenSignIn(true)}>Sign In</Button>
     <Button onClick={()=> setOpen(true)}>Sign Up</Button>
     </div>
    )}
   
    
      <div className="app_posts">
        <div className="app_postsleft"> 
        {
        posts.map(({id,post}) => (
        <Post  key= {id}  postId={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}></Post>
        ))
      }
      </div>
     <div  className="app_postsright">
      <InstagramEmbed
  url='https://instagr.am/p/Zw9o4/'
  maxWidth={320}
  hideCaption={false}
  containerTagName='div'
  protocol=''
  injectScript
  onLoading={() => {}}
  onSuccess={() => {}}
  onAfterRender={() => {}}
  onFailure={() => {}}
/>
</div>
</div>     
      {user?.displayName ? (
        <ImageUpload   username={user.displayName} />
      ):(
        <h3> Sorry  you need to Login To Upload</h3>
      )}
    
   










      <Post username ="codesres" caption=" WOW !!! it's working" imageUrl="https://www.freecodecamp.org/news/content/images/size/w2000/2020/08/Screen-Shot-2020-08-08-at-10.06.22-PM.png"/>
      <Post username ="messi" caption=" being as a developer" imageUrl="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"/>
      <Post username ="mastero" caption=" WOW !!!! im a funny guy" imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTixAyPFsIU71D-X4SnZmqfRPyv6vnFAln7OA&usqp=CAU"/>
   
    
    </div>
  );
}

export default App;
