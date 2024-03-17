type Props = {
  display: string;
  isSelected: boolean;
  onClick: () => void;
};

export default function OptionsSelectButton(props: Props) {
  const { display, isSelected, onClick } = props;

  if (isSelected) {
    return (
      <button className='h-32 w-72 bg-cyan-800' disabled>
        {display}
      </button>
    );
  }

  return (
    <button className='h-32 w-72 bg-stone-800' onClick={onClick}>
      {display}
    </button>
  );
}
