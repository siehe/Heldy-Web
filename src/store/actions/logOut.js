export const LOG_OUT = 'LOG_OUT';

export const logOut = (payload) => {
  return {
    type: LOG_OUT,
    payload,
  };
}
