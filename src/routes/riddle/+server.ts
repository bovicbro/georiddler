import { json, type RequestHandler } from "@sveltejs/kit";
import { type Guess, type Riddle, type Area, isUserGuess, type UserGuess } from "../gameTypes";


export const GET: RequestHandler = ({ request }) => {
  return json(
    {
      riddle: testRiddles[0]
    }
  )
}

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();
  console.log(body)

  if (isUserGuess(body.guess)) {
    const guess = joinUserGuess(body.guess, testRiddles);
    if (guess) {
      // if (!areaAccepted(guess)) {
      // return json({ "error": "Area too big" })
      // }
      console.log(evaluateGuess(guess, guess.riddle))
      return json(evaluateGuess(guess, guess.riddle))
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
  console.log(guess.area.topLeft.lat, riddle.coordinates.lat, guess.area.bottomRight.lat)
  console.log(guess.area.topLeft.long, riddle.coordinates.long, guess.area.bottomRight.long)
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
