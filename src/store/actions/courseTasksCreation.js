export const PUSH_COURSE_TASK = 'PUSH_COURSE_TASK';

export const pushTask = (payload) => {
  return {
    type: PUSH_COURSE_TASK,
    payload,
  };
}
