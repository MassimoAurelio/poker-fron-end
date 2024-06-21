import { usePlayers } from "@/store/usePlayers";

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

  if (activePlayers.length > 1) {
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

export const lastWinner = () => {
  const playersStore = usePlayers();
  let countFoldFalse = 0;
  const users = playersStore.players;

  if (users.length > 1) {
    for (let user of users) {
      if (user.fold === false) {
        countFoldFalse++;
        if (countFoldFalse > 1) {
          return false;
        }
      } else if (user.fold !== true) {
        return false;
      }
    }
  }

  return countFoldFalse === 1;
};
