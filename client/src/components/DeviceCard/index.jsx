import React, { useState ,useEffect } from "react";
import styles from "./DeviceCard.module.css"; 
import axios from "axios";

const DeviceCard = ({ authToken, book ,userId }) => {
  
  // const [isLiked, setIsLiked] = useState(false);
  // const [isFollowing, setIsFollowing] = useState(false);
  // const [creatorName, setCreatorName] = useState("");

  // useEffect(() => {
  //   const fetchCreatorName = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:8080/api/users/${book.user}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${authToken}`,
  //           },
  //         }
  //       );
  //       setCreatorName(response.data.name);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchCreatorName();
  // }, [authToken, book.user]);

  
  // const handleLike = async () => {
  //   try {

  //     await axios.post(
  //       `http://localhost:8080/api/books/like/${book._id}`,
  //       { userId},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${authToken}`,
  //         },
  //       }
  //     );

  //     setIsLiked(true);
  //     book.likes.push(userId);
  //     console.log("Liked!");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
// _________________________________________________

  // const handleUnlike = async () => {
  //   try {
  //     await axios.post(
  //     `http://localhost:8080/api/books/remove-like/${book._id}`,
  //     { userId},
  //     {
  //       headers: {
  //         Authorization: `Bearer ${authToken}`,
  //       },
  //     }
  //   );
  //     setIsLiked(false);
  //     book.likes = book.likes.filter((likeId) => likeId !== userId); 
  //     console.log("Unliked!");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

// _________________________________________________________

  // const handleFollow = async () => {
  //   try {
  //     await axios.post(
  //       `http://localhost:8080/api/users/follow/${userId}`,
  //       { bookId: book._id },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${authToken}`,
  //         },
  //       }
  //     );
  //     setIsFollowing(true);
  //     console.log("Followed!");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
// ____________________________________________________________________

  // const handleUnfollow = async () => {
  //   try {
  //     await axios.post(
  //       `http://localhost:8080/api/users/unfollow/${userId}`,
  //       { bookId: book._id },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${authToken}`,
  //         },
  //       }
  //     );
  //     setIsFollowing(false);
  //     console.log("Unfollowed!");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
// ______________________________________________________________

  return (
    <div className={styles.mainContainer}>
      <div className={styles.card}>
          <img src={book.picture} alt="Tree IMAGE" />
          <h3 className={styles.title}>{book.name}</h3>
      </div>
    </div>     
  );
};

{/* 
        <div className={styles.btns}>
        <p  className={styles.author}>Created By: {creatorName}</p>
        </div> */}

       {/* <div className={styles.btns}>
        {isFollowing ? (
          <button className={styles.followButton} onClick={handleUnfollow}>- Unfollow</button>
        ) : (
          <button className={styles.followButton} onClick={handleFollow}>+ Follow</button>
        )} */}
  {/* <button
    className={`${styles.likeButton} ${isLiked ? styles.liked : ''}`}
    onClick={isLiked ? handleUnlike : handleLike}
  >
    <span role="img" aria-label="Like">{isLiked ? '❤️' : '🤍'} </span>
    {book.likes.length}
  </button> */}

      {/* </div> */}


export default DeviceCard;
