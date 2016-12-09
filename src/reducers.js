/* eslint no-confusing-arrow: 0 */
import { combineReducers } from 'redux';
import issueList from './constants/constant';
import * as types from './constants/actionTypes';

const initialData = { issues: issueList };

const operation = (state = initialData, action) => {
  switch (action.type) {
    case types.DeleteRow:
      return {
        ...state,
        issues: state.issues.filter(issue => issue.seq !== action.seq)
      };
    case types.AddRow:
      return {
        ...state,
        issues: [
          ...state.issues,
          {
            ...action.issue,
            seq: state.issues[Object.keys(state.issues).length - 1].seq + 1
          }
        ]
      };
    case types.UpdateRow:
      return {
        ...state,
        issues: state.issues.map(issue =>
          issue.seq === action.issue.seq ?
            action.issue : issue) };
    default:
      return state;
  }
};

const initialState = { showModal: false, title: 'New Issue', issue: {} };

const modalControl = (state = initialState, action) => {
  switch (action.type) {
    case types.ShowModal:
      return { ...state, showModal: true, title: action.title, issue: action.issue };
    case types.CloseModal:
    case types.AddRow:
    case types.UpdateRow:
      return { ...state, showModal: false };
    default:
      return state;
  }
};

const Reducers = combineReducers({
  operation,
  modalControl
});

export default Reducers;
