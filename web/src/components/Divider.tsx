import { CaretDown, CaretUp } from "phosphor-react";

interface props {
  callback: Function;
  showAll: boolean;
}
export const Divider = ({ callback, showAll }: props) => {
  const DividerLine = () => {
    return <div className="w-full bg-zinc-600 h-[1px]" />;
  };

  return (
    <div className="flex items-center justify-center w-full mt-6 ">
      <DividerLine />
      {!showAll && (
        <button
          onClick={() => callback()}
          className="min-w-fit mx-6 py-1 px-4 text-xs text-violet-500 rounded hover:bg-[#3E3E40] hover:text-[#E9E9E5] flex items-center gap-3"
        >
          Mostrar mais
          <CaretDown size={16} />
        </button>
      )}

      <DividerLine />
    </div>
  );
};
