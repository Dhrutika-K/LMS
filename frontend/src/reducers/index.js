import { combineReducers } from 'redux';
import { userLoginReducer, userRegisterReducer, userProfileReducer,getAllStudentReducer } from './user_reducer';
import { getAllBookReducer, addBookReducer } from './book_reducer.js';
import { issueRqquestReducer , getAllIssueBookReqReducer, getAllReturnBookReqReducer,userIssuedBookReducer,allIssuedBookReducer, singleIssuedBookReducer} from './issue_reducer';

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userProfile: userProfileReducer,
  students:getAllStudentReducer,
  bookList: getAllBookReducer,
  addBook: addBookReducer,
  issueBook: issueRqquestReducer,
  issueRequest:getAllIssueBookReqReducer,
  returnBook: getAllReturnBookReqReducer,
  issuedBooks: allIssuedBookReducer,
  userIssue:userIssuedBookReducer,
  singleIssue:singleIssuedBookReducer,
});

export default rootReducer;
