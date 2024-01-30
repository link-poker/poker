'use client';
import { useEffect, useRef, useState } from 'react';
import ActionContainer from 'components/ActionContainer';
import CommonCards from 'components/CommonCards';
import ExternalInfoContainer from 'components/ExternalInfoContainer';
import GameInfoContainer from 'components/GameInfoContainer';
import LogCard from 'components/LogCard';
import PlayerSeat from 'components/PlayerSeat';
import Pot from 'components/Pot';
import TopLeftButtons from 'components/TopLeftButtons';
import TopRightButtons from 'components/TopRightButtons';
import TotalPot from 'components/TotalPot';
import { you, otherUsers } from 'constants/mock';
import { useTable } from 'hooks/useTable';
import { useUser } from 'hooks/useUser';
import { useWebSocket } from 'hooks/useWebSocket';
import { getTableWsUrl, getWatchTableWsUrl } from 'utils/url';
import OptionsView from 'views/Options';

type Props = {
  tableId: string;
};

export default function Table(props: Props) {
  const { tableId } = props;
  const { user } = useUser();
  const { updateState } = useWebSocket();
  const { loadTable } = useTable();
  const webSocketRef = useRef<WebSocket | null>(null);
  const [showOptionsView, setShowOptionsView] = useState(false);

  useEffect(() => {
    loadTable(tableId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableId]);

  useEffect(() => {
    if (!tableId) return;
    const wsUrl = user.id ? getTableWsUrl(tableId, user.id) : getWatchTableWsUrl(tableId);
    webSocketRef.current = new WebSocket(wsUrl);
    webSocketRef.current.onmessage = message => {
      console.log('websocket message');
      console.log(message);
      updateState(message.toString());
    };
    webSocketRef.current.onopen = () => {
      console.log('websocket open');
    };
    webSocketRef.current.onclose = () => {
      console.log('websocket close');
    };

    return () => {
      if (webSocketRef.current) {
        webSocketRef.current.close();
      }
    };
  }, [user.id, tableId, updateState]);

  if (showOptionsView) {
    return <OptionsView backTable={() => setShowOptionsView(false)} players={[you, ...otherUsers]} />;
  }

  return (
    <div className='h-screen'>
      <div className='relative h-screen w-screen bg-stone-800'>
        <div className='absolute'>
          {/* TODO: イメージを付けるための仮置き*/}
          <img
            className='object-fill h-[80vh] w-screen'
            src='https://media.pokernow.club/campaing-felts/table-green-plus-3.png'
            alt='table'
          />
        </div>
        <div className='absolute mt-[0vh] ml-[0vw]'>
          <ExternalInfoContainer />
        </div>
        <div className='absolute mt-[1vh] ml-[97.5vw] transform -translate-x-full'>
          <GameInfoContainer />
        </div>
        <div className='absolute mt-[5vh] ml-[1vw]'>
          <TopLeftButtons showOptionsView={() => setShowOptionsView(true)} />
        </div>
        <div className='absolute mt-[10vh] ml-[99vw] transform -translate-x-full'>
          <TopRightButtons />
        </div>
        <div className='absolute mt-[19vh] ml-[54vw] transform -translate-x-1/2 -translate-y-1/2'>
          <TotalPot />
        </div>
        <div className='absolute mt-[22vh] ml-[50vw] transform -translate-x-1/2 -translate-y-1/2'>
          <Pot />
        </div>
        <div className='absolute mt-[30vh] ml-[50vw] transform -translate-x-1/2'>
          <CommonCards />
        </div>
        <div key={'seat0'} className='absolute mt-[2vh] ml-[37.5vw] transform -translate-x-1/2 z-10'>
          <PlayerSeat seatNumber={0} />
        </div>
        <div key={'seat1'} className='absolute mt-[2vh] ml-[62.5vw] transform -translate-x-1/2 z-20'>
          <PlayerSeat seatNumber={1} />
        </div>
        <div key={'seat2'} className='absolute mt-[15vh] ml-[80.5vw] transform -translate-x-1/2'>
          <PlayerSeat seatNumber={2} />
        </div>
        <div key={'seat3'} className='absolute mt-[35vh] ml-[99vw] transform -translate-x-full z-10'>
          <PlayerSeat seatNumber={3} />
        </div>
        <div key={'seat4'} className='absolute mt-[55vh] ml-[80.5vw] transform -translate-x-1/2'>
          <PlayerSeat seatNumber={4} />
        </div>
        <div key={'seat5'} className='absolute mt-[68vh] ml-[62.5vw] transform -translate-x-1/2 z-10'>
          <PlayerSeat seatNumber={5} />
        </div>
        <div key={'seat6'} className='absolute mt-[68vh] ml-[37.5vw] transform -translate-x-1/2 z-10'>
          <PlayerSeat seatNumber={6} />
        </div>
        <div key={'seat7'} className='absolute mt-[55vh] ml-[20vw] transform -translate-x-1/2'>
          <PlayerSeat seatNumber={7} />
        </div>
        <div key={'seat8'} className='absolute mt-[35vh] -ml-[20vw] transform translate-x-full'>
          <PlayerSeat seatNumber={8} />
        </div>
        <div key={'seat9'} className='absolute mt-[15vh] ml-[20vw] transform -translate-x-1/2'>
          <PlayerSeat seatNumber={9} />
        </div>
        <div className='absolute mt-[79vh] ml-[1vw]'>
          <LogCard />
        </div>
        <div className='absolute mt-[99vh] ml-[60vw] transform -translate-y-full'>
          <ActionContainer />
        </div>
      </div>
    </div>
  );
}
