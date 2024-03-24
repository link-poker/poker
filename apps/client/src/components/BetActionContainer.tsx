import { IPlayerInfoForOthersResponse } from '@link-poker/constants';
import { useState } from 'react';
import { useTable } from 'hooks/useTable';
import { useUser } from 'hooks/useUser';
import { useWebSocketServiceContext } from 'providers/WebSocketProvider';
import StartActionContainer from './StartActionContainer';

type Props = {
  minBet: number;
  setShowLogCard: (show: boolean) => void;
  setIsBetAction: (show: boolean) => void;
};

export default function BetActionContainer(props: Props) {
  const { minBet, setShowLogCard, setIsBetAction } = props;
  const { table } = useTable();
  const { user } = useUser();
  const webSocketService = useWebSocketServiceContext();
  const [betAmount, setBetAmount] = useState(minBet);
  const isOwner = table.owner.id === user.id;
  const isNotEnoughPlayers = table.poker.activePlayers.length < 2;
  const isReadyStart = !table.poker.currentRound && table.poker.activePlayers.length >= 2;
  const isBet = !table.poker.currentBet;
  const totalBetExceptYou = table.poker.activePlayers
    .filter((player: IPlayerInfoForOthersResponse) => player.id !== user.id)
    .reduce((acc: number, player: IPlayerInfoForOthersResponse) => acc + player.bet, 0);
  const currentBet = table.poker.currentBet || 0;
  const stack = table.poker.currentActor?.stack || 0;
  const pot = (table.poker.currentPot || 0) + totalBetExceptYou + currentBet * 2;

  const onClickBetConfirm = () => {
    setIsBetAction(false);
    setShowLogCard(true);
    if (webSocketService) webSocketService.bet(betAmount);
  };

  const onClickRaiseConfirm = () => {
    setIsBetAction(false);
    setShowLogCard(true);
    if (webSocketService) webSocketService.raise(betAmount);
  };

  const onClickBack = () => {
    setIsBetAction(false);
    setShowLogCard(true);
  };

  const handleBetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = Number(e.target.value);
    setValidBetAmount(amount);
  };

  const onClickMin = () => {
    setValidBetAmount(minBet);
  };

  const onClickHalfPot = () => {
    setValidBetAmount(pot * 0.5);
  };

  const onClickThreeQuarterPot = () => {
    setValidBetAmount(pot * 0.75);
  };

  const onClickPot = () => {
    setValidBetAmount(pot);
  };

  const onClickAllIn = () => {
    setValidBetAmount(stack);
  };

  const setValidBetAmount = (amount: number) => {
    if (amount < minBet) {
      setBetAmount(minBet);
    } else if (amount > stack) {
      setBetAmount(stack);
    } else {
      setBetAmount(amount);
    }
  };

  if (isNotEnoughPlayers) return <></>;

  if (isReadyStart) {
    if (!isOwner) return <></>;
    return <StartActionContainer />;
  }

  return (
    <div>
      <div className='flex flex-row justify-end items-end gap-3'>
        <div className='flex flex-col items-center bg-stone-700 px-1 py-3 gap-2 rounded-2xl'>
          <div className='text-2xl text-stone-400'>Your bet</div>
          <div className='flex flex-row justify-center'>
            <input
              type='text'
              inputMode='numeric'
              pattern='[0-9]*'
              className='w-40 p-2 text-4xl rounded-lg bg-stone-600 text-white text-center'
              value={betAmount}
              onChange={handleBetAmountChange}
            />
          </div>
        </div>
        <div className='flex flex-col bg-stone-700 rounded-2xl'>
          <div className='flex flex-row justify-evenly w-full gap-2 p-2 text-xl text-white'>
            <button className='w-32 border border-stone-600 rounded-lg py-3' onClick={onClickMin}>
              MIN
            </button>
            <button className='w-32 border border-stone-600 rounded-lg py-3' onClick={onClickHalfPot}>
              1/2 POT
            </button>
            <button className='w-32 border border-stone-600 rounded-lg py-3' onClick={onClickThreeQuarterPot}>
              3/4 POT
            </button>
            <button className='w-32 border border-stone-600 rounded-lg py-3' onClick={onClickPot}>
              POT
            </button>
            <button className='w-32 border border-stone-600 rounded-lg py-3' onClick={onClickAllIn}>
              ALL IN
            </button>
          </div>
          <div className='flex flex-row items-center h-12 px-8 bg-stone-600 rounded-b-2xl'>
            <input
              type='range'
              className='transparent h-2 w-full cursor-pointer appearance-none rounded-lg border-transparent bg-stone-500 custom-slider'
              min={minBet - 1}
              max={table.poker.currentActor?.stack || 0}
              value={betAmount}
              onChange={handleBetAmountChange}
              step={1}
            />
          </div>
        </div>
        <button className='outline-white-btn rounded-xl px-6 py-6 text-2xl' onClick={onClickBack}>
          BACK
        </button>
        {isBet ? (
          <button className='outline-cyan-btn rounded-xl px-6 py-6 text-2xl' onClick={onClickBetConfirm}>
            BET
          </button>
        ) : (
          <button className='outline-cyan-btn rounded-xl px-6 py-6 text-2xl' onClick={onClickRaiseConfirm}>
            RAISE
          </button>
        )}
      </div>
    </div>
  );
}
