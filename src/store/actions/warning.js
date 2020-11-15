export const SHOW_WARNING = 'SHOW_WARNING';

export const showWarning = (payload) => {
  return {
    type: SHOW_WARNING,
    payload,
  };
}
