export const EDIT_TASK = 'EDIT_TASK';

export const editTask = payload => {
  return {
    type: EDIT_TASK,
    payload,
  };
}