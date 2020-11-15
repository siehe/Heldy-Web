export const SET_BOARD_COLUMNS = 'SET_BOARD_COLUMNS';

export const setBoardColumns = (payload) => {
  return {
    type: SET_BOARD_COLUMNS,
    payload,
  };
}
