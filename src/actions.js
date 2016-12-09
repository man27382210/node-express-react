import * as types from './actionTypes';

export const handleDropRow = seq => ({ type: types.DeleteRow, seq });
export const handleAddRow = issue => ({ type: types.AddRow, issue });
