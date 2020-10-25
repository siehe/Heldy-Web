export const LOAD_USER_LIST = 'LOAD_USER_LIST';
export const RESOLVE_USER_LIST = 'RENDER_USER_LIST';


export const loadUserList = (payload) => {
  return {
    type: LOAD_USER_LIST,
    payload,
  };
}

export const resolveUserList = () => {
  return {
    type: RESOLVE_USER_LIST,
  }
}
