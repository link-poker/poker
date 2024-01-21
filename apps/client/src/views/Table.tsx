'use client';
import { useState } from 'react';
import OptionsView from 'views/Options';
import CommonCards from 'components/CommonCards';
import PlayerSeat from 'components/PlayerSeat';
import LogCard from 'components/LogCard';
import ActionContainer from 'components/ActionContainer';
import ExternalInfoContainer from 'components/ExternalInfoContainer';
import GameInfoContainer from 'components/GameInfoContainer';
import TopLeftButtons from 'components/TopLeftButtons';
import TopRightButtons from 'components/TopRightButtons';
import Pot from 'components/Pot';
import TotalPot from 'components/TotalPot';
import { IPlayer } from 'interfaces/core/IPlayer';

export default function Table() {
  const you: IPlayer = {
    seat: 6,
    name: 'me',
    stack: 1000,
    bet: 0,
    hole: ['AS', 'AD'],
    hand: 'THREE OF A KIND',
    status: 'action',
    isYou: true,
  };
  const otherUsers: IPlayer[] = [
    {
      seat: 2,
      name: 'player2',
      stack: 1000,
      bet: 0,
      hole: ['Blue_Back', 'Blue_Back'],
      hand: null,
      status: 'playing',
      isYou: false,
    },
    {
      seat: 3,
      name: 'player3',
      stack: 1000,
      bet: 0,
      hole: ['Blue_Back', 'Blue_Back'],
      hand: null,
      status: 'AWAY',
      isYou: false,
    },
    {
      seat: 4,
      name: 'player4',
      stack: 1000,
      bet: 0,
      hole: ['Blue_Back', 'Blue_Back'],
      hand: null,
      status: 'WAITING',
      isYou: false,
    },
    {
      seat: 7,
      name: 'player5',
      stack: 1000,
      bet: 0,
      hole: ['Blue_Back', 'Blue_Back'],
      hand: null,
      status: 'playing',
      isYou: false,
    },
    {
      seat: 8,
      name: 'player6',
      stack: 1000,
      bet: 0,
      hole: ['Blue_Back', 'Blue_Back'],
      hand: null,
      status: 'playing',
      isYou: false,
    },
    {
      seat: 9,
      name: 'player7',
      stack: 1000,
      bet: 0,
      hole: ['Blue_Back', 'Blue_Back'],
      hand: null,
      status: 'playing',
      isYou: false,
    },
    {
      seat: 10,
      name: 'player8',
      stack: 1000,
      bet: 0,
      hole: ['Blue_Back', 'Blue_Back'],
      hand: null,
      status: 'playing',
      isYou: false,
    },
  ];
  const seatPlayers: (IPlayer | null)[] = [
    otherUsers.find(player => player.seat === 1) ?? null,
    otherUsers.find(player => player.seat === 2) ?? null,
    otherUsers.find(player => player.seat === 3) ?? null,
    otherUsers.find(player => player.seat === 4) ?? null,
    otherUsers.find(player => player.seat === 5) ?? null,
    you,
    otherUsers.find(player => player.seat === 7) ?? null,
    otherUsers.find(player => player.seat === 8) ?? null,
    otherUsers.find(player => player.seat === 9) ?? null,
    otherUsers.find(player => player.seat === 10) ?? null,
  ];
  const game = {
    status: 'playing',
  };

  const [showOptionsView, setShowOptionsView] = useState(false);
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
        <div className='absolute mt-[9vh] ml-[99vw] transform -translate-x-full'>
          <TopRightButtons />
        </div>
        <div key={'seat0'} className='absolute mt-[2vh] ml-[37.5vw] transform -translate-x-1/2'>
          <PlayerSeat seatNumber={0} />
        </div>
        <div key={'seat1'} className='absolute mt-[2vh] ml-[62.5vw] transform -translate-x-1/2'>
          <PlayerSeat seatNumber={1} />
        </div>
        <div key={'seat2'} className='absolute mt-[15vh] ml-[82.5vw] transform -translate-x-1/2'>
          <PlayerSeat seatNumber={2} />
        </div>
        <div key={'seat3'} className='absolute mt-[35vh] ml-[99vw] transform -translate-x-full'>
          <PlayerSeat seatNumber={3} />
        </div>
        <div key={'seat4'} className='absolute mt-[55vh] ml-[82.5vw] transform -translate-x-1/2'>
          <PlayerSeat seatNumber={4} />
        </div>
        <div key={'seat5'} className='absolute mt-[68vh] ml-[62.5vw] transform -translate-x-1/2 z-10'>
          <PlayerSeat seatNumber={5} />
        </div>
        <div key={'seat6'} className='absolute mt-[68vh] ml-[37.5vw] transform -translate-x-1/2'>
          <PlayerSeat seatNumber={6} />
        </div>
        <div key={'seat7'} className='absolute mt-[55vh] ml-[13vw]'>
          <PlayerSeat seatNumber={7} />
        </div>
        <div key={'seat8'} className='absolute mt-[35vh] ml-[3vw]'>
          <PlayerSeat seatNumber={8} />
        </div>
        <div key={'seat9'} className='absolute mt-[15vh] ml-[13vw]'>
          <PlayerSeat seatNumber={9} />
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
        <div className='absolute mt-[77.5vh] ml-[1vw]'>
          <LogCard />
        </div>
        <div className='absolute mt-[99vh] ml-[60vw] transform -translate-y-full'>
          <ActionContainer />
        </div>
      </div>
    </div>
  );
}
