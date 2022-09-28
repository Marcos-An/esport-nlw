import { useEffect, useState } from "react";
import logoImage from "/assets/logo.svg";
import { GameBanner } from "./components/GameBanner";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { Divider } from "./components/Divider";
import * as Dialog from "@radix-ui/react-dialog";
import { CreateAdModal } from "./components/CreateAdModal";
import axios from "axios";

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (games.length === 0) {
      axios("http://localhost:4000/games/highlights").then((response) =>
        setGames(response.data)
      );
    }
  }, []);

  const getAllGames = async () => {
    await axios("http://localhost:4000/games").then((response) =>
      setGames(response.data)
    );
  };

  const handleShowAll = () => {
    getAllGames();
    setShowAll(!showAll);
  };

  return (
    <div className="max-w-[1344px] mx-auto flex items-center flex-col">
      <img src={logoImage} className="my-12 w-48 md:my-20 md:w-auto " />

      <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-black mb-9 md:mb-16 gap-1">
        Seu {""}
        <span className="bg-nlw-gradiant text-transparent bg-clip-text">
          duo {""}
        </span>
        está aqui.
      </h1>

      <div className="flex flex-wrap gap-6 justify-center px-4">
        {games.map((game) => {
          return (
            <GameBanner
              key={game.id}
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCount={game._count.ads}
            />
          );
        })}
        <Divider callback={handleShowAll} showAll={showAll} />
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}

export default App;
