export default class DataTable {
    constructor(columns, data = []) {
        this.columns = columns; // массив объектов с информацией о колонках
        this.data = data; // массив данных строк таблицы
    }

    addColumn(column) {
        this.columns.push(column);
    }

    removeColumn(columnName) {
        this.columns = this.columns.filter(column => column.name !== columnName);
    }

    addRow(row) {
        this.data.push(row);
    }

    removeRow(rowIndex) {
        this.data.splice(rowIndex, 1);
    }

    sort(columnName, direction = 'asc') {
        this.data.sort((a, b) => {
            if (a[columnName] < b[columnName]) return direction === 'asc' ? -1 : 1;
            if (a[columnName] > b[columnName]) return direction === 'asc' ? 1 : -1;
            return 0;
        });
    }

    search(columnName, query) {
        return this.data.filter(row => row[columnName].toString().includes(query));
    }

    globalSearch(query) {
        return this.data.filter(row => Object.values(row).some(value => value.toString().includes(query)));
    }
}