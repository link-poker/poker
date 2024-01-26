export default function LogCard() {
  const logs = [
    'aaa posts a big blind of 20',
    'bbb posts a small blind of 10',
    'Player stacks: #1 aaa (940) | #2 bbb (1060)',
    "starting hand #78 (id: l7ceryorumgo) (No Limit Texas Hold'em) (dealer: bbb)",
    'ending hand #77',
    'bbb collected 20 from pot',
    'Uncalled bet of 10 returned to bbb',
    'bbb mucks',
    'bbb wins 20',
    'bbb folds',
    'bbb calls 10',
    'bbb raises 10 to 20',
    'bbb folds',
    'bbb calls 10',
    'bbb raises 10 to 20',
    'bbb folds',
  ];
  return (
    <div className='h-[20vh] w-[40vw] border rounded p-2 overflow-auto'>
      <div>Session Log</div>
      <div className='flex flex-col justify-start text-sm h-full'>
        {logs.map((log, index) => (
          <div key={index}>{log}</div>
        ))}
      </div>
    </div>
  );
}
