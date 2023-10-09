import type { State } from "./game";


export const toggleInstructions = (state: State): State => {
  if (state.showInstructions) {
    return { ...state, showInstructions: false };
  } else {
    return { ...state, showInstructions: true };
  }
};
