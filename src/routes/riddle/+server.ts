import { json, type RequestHandler } from "@sveltejs/kit";
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
};

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
    riddle: "Hipsters galore where kisarna used to carry knives",
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
  },
  {
    uuid: "3",
    coordinates: {
      long: 28.9784,
      lat: 41.008
    },
    riddle: "I'm where East meets West, a city of grandeur and lore, Bridging two continents, a sight to explore. On the Bosphorus' banks, I stand tall and proud, Can you name the place where my secrets are endowed?",
    points: 1,
  }, {
    uuid: "4",
    coordinates: {
      long: 12.33289,
      lat: 45.43444
    },
    riddle: "In the city where spaghetti meets canals, I hide among the waterways and gondolas. Famous for masks and a carnival delight, Where am I located in the heart of the night?",
    points: 1
  }, {
    uuid: "5",
    coordinates: {
      long: 31.13423,
      lat: 29.97924
    },
    riddle: "Among the pyramids, I'm a desert's gem, An ancient wonder by the Nile's bend. Sphinx and pharaohs are my ancient kin, Can you guess the place I'm hidden in?",
    points: 1
  }, {
    uuid: "6",
    coordinates: {
      long: 151.2093,
      lat: -33.8688
    },
    riddle: "A land of kangaroos and endless plains wide, Down under, where nature's wonders bide. The Opera House stands by the sea's crest, Can you name the city where I'm at rest?",
    points: 1
  }, {
    uuid: "7",
    coordinates: {
      long: -111.8353,
      lat: 34.8697
    },
    riddle: "Between red rocks and canyons so deep, In the land of cowboys and dreams to keep. With cacti and deserts, I blend in just right, Can you guess the place where I hide out of sight?",
    points: 1
  }, {
    uuid: "8",
    coordinates: {
      long: 139.6917,
      lat: 35.6895
    },
    riddle: "On the island of samurais and cherry blossoms so fair, In a city where ancient temples are everywhere. Mount Fuji's view, a sight to adore, Can you name this city by the Pacific shore?",
    points: 1
  }, {
    uuid: "9",
    coordinates: {
      long: -43.2075,
      lat: -22.9083
    },
    riddle: "Where the Amazon flows through forests so grand, In a country with samba and beaches of sand. Christ the Redeemer stands tall above, What's the city I'm hinting of?",
    points: 1
  }, {
    uuid: "10",
    coordinates: {
      long: 7.9086,
      lat: 61.1591
    },
    riddle: "In a land of fjords and midnight sun's gleam, In the north, where the Northern Lights beam. Vikings once sailed these waters wide, Can you name the place where I do hide?",
    points: 1
  }, {
    uuid: "11",
    coordinates: {
      long: 100.5018,
      lat: 13.7563
    },
    riddle: "In a city where tuk-tuks roam the street, Among temples and street food so sweet. The Grand Palace and Wat Pho nearby, Can you guess the city where I lie?",
    points: 1
  }, {
    uuid: "12",
    coordinates: {
      long: 131.0429,
      lat: -25.3444
    },
    riddle: "Where the Outback stretches far and wide, Kangaroos and koalas by your side. Ayers Rock stands in the heart of the land, Can you tell me where I make my stand?",
    points: 1
  }, {
    uuid: "13",
    coordinates: {
      long: 79.9558,
      lat: 6.9271
    },
    riddle: "On an island nation in the Indian Ocean blue, With beaches and tea plantations, a stunning view. Among elephants and spice gardens galore, Can you name the city I'm hidden in for sure?",
    points: 1
  },

  {
    "uuid": "14",
    "coordinates": {
      "long": 4.8952,
      "lat": 52.3792
    },
    "riddle": "In a city of bicycles, canals, and delight, I'm a museum where art takes flight. The Night Watch and Vermeer's pearl, What's the name of this cultural whirl?",
    "points": 1
  }
  ,
  {
    "uuid": "15",
    "coordinates": {
      "long": 116.3972,
      "lat": 39.9042
    },
    "riddle": "In a land of emperors and ancient might, I'm a palace complex shining bright. Forbidden to many for years of yore, What's the name of this place to explore?",
    "points": 1
  }
  ,
  {
    "uuid": "16",
    "coordinates": {
      "long": -0.1276,
      "lat": 51.5072
    },
    "riddle": "In the heart of a city that never sleeps, Big Ben's chime over the river sweeps. A famous square with pigeons and more, What's the name of this London's core?",
    "points": 1
  }
  ,
  {
    "uuid": "17",
    "coordinates": {
      "long": 4.3517,
      "lat": 50.8503
    },
    "riddle": "In a city of chocolates, waffles, and lace, A grand square with history's embrace. Atomium gleams, and comics take flight, What's the name of this Belgian delight?",
    "points": 1
  }
  ,
  {
    "uuid": "18",
    "coordinates": {
      "long": 2.2945,
      "lat": 48.8588
    },
    "riddle": "On the river Seine's gentle flow, A tower stands tall in the city's glow. An iron lady with a view so divine, What's the name of this landmark of design?",
    "points": 1
  }
  ,
  {
    "uuid": "19",
    "coordinates": {
      "long": 151.2093,
      "lat": -33.8688
    },
    "riddle": "On an island of samurais and cherry blossoms so fair, In a city where ancient temples are everywhere. Mount Fuji's view, a sight to adore, Can you name this city by the Pacific shore?",
    "points": 1
  }
  ,
  {
    "uuid": "20",
    "coordinates": {
      "long": -74.0060,
      "lat": 40.7128
    },
    "riddle": "In a city that never seems to tire, Skyscrapers reach ever higher. Lady Liberty with her torch so bright, What's the name of this American site?",
    "points": 1
  }
]
