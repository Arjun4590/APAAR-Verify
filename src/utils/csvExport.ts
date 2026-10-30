export function exportToCSV(filename: string, rows: Record<string, any>[]) {
  if (!rows || !rows.length) {
    alert('No data to export');
    return;
  }

  const headers = Object.keys(rows[0]);
  const csvContent = [
    headers.join(','),
    ...rows.map(row => 
      headers
        .map(header => {
          let val = row[header];
          if (val === null || val === undefined) val = '';
          val = String(val).replace(/"/g, '""');
          if (val.search(/("|,|\n)/g) >= 0) {
            val = `"${val}"`;
          }
          return val;
        })
        .join(',')
    )
  ].join('\r\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

