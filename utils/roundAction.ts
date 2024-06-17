import { usePlayers } from "@/store/usePlayers";
import { useAuthStore } from "@/store/auth";

const updatepos = async () => {
  try {
    const response = await sendRequest(`${BASE_URL}${UPDATEPOSITION}`, "POST");
    checkResponse(response);
    await mbbb();
  } catch (error) {
    console.error(error);
  }
};

const mbbb = async () => {
  try {
    const response = await sendRequest(`${BASE_URL}${MBBB}`, "POST");
    checkResponse(response);
  } catch (error) {
    console.error(error);
  }
};

const turn = async () => {
  const playersStore = usePlayers();
  const authStore = useAuthStore();
  try {
    const response = await sendRequest(`${BASE_URL}${TURN}`, "POST");
    checkResponse(response);
    const data = await response.json();
    playersStore.setFlop(data);
    sessionStorage.setItem("turn", JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
};

const river = async () => {
  const playersStore = usePlayers();
  const authStore = useAuthStore();
  try {
    const response = await sendRequest(`${BASE_URL}${RIVER}`, "POST");
    checkResponse(response);
    const data = await response.json();
    playersStore.setFlop(data);
    sessionStorage.setItem("river", JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
};

const winner = async () => {
  const playersStore = usePlayers();
  const authStore = useAuthStore();
  try {
    const response = await sendRequest(`${BASE_URL}${WINNER}`, "POST");
    checkResponse(response);
  } catch (error) {
    console.error(error);
  }
};

export const flop = () => {
  const playersStore = usePlayers();
  const activePlayers = playersStore.players.filter(
    (player) =>
      player.fold === false &&
      player.roundStage === "preflop" &&
      player.makeTurn === true
  );

  if (activePlayers.length === 0) {
    return false;
  }

  if (activePlayers.length > 2) {
    const maxBet = activePlayers.reduce((maxSum, currentPlayer) =>
      maxSum.preFlopLastBet > currentPlayer.preFlopLastBet
        ? maxSum
        : currentPlayer
    );

    const allSameMaxBet = activePlayers.every(
      (player) => player.preFlopLastBet === maxBet.preFlopLastBet
    );
    return allSameMaxBet;
  }
};

export const giveTurn = () => {
  const playersStore = usePlayers();
  const flopPlayers = playersStore.players.filter(
    (player) => player.fold === false && player.roundStage === "flop"
  );

  if (flopPlayers.length === 0) {
    return false;
  }

  const maxBet = flopPlayers.reduce((maxSum, currentPlayer) =>
    maxSum.flopLastBet > currentPlayer.flopLastBet ? maxSum : currentPlayer
  );

  const allSameMaxBet = flopPlayers.every(
    (player) =>
      player.flopLastBet === maxBet.flopLastBet && player.makeTurn === true
  );

  return allSameMaxBet;
};

export const giveRiver = () => {
  const playersStore = usePlayers();
  const turnPlayers = playersStore.players.filter(
    (player) => player.fold === false && player.roundStage === "turn"
  );

  if (turnPlayers.length === 0) {
    return false;
  }

  const maxBet = turnPlayers.reduce((maxSum, currentPlayer) =>
    maxSum.turnLastBet > currentPlayer.turnLastBet ? maxSum : currentPlayer
  );

  const allSameMaxBet = turnPlayers.every(
    (player) =>
      player.turnLastBet === maxBet.turnLastBet && player.makeTurn === true
  );

  return allSameMaxBet;
};

export const giveWinner = () => {
  const playersStore = usePlayers();
  const turnPlayers = playersStore.players.filter(
    (player) => player.fold === false && player.roundStage === "river"
  );

  if (turnPlayers.length === 0) {
    return false;
  }

  const maxBet = turnPlayers.reduce((maxSum, currentPlayer) =>
    maxSum.riverLastBet > currentPlayer.riverLastBet ? maxSum : currentPlayer
  );

  const allSameMaxBet = turnPlayers.every(
    (player) =>
      player.riverLastBet === maxBet.riverLastBet && player.makeTurn === true
  );

  return allSameMaxBet;
};
