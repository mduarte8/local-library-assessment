function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const twoArrays = [];
  const firstTransaction = 0; // creating variable for first instance of borrows array, as instructions note "You can check return status by looking at first transaction object in the the `borrows` array"
  twoArrays.push(books.filter(({borrows}) => !borrows[firstTransaction].returned)); //destructured book element that is iterated to get borrowed array, and value of returned is bool so checking if false and will return true if value is false
  twoArrays.push(books.filter(({borrows}) => borrows[firstTransaction].returned)); // same logic as above
  return twoArrays;
}

function getBorrowersForBook(book, accounts) {
  const maxListLength = 10;
  let accountArray = book.borrows.reduce((accumulator, borrowInstance) => {
    let accountObj = accounts.find((account)=> borrowInstance.id === account.id);
    accountObj.returned = borrowInstance.returned;
    accumulator.push(accountObj)
    return accumulator;
  },[]);
  return accountArray.length > maxListLength ? accountArray.slice(0,maxListLength) : accountArray; // return logic to see if array is greater than 10 (per instructions no longer than 10) and slices array to 10 instances if longer, otherwise just returns array
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
