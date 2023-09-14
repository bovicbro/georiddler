import { HttpError_1, json, type RequestHandler } from "@sveltejs/kit";
import { type Guess, type Riddle, type Area, isUserGuess, type UserGuess } from "../gameTypes";


export const GET: RequestHandler = ({ request }) => {
  const random = Math.floor(Math.random() * testRiddles.length);
  const randomRiddle = testRiddles[random];
  return json(
    {
      riddle: randomRiddle.riddle,
      riddleId: randomRiddle.uuid,
    }
  )
}

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();
  if (isUserGuess(body.guess)) {
    const guess = joinUserGuess(body.guess, testRiddles);
    if (guess) {
      // if (!areaAccepted(guess)) {
      // return json({ "error": "Area too big" })
      // }
      if (evaluateGuess(guess, guess.riddle) > 0) {
        return json({ score: evaluateGuess(guess, guess.riddle), coordinates: guess.riddle.coordinates })
      }
      return json({ score: evaluateGuess(guess, guess.riddle) })
    }
  }
  return json({ "error": "Wrong type or id" })
}

const joinUserGuess = (guess: UserGuess, riddles: Riddle[]): Guess | undefined => {
  const riddle = riddles.find(riddle => riddle.uuid === guess.riddleId);
  if (riddle) {
    return {
      area: guess.area,
      riddle: riddle
    }
  } else {
    undefined
  }
}

const evaluateGuess = (guess: Guess, riddle: Riddle): number => {
  return answerInsideGuess(guess, riddle) ? riddle.points : 0;
}

const answerInsideGuess = (guess: Guess, riddle: Riddle): boolean => {
  return guess.area.bottomRight.lat <= riddle.coordinates.lat && riddle.coordinates.lat <= guess.area.topLeft.lat
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
      long: 18.0670562,
      lat: 59.3131176
    },
    riddle: "Satsa pa soder",
    points: 1,
  },
  {
    uuid: "2",
    coordinates: {
      long: 10.65656,
      lat: 57.74676
    },
    riddle: "Tip of the dane",
    points: 1,
  }
]
