type Props = {
  players: {
    name: string;
    stack: number;
    bet: number;
    hole: string[];
    hand: string | null;
    status: string;
    isYou: boolean;
  }[];
};

export default function PlayersSetting(props: Props) {
  const { players } = props;

  return (
    <div className='flex flex-col h-[85vh] w-full p-8 overflow-auto'>
      {players.map(player => (
        <div
          className='flex flex-row justify-between items-center w-full border border-white rounded-2xl mb-8 p-4'
          key={player.name}
        >
          <div className='flex flex-col justify-center items-start h-24 ml-8 gap-2'>
            <div className='text-4xl'>{player.name}</div>
            <div className='text-2xl'>Playing with {player.stack} stack</div>
          </div>
          {player.isYou && <button className='outline-white-btn p-6 rounded-xl text-4xl'>EDIT</button>}
        </div>
      ))}
    </div>
  );
}
