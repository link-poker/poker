export default function LogCard() {
  return (
    <div className='h-[20vh] w-[40vw] border rounded p-2'>
      <div>Session Log</div>
      <div className='flex flex-col justify-start text-sm'>
        <div>10:52 aaa posts a big blind of 20</div>
        <div>10:52 bbb posts a small blind of 10</div>
        <div>10:52 Player stacks: #1 aaa (940) | #2 bbb (1060)</div>
        <div>10:52 starting hand #78 (id: l7ceryorumgo) (No Limit Texas Hold&apos;em) (dealer: bbb)</div>
        <div>10:52 ending hand #77</div>
        <div>10:52 bbb collected 20 from pot</div>
        <div>10:52 Uncalled bet of 10 returned to bbb</div>
      </div>
    </div>
  );
}
