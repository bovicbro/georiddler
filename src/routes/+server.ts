import { json, type RequestHandler } from "@sveltejs/kit";
import type { Area, Guess, Riddle } from "./gameTypes";


export const GET: RequestHandler = ({ request }) => {
  return json(
    {
      riddle: testRiddles[0]
    }
  )
}


const answerInsideGuess = (guess: Guess, riddle: Riddle): boolean => {
  return guess.area.topLeft.lat <= riddle.coordinates.lat && riddle.coordinates.lat <= guess.area.bottomRight.lat
    && guess.area.topLeft.long <= riddle.coordinates.long && riddle.coordinates.long <= guess.area.bottomRight.long;
}

const areaAccepted = (guess: Guess): boolean => {
  const acceptedTotalArea = 1;
  return calcualteArea(guess.area) <= acceptedTotalArea;
}

const calcualteArea = (area: Area): number => {
  const width = area.bottomRight.long - area.topLeft.long;
  const height = area.bottomRight.lat - area.topLeft.lat;
  return width * height;
}

const testRiddles: Riddle[] = [
  {
    uuid: "1",
    coordinates: {
      long: 18.0686,
      lat: 59.3293
    },
    riddle: "A place on earth",
    points: 1,
  }
]
