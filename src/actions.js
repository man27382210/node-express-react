import fetch from 'isomorphic-fetch';
import * as types from './constants/actionTypes';
import { ProductionApiUri } from './constants/uri';

const fetchUrl = ProductionApiUri;
export const handleDropRow = seq => ({ type: types.DeleteRow, seq });
export const handleAddRow = issue => ({ type: types.AddRow, issue });
export const handleUpdateRow = issue => ({ type: types.UpdateRow, issue });
export const handleShowModal = (title, issue) => ({ type: types.ShowModal, title, issue });
export const handleCloseModal = () => ({ type: types.CloseModal });
export const fetchDataSuccess = issues => ({ type: types.FetchSuccess, issues });
export const fetchData = () => (
  dispatch => (
    fetch(fetchUrl)
    .then(res => (
      res.json().then(
        data => (dispatch(fetchDataSuccess(data)))
      )
    ))
  )
);
export const addRow = issue => (
  dispatch => (
    fetch(fetchUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ issue })
    })
    .then(res => (
      res.json().then(
        data => (dispatch(handleAddRow(data)))
      )
    ))
  )
);
export const updateRow = issue => (
  dispatch => (
    fetch(fetchUrl + issue.seq, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ issue })
    })
    .then(res => (
      res.json().then(
        data => (dispatch(handleUpdateRow(data)))
      )
    ))
  )
);
export const dropRow = seq => (
  dispatch => (
    fetch(fetchUrl + seq, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => (
      res.json().then(
        data => (dispatch(handleDropRow(data)))
      )
    ))
  )
);
