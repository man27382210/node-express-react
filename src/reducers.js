/* eslint no-confusing-arrow: 0 */
import { combineReducers } from 'redux';
import issueList from './constants/constant';
import * as types from './constants/actionTypes';

const initialData = { issues: issueList };

export const operation = (state = initialData, action) => {
  let seq;
  switch (action.type) {
    case types.DeleteRow:
      return {
        ...state,
        issues: state.issues.filter(issue => issue.seq !== action.seq)
      };
    case types.AddRow:
      seq = (Object.keys(state.issues).length > 0) ?
      state.issues[Object.keys(state.issues).length - 1].seq + 1 : 1;
      return {
        ...state,
        issues: [
          ...state.issues,
          {
            ...action.issue,
            seq: seq
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

export const modalControl = (state = initialState, action) => {
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
