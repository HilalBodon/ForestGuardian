// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import BookCard from "../BookCard";
// import AddBookForm from "../AddBookForm";
// import jwt_decode from "jwt-decode";
// import RecommendedBooks from "../RecommendedBooks";
// import BookDiscovery from "../Search/search";
// import styles from "./styles.module.css";

// const Main = ({ authToken }) => {
//   const [userId, setUserId] = useState(null);
//   const [showAddBookForm, setShowAddBookForm] = useState(true);
//   const [books, setBooks] = useState([]);
//   const [showRecommended, setShowRecommended] = useState(false);
//   const [showBookDiscovery, setShowBookDiscovery] = useState(true);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     window.location.reload();
//   };

//   useEffect(() => {
//     const decodedToken = jwt_decode(authToken);
//     const fetchedUserId = decodedToken._id;
//     setUserId(fetchedUserId);

//     const fetchBooks = async () => {
//       try {
//         const response = await axios.get("http://localhost:8080/api/books", {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//         });
//         setBooks(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchBooks();
//   }, [authToken]);

//   const handleBookAdded = (newBook) => {
//     setBooks([...books, newBook]);
//   };

//   return (
//     <div className={styles.main_container}>
//       <nav className={styles.navbar}>
//         <h1>ShareBook</h1>
//         <button
//           className={styles.btn}
//           onClick={() => {
//             setShowAddBookForm(!showAddBookForm);
//           }}
//         >
//           + Add New Book
//         </button>
//         <button
//           className={styles.btn}
//           onClick={() => {
//             setShowRecommended(!showRecommended);
//           }}
//         >
//           {showRecommended ? "All Books" : "Recommended Books"}
//         </button>
//         <button className={styles.white_btn} onClick={handleLogout}>
//           Logout
//         </button>
//       </nav>


// {showBookDiscovery && (
//         <div className={styles.search_add}>
//           <BookDiscovery authToken={authToken}/>
		  
//         </div>
//       )}
	  
//       {!showAddBookForm && (
// 				<AddBookForm
// 		authToken={authToken}
// 		onBookAdded={handleBookAdded}
// 		setShowAddBookForm={setShowAddBookForm}
// 		/>
//       )}

//       <div className={styles.books_container}>
//         {showRecommended ? (
//           <RecommendedBooks authToken={authToken} />
//         ) : (
//           books.map((book) => (
//             <BookCard
//               key={book._id}
//               book={book}
//               authToken={authToken}
//               userId={userId}
//             />
//           ))
//         )}
//       </div>


//     </div>
//   );
// };

// export default Main;



import React, { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "../BookCard";
import AddBookForm from "../AddBookForm";
import jwt_decode from "jwt-decode";
import RecommendedBooks from "../RecommendedBooks";
import BookDiscovery from "../Search/search";
import styles from "./styles.module.css";
import  {FaBars} from 'react-icons/fa';
import  {FaEllipsisV} from 'react-icons/fa';
import nameLogo from "../../assets/images/nameLogo.svg";

const Main = ({ authToken }) => {
  const [userId, setUserId] = useState(null);
  const [showAddBookForm, setShowAddBookForm] = useState(true);
  const [books, setBooks] = useState([]);
  const [showRecommended, setShowRecommended] = useState(false);
  const [showBookDiscovery, setShowBookDiscovery] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   window.location.reload();
  // };

  useEffect(() => {
    const decodedToken = jwt_decode(authToken);
    const fetchedUserId = decodedToken._id;
    setUserId(fetchedUserId);

    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/books", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setBooks(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBooks();
  }, [authToken]);

  // const handleBookAdded = (newBook) => {
  //   setBooks([...books, newBook]);
  // };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };
  
  return (

    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <p className={styles.menuIcon}><FaBars /></p>
        <div className={styles.logoDot}>
          <div><img className={styles.nameLogo} src={nameLogo} alt="NameLogo" /></div>
          <div className={styles.dotesIconDiv}>
            <FaEllipsisV className={styles.dotesIcon} onClick={toggleDropdown} />

            {isDropdownOpen && (
              <div className={styles.dropdownContent}>
                <a href="#" onClick={closeDropdown} className={styles.dropdownItem}>
                  <span className={styles.icon}>🔧</span> Settings
                </a>
                <a href="#" onClick={closeDropdown} className={styles.dropdownItem}>
                  <span className={styles.icon}>🕒</span> History
                </a>
                <a href="#" onClick={closeDropdown} className={styles.dropdownItem}>
                  <span className={styles.icon}>📊</span> Analytics
                </a>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className={styles.books_container}>
        {books.map((book) => (
        <BookCard 
        key={book._id}
        book={book}
        authToken={authToken}
        userId={userId}
        />
        ))}
      </div>
    </div>
  );
};

export default Main;

        {/* <button
          className={styles.btn}
          onClick={() => {
            setShowAddBookForm(!showAddBookForm);
          }}
        >
          + Add New Book
        </button> */}

        {/* <button
          className={styles.btn}
          onClick={() => {
            setShowRecommended(!showRecommended);
          }}
        >
          {showRecommended ? "All Books" : "Recommended Books"}
        </button> */}

        {/* <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button> */}

{/* 

{showBookDiscovery && (
        <div className={styles.search_add}>
          <BookDiscovery authToken={authToken}/>
		  
        </div>
      )} */}
	  
      {/* {!showAddBookForm && (
				<AddBookForm
		authToken={authToken}
		onBookAdded={handleBookAdded}
		setShowAddBookForm={setShowAddBookForm}
		/>
      )} */}



