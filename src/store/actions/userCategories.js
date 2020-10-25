export const LOAD_USER_COLUMNS = 'LOAD_USER_COLUMNS';
export const RESOLVE_USER_COLUMNS = 'RESOLVE_USER_COLUMNS';


export const loadUserCategories = () => {
  return {
    type: LOAD_USER_COLUMNS,
  };
}

export const resolveUserCategories = () => {
  return {
    type: RESOLVE_USER_COLUMNS,
  }
}
