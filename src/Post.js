import React, { useState, useEffect } from 'react';
import'./Post.css';
import Avatar from "@material-ui/core/Avatar";
import { db } from './firebase';
function Post({postId,username,caption,imageUrl}){
    
    const [comments,setComments]=useState([]);
    const [comment,setComment]=useState('');


    useEffect(()=>{
        let unsubscribe;
        if(postId){
           const  unsubscribe =db
            .collection("posts")
            .doc(postId)
            .collection("comments")
            .onSnapshot((snapshot)  => {
                setComments(snapshot.docs.map((doc) => doc.data()));
            })
        }
      return ()  =>{
          unsubscribe();
      };
   
   
    },[postId])
    
    return(
        <div  className="post">
            <div className="post_header"> 
            <Avatar
            className="post_avatar"
            alt="codesres"
            src="/static/images/avatar/1.jpg"
            />
            <h3> {username}</h3>
            </div>
       
         
          

         <img className="post_image" src={imageUrl} alt=""/>
        
         <h4 className="post_text"> <strong>{username}</strong>{caption}</h4>
         
         <form> 
        <input 
         className="post_input"
         typr="text"
         placeholder="add a comment...."
         value={comment}
         onChange={(e) =>setComment(e.target.value)}
         />

         </form>

        </div>
    )
}
export default Post;