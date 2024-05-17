import React, {useState} from 'react';
import './Table.css';
// import DataTable from './DataTable';

const ascDirection = 'asc';
const deskDirection = 'desk';

function Table({ tableData }) {

  const [sortConfig, setSortConfig] = useState({ key: null, direction: ascDirection });

  const requestSort = (key) => {
    let direction = ascDirection;
    if (sortConfig.key === key && sortConfig.direction === ascDirection) {
      direction = deskDirection;
    }
    setSortConfig({ key, direction });

    tableData.sort(key, direction);
  };

  return (
    <table className="data-table">
      <thead>
        <tr>
          {tableData.columns.map((column, index) => (
            <th 
              key={index} 
              onClick={() => requestSort(column.name)}
              style={{ width: column.width ? `${column.width}px` : 'auto' }}
              >
                {column.name}
                {sortConfig.key === column.name ? (sortConfig.direction === ascDirection ? ' 🔼' : ' 🔽') : null}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.data.map((row, rowIndex) => (
          <tr key={row.id}>
            {tableData.columns.map((column, colIndex) => (
              <td key={colIndex}>
                {typeof row[column.name] === 'boolean' ? 
                  (row[column.name] ? '✓' : '✗') : 
                  row[column.name]}                
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;