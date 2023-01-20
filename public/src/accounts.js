function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => 
    accountA.name.last.toLowerCase() < accountB.name.last.toLowerCase() ? -1: 1);
}

function getTotalNumberOfBorrows(account, books) {
  let total = books.reduce((bookAccumulator, bookInstance) => { // uses nested reduce loop to count in each book borrow array
    return bookAccumulator + bookInstance.borrows.reduce((borrowAccum, {id}) => {
      return id === account.id ? borrowAccum+1:borrowAccum // increase borrow accum by 1 if the account ids match in the borrow instance 
    },0)
  },0);
  return total;
}

function getBooksPossessedByAccount(account, books, authors) {
  let filteredBooks = books.filter((book) => { // creates an array filtered by ones that are checked out by account
    let boolFlag = false; // sets default flag to false
    book.borrows.forEach((borrowInstance) => { // checks for each instance in the borrow array of a book if the id matches account id and if returned === false meaning it is currently checked out
      if (borrowInstance.id === account.id && !borrowInstance.returned) boolFlag = true; // flips boolean flag to true if criteria met
    });
    return boolFlag;
  });
  return filteredBooks.map((book) => {
    book.author = getAuthorById(authors, book.authorId); // users helper function to return the object of author when passed in id and author object
    return book;
  })
}

function getAuthorById (authors, id) { // returns author object when passed in id
  return authors.find((author) => author.id === id);
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
  getAuthorById
};
