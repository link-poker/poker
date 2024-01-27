import TableView from 'views/Table';

export default function Table({ params }: { params: { id: string } }) {
  const tableId = params.id;

  return (
    <div className='h-screen'>
      <TableView tableId={tableId} />
    </div>
  );
}
