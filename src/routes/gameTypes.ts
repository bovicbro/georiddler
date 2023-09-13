
export type Coordinates = {
  lat: number;
  long: number;
};

export type Area = {
  topLeft: Coordinates;
  bottomRight: Coordinates;
}

export type Guess = {
  area: Area;
  riddle: Riddle;
}

export const createUserGuess = (area: Area, riddleId: string): UserGuess => {
  return {
    _type: "UserGuess",
    area: area,
    riddleId: riddleId
  } as UserGuess;
}

export type UserGuess = {
  _type: "UserGuess";
  area: Area;
  riddleId: string;
}

export const isUserGuess = (guess: any): guess is UserGuess => {
  return guess._type === "UserGuess";
}

export type Riddle = {
  coordinates: Coordinates;
  riddle: string;
  points: number;
  uuid: string;
}
