export const mapTasksComments = (tasks, comments) => {
    tasks.forEach((task) => {
        const comment = comments.filter((comment) => comment.replyTo === task.id );  
        task.comments = comment;
    });
    return tasks;
}