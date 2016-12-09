import * as types from './constants/actionTypes';

export const handleDropRow = seq => ({ type: types.DeleteRow, seq });
export const handleAddRow = issue => ({ type: types.AddRow, issue });
export const handleUpdateRow = issue => ({ type: types.UpdateRow, issue });
export const handleShowModal = (title, issue) => ({ type: types.ShowModal, title, issue });
export const handleCloseModal = () => ({ type: types.CloseModal });
