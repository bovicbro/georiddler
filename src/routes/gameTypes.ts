
export type Coordinates = {
  long: number;
  lat: number;
};

export type Area = {
  topLeft: Coordinates;
  bottomRight: Coordinates;
}

export type Guess = {
  area: Area;
  riddle: Riddle;
}

export type Riddle = {
  coordinates: Coordinates;
  riddle: String;
  points: number;
  uuid: String;
}
