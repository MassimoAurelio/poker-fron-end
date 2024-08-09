import { usePlayers } from "@/store/usePlayers";
import { useAuthStore } from "@/store/auth";

export const BASE_URL: string = "http://localhost:5000/";
export const NEXT_PLAYER: string = "nextplayer";
export const COLL: string = "coll";
export const JOIN: string = "join";
export const LEAVE: string = "leave";
export const PLAYERS: string = "players";
export const FOLD: string = "fold";
export const RAISE: string = "raise";
export const UPDATEPOSITION: string = "updatepos";
export const MBBB: string = "mbbb";
export const DEAL: string = "deal";
export const GIVEFLOP: string = "giveflop";
export const TURN: string = "turn";
export const RIVER: string = "river";
export const WINNER: string = "winner";
export const CHECK: string = "check";

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
export const checkResponse = (response: Response) => {
  if (!response.ok) {
    return response.json().then((error) => {
      console.error("Error response:", error);
      throw new Error(error.message || "Something went wrong");
    });
  }
  return response;
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
    if (!player) {
      return null;
    }
    if (player?.roundStage === "preflop") {
      return player.preFlopLastBet;
    } else if (player?.roundStage === "flop") {
      return player.flopLastBet;
    } else if (player?.roundStage === "turn") {
      return player.turnLastBet;
    } else if (player?.roundStage === "river") {
      return player.riverLastBet;
    }
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
