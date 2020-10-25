export const modifyBoardLists = (lists, columns) => {
    columns.forEach((column) => column.lists = []);
    lists.forEach((list) => {
        columns.find(({name}) => name === list.status.name).lists.push(list);
    });
    return columns;
};
