export default function GameSetting() {
  return (
    <div className='flex flex-col w-full p-8'>
      <div className='absolute top-[87.5vh] left-[0vw] h-[12.5vh] w-full bg-stone-700'>
        <div className='flex flex-row justify-between items-center h-full w-full p-4'>
          <button className='outline-green-btn rounded-xl p-4 text-4xl'>UPDATE</button>
          <button className='outline-white-btn rounded-xl p-4 text-4xl'>CUSTOM PRESETS</button>
        </div>
      </div>
    </div>
  );
}
