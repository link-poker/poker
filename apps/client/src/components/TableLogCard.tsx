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
    <div>
      <div className='text-base bg-white text-stone-800 rounded-t px-2'>Table Log</div>
      <div className='h-[18vh] w-[40vw] border rounded-b p-2'>
        <div className='flex flex-col justify-start text-sm h-full overflow-auto' id='table-log-card'>
          {tableLogs.map((log, index) => (
            <div key={index}>{log.comment}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
