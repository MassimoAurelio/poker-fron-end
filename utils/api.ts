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
export const TERN = "tern";

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
