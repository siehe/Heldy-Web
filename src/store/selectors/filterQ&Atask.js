export const filterProblems = tasks => {
    if(!tasks.length) return [];
    return tasks.filter(({ isInQa }) => isInQa);
}