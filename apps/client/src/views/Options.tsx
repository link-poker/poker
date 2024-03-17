'use client';
import { useState } from 'react';
import { MdKeyboardDoubleArrowLeft } from 'react-icons/md';
import GameSetting from 'components/GameSetting';
import OptionsSelectButton from 'components/OptionsSelectButton.tsx';
import PlayersSetting from 'components/PlayersSettings';
import PreferenceSetting from 'components/PreferencesSetting';
import { IPlayer } from 'interfaces/core/IPlayer';

enum Select {
  PLAYERS,
  GAME,
  PREFERENCE,
}

type Props = {
  backTable: () => void;
  players: IPlayer[];
};

export default function Options(props: Props) {
  const { backTable, players } = props;
  const [selected, setSelected] = useState<Select>(Select.PLAYERS);

  return (
    <div className='h-screen bg-stone-800'>
      <div className='flex flex-col w-full'>
        <div className='flex flex-row justify-start items-center text-3xl'>
          <button className='flex flex-row justify-center items-center h-32 w-72' onClick={backTable}>
            <MdKeyboardDoubleArrowLeft size={50} />
            BACK
          </button>
          <OptionsSelectButton
            display='PLAYERS'
            isSelected={selected === Select.PLAYERS}
            onClick={() => setSelected(Select.PLAYERS)}
          />
          <OptionsSelectButton
            display='GAME'
            isSelected={selected === Select.GAME}
            onClick={() => setSelected(Select.GAME)}
          />
          <OptionsSelectButton
            display='PREFERENCE'
            isSelected={selected === Select.PREFERENCE}
            onClick={() => setSelected(Select.PREFERENCE)}
          />
        </div>
        <div className='h-4 w-full bg-cyan-800' />
        <div className='flex flex-row justify-start items-center'>
          {selected === Select.PLAYERS && <PlayersSetting players={players} />}
          {selected === Select.GAME && <GameSetting />}
          {selected === Select.PREFERENCE && <PreferenceSetting />}
        </div>
      </div>
    </div>
  );
}
