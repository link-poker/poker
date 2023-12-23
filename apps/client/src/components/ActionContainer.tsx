import { BsCircleFill } from 'react-icons/bs';

export default function ActionContainer() {
  return (
    <div className='flex flex-col w-[39vw] gap-3 items-end'>
      <div className='flex flex-row justify-end items-center gap-2 text-yellow-300 text-2xl'>
        <BsCircleFill className='blinking' />
        YOUR TURN
      </div>
      <button className='outline-white-btn rounded-lg px-8 py-2 text-2xl'>ACTIVATE EXTRA TIME(10s)</button>
      <div className='flex flex-row justify-end gap-2'>
        <button className='outline-green-btn rounded-xl px-6 py-6 text-2xl'>BET</button>
        <button className='outline-green-btn rounded-xl px-6 py-6 text-2xl'>RAISE</button>
        <button className='outline-green-btn rounded-xl px-6 py-6 text-2xl'>CHECK</button>
        <button className='outline-red-btn rounded-xl px-6 py-6 text-2xl'>FOLD</button>
      </div>
    </div>
  );
}
