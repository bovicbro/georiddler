export type State = {
  riddle: string | undefined;
  riddleId: string | undefined;
  guessedCorrect: boolean;
  numberOfGuesses: number;
  showInstructions: boolean;
};

const updateState = (state: State): State => {
  return {
    riddle: state.riddle,
    riddleId: state.riddleId,
    guessedCorrect: state.guessedCorrect,
    numberOfGuesses: state.numberOfGuesses,
    showInstructions: state.showInstructions
  };
};

export const getInitialState = () => {
  return {
    riddle: undefined,
    riddleId: undefined,
    guessedCorrect: false,
    numberOfGuesses: 0,
    showInstructions: false
  };
}

export const resetState = (state: State): State => {
  return updateState({
    riddle: undefined,
    riddleId: undefined,
    guessedCorrect: false,
    numberOfGuesses: 0,
    showInstructions: state.showInstructions
  });
};

