export const options = {
    pagination: true,
    paginationPageSize: 10,
    rowSelection: {
        mode: "multiRow",
        groupSelects: "descendants",
    },
    defaultColDef: {
        editable: true,
        filter: true,
        flex: 1,
        minWidth: 100,
    },
};