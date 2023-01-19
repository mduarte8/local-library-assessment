const { getAuthorById } = require("./accounts");

function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  const firstInstance = 0;
  return books.reduce((accumulator, book) => 
    !book.borrows[firstInstance].returned ? accumulator+1: accumulator,0); 
}

function getMostCommonGenres(books) {
  const maxArrayLength = 5;
  let genreArray = [];
  books.forEach((bookElement) => {
    if (!genreArray.some((genreArrayElem)=> {
      return genreArrayElem.name === bookElement.genre;
    })) {
      let newObj = {name: bookElement.genre, count: 1};
      genreArray.push(newObj)
    } else {
      genreArray.find((genreArrayElem) => genreArrayElem.name === bookElement.genre).count += 1;
    }
    genreArray.sort((genreA, genreB)=> genreB.count - genreA.count);
    return genreArray;
  })

  return genreArray.length > 5 ? genreArray.slice(0,maxArrayLength): genreArray;
}

function getMostPopularBooks(books) {
  const maxArrayLength = 5;
  let popularBookArray = [];
  books.forEach((book) => {
    popularBookArray.push({name: book.title, count: book.borrows.length});
  })
  popularBookArray.sort((bookA, bookB) => bookB.count - bookA.count);
  return popularBookArray.length > maxArrayLength ? popularBookArray.slice(0, maxArrayLength) : popularBookArray;
}

function getMostPopularAuthors(books, authors) {
  const maxArrayLength = 5;
  let popularAuthorArray = [];
  books.forEach((bookElement) => {
    const author = getAuthorById(authors, bookElement.authorId);
    const singleAuthorName = `${author.name.first} ${author.name.last}`;
    if (!popularAuthorArray.some((authorElement) => authorElement.name === singleAuthorName)) {
      let newObj = {name: singleAuthorName, count: bookElement.borrows.length} //initializes author instance in the array to be the number of times the first book has been checked out
      popularAuthorArray.push(newObj);
    } else {
      popularAuthorArray.find((authorElem) => authorElem.name === singleAuthorName).count += bookElement.borrows.length;
    }
  })
  popularAuthorArray.sort((authorA, authorB) => authorB.count - authorA.count);
  return popularAuthorArray.length > maxArrayLength ? popularAuthorArray.slice(0, maxArrayLength) : popularAuthorArray;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
