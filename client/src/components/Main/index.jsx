import React, { useState, useEffect, useRef } from 'react';
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
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const sideMenuRef = useRef(null);



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
    // setIsDropdownOpen(false);

  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
    setIsDropdownOpen(false);  };

  const closeSideMenu = () => {
    setIsSideMenuOpen(false);
    setIsDropdownOpen(false);    
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isSideMenuOpen && !sideMenuRef.current.contains(e.target)) {
        closeSideMenu();
      }
    };

    if (isSideMenuOpen) {
      window.addEventListener('click', handleOutsideClick);
    } else {
      window.removeEventListener('click', handleOutsideClick);
    }
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [isSideMenuOpen]);



  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <p className={styles.menuIcon}><FaBars onClick={toggleSideMenu} /></p>
        {isSideMenuOpen && (
          <div className={styles.overlay}></div>
        )}
        <div
          ref={sideMenuRef}
          className={`${styles.sideMenu} ${isSideMenuOpen ? styles.open : ''}`}
        >
          <div className={styles.sideMenuContent}>
            <a href="#" onClick={closeSideMenu} className={styles.sideMenuItem}>
              Add Device
            </a>
            <a href="#" onClick={closeSideMenu} className={styles.sideMenuItem}>
              About Us
            </a>
            <a href="#" onClick={closeSideMenu} className={styles.sideMenuItem}>
              How to Use App
            </a>
            <a href="#" onClick={closeSideMenu} className={styles.sideMenuItem}>
              Account Settings
            </a>
            <a href="#" onClick={closeSideMenu} className={styles.sideMenuItem}>
              Logout
            </a>
          </div>
        </div>
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



