import './App.css';
import Table from './Table';
import DataTable from './DataTable';
import React, { useRef, useState } from 'react';

// Возможны следующие типы для колонок: number, string, boolean.

const columns = [
  { name: 'id', type: 'number', width: 70 },
  { name: 'name', type: 'string', width: 100 },
  { name: 'age', type: 'number' },
  { name: 'forDelete', type: 'boolean' },
  { name: 'isActive', type: 'boolean' }
];

const data = [
  { id: 1, name: 'Алина', age: '25', isActive: true },
  { id: 2, name: 'Фёдор', age: '31', isActive: true },
  { id: 3, name: 'Андрей', age: '55', isActive: true },
  { id: 4, name: 'Петр', age: '18', isActive: true },
  { id: 8, name: 'Владимир', age: '20', isActive: false },
  { id: 20, name: 'Елена', age: '30', isActive: true },
];

// Таблица должна являться javascript объектом/классом.
const table = new DataTable(columns, data);

// Добавление/ Удаление колонок нужно реализовать через функцию объекта/класса.
table.addColumn({ name: 'newColumn', type: 'string' });
table.removeColumn('forDelete');

// Добавление/ Удаление строк нужно реализовать через функцию объекта/класса.
table.removeRow(4);
table.addRow({ id: 21, name: 'Илья неактивный заменил Владимира', age: '66', isActive: false });

// • Необходимо реализовать функцию для загрузки данных в таблицу из json файла.
// • Необходимо реализовать функцию для выгрузки данных из таблицы в json файл.
// Сделано через UI с выбором файла для загрузки, а не в модели DataTable потому что напрямую в JS (без node.js) запрещено работать с файлами из соображений безопасности


function App() {
  const fileInputRef = useRef(null);

  const handleFileChange = () => {
    const file = fileInputRef.current.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const fileContent = event.target.result;
      updateTableData(JSON.parse(fileContent));
    };

    reader.readAsText(file, 'UTF-8');
  };

  const [outFileName, setOutFileName] = useState('data-table.json');

  const handleOutFileNameChange = (event) => {
    setOutFileName(event.target.value);
  };

  const handleFileOutput = (fileName) => {
    const blob = new Blob([JSON.stringify(table.data)], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();

    URL.revokeObjectURL(url);    
  };
  
  const [tableData, setTableData] = useState(new DataTable(table.columns, table.data));

  const updateTableData = (newData) => {
    setTableData(new DataTable(tableData.columns, newData));
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Test table component.
        </p>
        <Table tableData={tableData}/>

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <button onClick={() => fileInputRef.current.click()}>Загрузить из файла</button>
        <div>
          <button onClick={() => handleFileOutput(outFileName)}>Скачать в виде файла</button>        
          <input type="text" placeholder='Имя файла'
            value={outFileName}
            onChange={handleOutFileNameChange}        
          />
        </div>

      </header>
    </div>
  );
}

export default App;
