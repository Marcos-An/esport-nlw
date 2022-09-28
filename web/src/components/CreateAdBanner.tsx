import { MagnifyingGlassPlus } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";

export const CreateAdBanner = () => {
  return (
    <div className="pt-1 bg-nlw-gradiant self-stretch rounded-t-lg mt-8 overflow-hidden ">
      <div
        className="
        bg-[#2A2634]
         py-4 
         md:py-6 
         px-8 
         flex 
         justify-between 
         items-center 
         flex-col 
         text-center 
         md:flex-row 
         md:text-left"
      >
        <div>
          <strong className="text-white text-1xl md:text-2xl font-black block">
            Não encontrou o seu duo?
          </strong>
          <span className="text-zinc-400 hidden text-xs md:text-base md:block">
            Publique um anúncio para encontrar novos players!
          </span>
        </div>
        <Dialog.Trigger className="py-2 px-3 mt-3 w-full md:w-auto md:py-3 md:px-4 bg-violet-500 text-white rounded hover:bg-violet-600 flex items-center justify-center gap-3">
          <MagnifyingGlassPlus size={24} />
          Publicar anúncio
        </Dialog.Trigger>
      </div>
    </div>
  );
};
