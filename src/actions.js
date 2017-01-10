import * as types from './constants/actionTypes';

export const handleDropRow = seq => ({ type: types.DeleteRow, seq });
export const handleAddRow = issue => ({ type: types.AddRow, issue });
export const handleUpdateRow = issue => ({ type: types.UpdateRow, issue });
export const handleShowModal = (title, issue) => ({ type: types.ShowModal, title, issue });
export const handleCloseModal = () => ({ type: types.CloseModal });
export const fetchDataSuccess = issues => ({ type: types.FetchSuccess, issues });
export const fetchData = () => (
  dispatch => (
    fetch('http://localhost:3000/issues')
    .then(res => (
      res.json().then(
        data => (dispatch(fetchDataSuccess(data)))
      )
    ))
  )
);
export const addRow = issue => (
  dispatch => (
    fetch('http://localhost:3000/issues', {
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
