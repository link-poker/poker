'use client';
import { useEffect, useState } from 'react';
import { TABLE_STATUS } from 'constants/table';
import { useTable } from 'hooks/useTable';
import { isClientSide } from 'utils/clientSide';

type Props = {
  tableId: string;
};

export default function InviteLinkBar(props: Props) {
  const { tableId } = props;
  const { table } = useTable();
  const [url, setUrl] = useState('Loading...');
  const [text, setText] = useState('Loading...');

  useEffect(() => {
    if (!isClientSide()) return;
    const url = `${window.location.origin}/table/${tableId}`;
    setUrl(url);
    setText(url);
  }, [tableId]);

  const onClick = () => {
    navigator.clipboard.writeText(url);
    setText('Link copied to your clipboard!');
    setTimeout(() => {
      setText(url);
    }, 2000);
  };

  if (table.status !== TABLE_STATUS.WAITING) return <></>;

  return (
    <div className='flex flex-col rounded-full px-12 py-4 gap-2 bg-white items-center max-w-[50vw]'>
      <div className='flex flex-row justify-center gap-1'>
        <div className='text-lg font-bold whitespace-nowrap text-cyan-600'>
          Click below to copy the link and send to your friends.
        </div>
      </div>
      <button className='flex flex-row border rounded-full px-4 py-1 w-[40vw] flex-start' onClick={onClick}>
        <div className='text-lg text-stone-800 line-clamp-3'>{text}</div>
      </button>
    </div>
  );
}
