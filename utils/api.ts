import { usePlayers } from "@/store/usePlayers";
import { useAuthStore } from "@/store/auth";

export const BASE_URL = "http://localhost:5000/";
export const NEXT_PLAYER = "nextplayer";
export const COLL = "coll";
export const JOIN = "join";
export const LEAVE = "leave";
export const PLAYERS = "players";
export const FOLD = "fold";
export const RAISE = "raise";
export const UPDATEPOSITION = "updatepos";
export const MBBB = "mbbb";
export const DEAL = "deal";
export const GIVEFLOP = "giveflop";
export const TURN = "turn";
export const RIVER = "river";
export const WINNER = "winner";
export const CHECK = "check";

// Функция для отправки запроса
export const sendRequest = async (url: string, method: string) => {
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

// Функция для отправки запроса c телом
export const sendRequestWithBody = async (
  url: string,
  method: string,
  body: any
) => {
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return response;
};

// Функция для проверки ответа
export const checkResponse = (response: any) => {
  if (!response.ok) {
    throw new Error("WARNING");
  }
};

export function getPlayerName(props: { name: string }) {
  const playersStore = usePlayers();
  const name = playersStore.players.find(
    (player) => player.name === props.name
  );
  return name?.name || " ";
}

export function getBalance(props: { name: string }) {
  const playersStore = usePlayers();

  const balance = computed(() => {
    const player = playersStore.players.find(
      (player) => player.name === props.name
    );
    return player?.stack || 0;
  });

  return balance;
}

export function getLastBet(props: { name: string }) {
  const playersStore = usePlayers();
  const lastBet = computed(() => {
    const player = playersStore.players.find(
      (player) => player.name === props.name
    );

    return player?.lastBet || 0;
  });
  return lastBet;
}

export function getFirstCard(props: { name: string }) {
  const playersStore = usePlayers();
  const player = playersStore.players.find(
    (player) => player.name === props.name
  );
  const firstCard = {
    value: player?.cards[0].value || null,
    suite: player?.cards[0].suit || null,
  };
  return firstCard;
}

export function getSecondCard(props: { name: string }) {
  const playersStore = usePlayers();
  const player = playersStore.players.find(
    (player) => player.name === props.name
  );

  const secondCard = {
    value: player?.cards[1].value || null,
    suite: player?.cards[1].suit || null,
  };
  return secondCard;
}

export function isFold(props: { name: string }) {
  const playersStore = usePlayers();
  return playersStore.players.some(
    (player) => player.name === props.name && player.fold === false
  );
}

export function pos(props: { name: string }) {
  const playersStore = usePlayers();
  return playersStore.players.find(
    (player) => player.position === 6 && player.name === props.name
  );
}

export function playerAndCurrentPlayerId(props: { name: string }) {
  const playersStore = usePlayers();
  return playersStore.players.some(
    (player) => player.name === props.name && player.currentPlayerId === true
  );
}

export function playerExists(props: { name: string }) {
  const playersStore = usePlayers();
  return playersStore.players.some((player) => player.name === props.name);
}
