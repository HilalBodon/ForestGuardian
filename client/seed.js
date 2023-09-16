
const axios = require('axios');

const seedData = [
    {
      name: "Book 1",
      author: "Author 1",
      genre: "Genre 1",
      picture: "URL 1",
      review: "Review 1",
    },
    {
      name: "Book 2",
      author: "Author 2",
      genre: "Genre 2",
      picture: "URL 2",
      review: "Review 2",
    },
  ];

const authToken =  localStorage.getItem("token");


const seedBooks = async () => {
  try {
    for (const seed of seedData) {
      const response = await axios.post(
        'http://localhost:8080/api/books',
        seed,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log('Book seeded:', response.data);
    }
    console.log('Seeding completed.');
  } catch (error) {
    console.error('Error seeding:', error);
  }
};

seedBooks();
