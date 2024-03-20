import { useEffect } from 'react';
import { useTableLogs } from 'hooks/useTableLogs';

export default function TableLogCard() {
  const { tableLogs } = useTableLogs();

  useEffect(() => {
    // Scroll to bottom
    const element = document.getElementById('table-log-card');
    if (element) element.scrollTo(0, element.scrollHeight);
  }, [tableLogs]);

  return (
    <div className='h-[20vh] w-[40vw] border rounded p-2 overflow-auto' id='table-log-card'>
      <div>Table Log</div>
      <div className='flex flex-col justify-start text-sm h-full'>
        {tableLogs.map((log, index) => (
          <div key={index}>{log.comment}</div>
        ))}
      </div>
    </div>
  );
}
