'use client';
import { useEffect, useMemo, useState } from 'react';
import ActionContainer from 'components/ActionContainer';
import CommonCards from 'components/CommonCards';
import ExternalInfoContainer from 'components/ExternalInfoContainer';
import GameInfoContainer from 'components/GameInfoContainer';
import InviteLinkBar from 'components/InviteLinkBar';
import PlayerSeat from 'components/PlayerSeat';
import Pot from 'components/Pot';
import ReconnectBar from 'components/ReconnectBar';
import TableLogCard from 'components/TableLogCard';
import TopLeftButtons from 'components/TopLeftButtons';
import TopRightButtons from 'components/TopRightButtons';
import TotalPot from 'components/TotalPot';
import { you, otherUsers } from 'constants/mock';
import { useTable } from 'hooks/useTable';
import { useTableLogs } from 'hooks/useTableLogs';
import WebSocketProvider from 'providers/WebSocketProvider';
import { getAuthInfo } from 'utils/authInfo';
import { isClientSide } from 'utils/clientSide';
import { getTableWsUrl, getWatchTableWsUrl } from 'utils/url';
import OptionsView from 'views/Options';

type Props = {
  tableId: string;
};

export default function Table(props: Props) {
  const { tableId } = props;
  const { loadTable } = useTable();
  const { loadTableLogs } = useTableLogs();
  const [showOptionsView, setShowOptionsView] = useState(false);
  const [showLogCard, setShowLogCard] = useState(true);
  const authInfo = isClientSide() && getAuthInfo();
  const wsUrl = useMemo(() => {
    if (authInfo) return getTableWsUrl(tableId, authInfo);
    return getWatchTableWsUrl(tableId);
  }, [tableId, authInfo]);

  useEffect(() => {
    loadTable(tableId);
    loadTableLogs(tableId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableId]);

  if (showOptionsView) {
    return <OptionsView backTable={() => setShowOptionsView(false)} players={[you, ...otherUsers]} />;
  }

  return (
    <WebSocketProvider url={wsUrl}>
      <div className='h-screen'>
        <div className='relative h-screen w-screen bg-stone-800'>
          <div className='absolute'>
            {/* TODO: イメージを付けるための仮置き*/}
            <img className='object-fill h-[80vh] w-screen' src='/table.png' alt='table' />
          </div>
          <div className='absolute mt-[0vh] ml-[0vw] w-full z-50'>
            <ReconnectBar tableId={tableId} />
          </div>
          <div className='absolute mt-[40vh] ml-[50vw] transform -translate-x-1/2 -translate-y-1/2 z-10'>
            <InviteLinkBar tableId={tableId} />
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
          <div key={'seat0'} className='absolute mt-[2vh] ml-[37.5vw] transform -translate-x-1/2 z-30'>
            <PlayerSeat seatNumber={0} />
          </div>
          <div key={'seat1'} className='absolute mt-[2vh] ml-[62.5vw] transform -translate-x-1/2 z-40'>
            <PlayerSeat seatNumber={1} />
          </div>
          <div key={'seat2'} className='absolute mt-[15vh] ml-[80.5vw] transform -translate-x-1/2 z-20'>
            <PlayerSeat seatNumber={2} />
          </div>
          <div key={'seat3'} className='absolute mt-[35vh] ml-[98vw] transform -translate-x-full z-50'>
            <PlayerSeat seatNumber={3} />
          </div>
          <div key={'seat4'} className='absolute mt-[55vh] ml-[80.5vw] transform -translate-x-1/2 z-20'>
            <PlayerSeat seatNumber={4} />
          </div>
          <div key={'seat5'} className='absolute mt-[68vh] ml-[62.5vw] transform -translate-x-1/2 z-40'>
            <PlayerSeat seatNumber={5} />
          </div>
          <div key={'seat6'} className='absolute mt-[68vh] ml-[37.5vw] transform -translate-x-1/2 z-30'>
            <PlayerSeat seatNumber={6} />
          </div>
          <div key={'seat7'} className='absolute mt-[55vh] ml-[10vw] z-20'>
            <PlayerSeat seatNumber={7} />
          </div>
          <div key={'seat8'} className='absolute mt-[35vh] ml-[2.5vw] z-20'>
            <PlayerSeat seatNumber={8} />
          </div>
          <div key={'seat9'} className='absolute mt-[15vh] ml-[10vw] z-20'>
            <PlayerSeat seatNumber={9} />
          </div>
          <div className='absolute mt-[79vh] ml-[1vw]'>{showLogCard && <TableLogCard />}</div>
          <div className='absolute mt-[99vh] ml-[60vw] transform -translate-y-full'>
            <ActionContainer setShowLogCard={setShowLogCard} />
          </div>
        </div>
      </div>
    </WebSocketProvider>
  );
}
