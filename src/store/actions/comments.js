export const LOAD_COMMENTS = 'LOAD_COMMENTS';
export const RESOLVE_COMMENTS = 'RESOLVE_COMMENTS';

export const loadComment = (payload) => {  
  return {
    type: LOAD_COMMENTS,
    payload,
  };
}

export const resolveComments = payload => {
  return {
      type: RESOLVE_COMMENTS,
      payload,
  }
}
