import express from "express";
import { PrismaClient } from "@prisma/client";
import { convertHourToMinutes } from "./utils/convertHourToMinutes";
import { convertMinutesToHour } from "./utils/convertMinutesToHour";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
const Prisma = new PrismaClient();

app.get("/games", async (req, res) => {
  const games = await Prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });

  res.json(games);
});

app.get("/games/highlights", async (req, res) => {
  const games = await Prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });

  res.json(games.slice(0, 6));
});

app.post("/ads", (req, res) => {
  res.json({ msg: "ele gosta" });
});

app.get("/games/:id/ads", async (req, res) => {
  const gameId = req.params.id;

  const ads = await Prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  res.json(
    ads.map((ad) => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(","),
        hourStart: convertMinutesToHour(ad.hourStart),
        hourEnd: convertMinutesToHour(ad.hourEnd),
      };
    })
  );
});

app.get("/ads/:id/discord", async (req, res) => {
  const adId = req.params.id;

  const ad = await Prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    },
  });

  res.json({ discord: ad.discord });
});

app.post("/games/:id/ads", async (req, res) => {
  const gameId = req.params.id;

  const body = req.body;

  const ad = await Prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearPlaying: body.yearPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(","),
      hourStart: convertHourToMinutes(body.hourStart),
      hourEnd: convertHourToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
      createdAt: body.createdAt,
    },
  });

  return res.json(ad);
});

app.listen(4000);
