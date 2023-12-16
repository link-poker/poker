'use client';
import CommunityCards from 'components/CommunityCards';
import PlayerSeat from 'components/PlayerSeat';
import LogCard from 'components/LogCard';
import ActionContainer from 'components/ActionContainer';
import ExternalInfoContainer from 'components/ExternalInfoContainer';
import GameInfoContainer from 'components/GameInfoContainer';
import TopLeftButtons from 'components/TopLeftButtons';
import TopRightButtons from 'components/TopRightButtons';
import Pot from 'components/Pot';
import TotalPot from 'components/TotalPot';

export default function Table() {
  const you = {
    name: 'me',
    stack: 1000,
    bet: 0,
    hole: ['AS', 'AD'],
    hand: 'THREE OF A KIND',
    status: 'action',
    isYou: true,
  };
  const otherUsers = [
    {
      name: 'player2',
      stack: 1000,
      bet: 0,
      hole: ['Blue_Back', 'Blue_Back'],
      hand: null,
      status: 'playing',
      isYou: false,
    },
    {
      name: 'player3',
      stack: 1000,
      bet: 0,
      hole: ['Blue_Back', 'Blue_Back'],
      hand: null,
      status: 'AWAY',
      isYou: false,
    },
    {
      name: 'player4',
      stack: 1000,
      bet: 0,
      hole: ['Blue_Back', 'Blue_Back'],
      hand: null,
      status: 'WAITING',
      isYou: false,
    },
  ];
  const seatPlayers = {
    seat1: null,
    seat2: otherUsers[0],
    seat3: otherUsers[1],
    seat4: otherUsers[2],
    seat5: null,
    seat6: you,
    seat7: null,
    seat8: null,
    seat9: null,
    seat10: null,
  };
  const game = {
    status: 'playing',
  };
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
        <div className='absolute mt-[1vh] ml-[85vw]'>
          <GameInfoContainer />
        </div>
        <div className='absolute mt-[5vh] ml-[1vw]'>
          <TopLeftButtons />
        </div>
        <div className='absolute mt-[9vh] ml-[93vw]'>
          <TopRightButtons />
        </div>
        <div key={'seat1'} className='absolute mt-[2vh] ml-[37.5vw] transform -translate-x-1/2'>
          <PlayerSeat player={seatPlayers['seat1']} game={game} />
        </div>
        <div key={'seat2'} className='absolute mt-[2vh] ml-[62.5vw] transform -translate-x-1/2'>
          <PlayerSeat player={seatPlayers['seat2']} game={game} />
        </div>
        <div key={'seat3'} className='absolute mt-[15vh] ml-[82.5vw] transform -translate-x-1/2'>
          <PlayerSeat player={seatPlayers['seat3']} game={game} />
        </div>
        <div key={'seat4'} className='absolute mt-[35vh] ml-[90vw] transform -translate-x-1/2'>
          <PlayerSeat player={seatPlayers['seat4']} game={game} />
        </div>
        <div key={'seat5'} className='absolute mt-[55vh] ml-[82.5vw] transform -translate-x-1/2'>
          <PlayerSeat player={seatPlayers['seat5']} game={game} />
        </div>
        <div key={'seat6'} className='absolute mt-[68vh] ml-[62.5vw] transform -translate-x-1/2'>
          <PlayerSeat player={seatPlayers['seat6']} game={game} />
        </div>
        <div key={'seat7'} className='absolute mt-[68vh] ml-[37.5vw] transform -translate-x-1/2'>
          <PlayerSeat player={seatPlayers['seat7']} game={game} />
        </div>
        <div key={'seat8'} className='absolute mt-[55vh] ml-[17.5vw] transform -translate-x-1/2'>
          <PlayerSeat player={seatPlayers['seat8']} game={game} />
        </div>
        <div key={'seat9'} className='absolute mt-[35vh] ml-[10vw] transform -translate-x-1/2'>
          <PlayerSeat player={seatPlayers['seat9']} game={game} />
        </div>
        <div key={'seat10'} className='absolute mt-[15vh] ml-[17.5vw] transform -translate-x-1/2'>
          <PlayerSeat player={seatPlayers['seat10']} game={game} />
        </div>
        <div className='absolute mt-[19vh] ml-[54vw] transform -translate-x-1/2 -translate-y-1/2'>
          <TotalPot />
        </div>
        <div className='absolute mt-[22vh] ml-[50vw] transform -translate-x-1/2 -translate-y-1/2'>
          <Pot />
        </div>
        <div className='absolute mt-[30vh] ml-[50vw] transform -translate-x-1/2'>
          <CommunityCards />
        </div>
        <div className='absolute mt-[85vh] ml-[1vw]'>
          <LogCard />
        </div>
        <div className='absolute mt-[90vh] ml-[60vw]'>
          <ActionContainer />
        </div>
      </div>
    </div>
  );
}
