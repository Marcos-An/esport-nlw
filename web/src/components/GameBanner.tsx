interface GameBannerProps {
  bannerUrl: string;
  title: string;
  adsCount: number;
}

export const GameBanner = ({ bannerUrl, title, adsCount }: GameBannerProps) => {
  return (
    <a
      href=""
      className="relative rounded-lg overflow-hidden w-[9.9rem] md:w-[12rem]"
    >
      <img src={bannerUrl} />
      <div className="w-full pt-16 pb-4 px-4 bg-game-gradiant absolute bottom-0 left-0">
        <strong className="font-bold text-white block">{title}</strong>
        <span className="text-zinc-300 block">{adsCount} anúncio(s)</span>
      </div>
    </a>
  );
};
