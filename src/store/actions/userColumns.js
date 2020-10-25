export const LOAD_USER_COLUMNS = 'LOAD_USER_COLUMNS';
export const RESOLVE_USER_COLUMNS = 'RESOLVE_USER_COLUMNS';


export const loadUserList = (payload) => {
  return {
    type: LOAD_USER_COLUMNS,
    payload,
  };
}

export const resolveUserList = () => {
  return {
    type: RESOLVE_USER_COLUMNS,
  }
}
