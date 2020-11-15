export const GET_USER_INFO = 'GET_USER_INFO';
export const PUT_USER_INFO = 'PUT_USER_INFO';

export const getUserInfo = () => {
  return {
    type: GET_USER_INFO,
  };
}

export const putUserInfo = ({ userInfo }) => {
  return {
    type: PUT_USER_INFO,
    userInfo,
  }
}