import seedrandom from 'seedrandom'
import { getHint } from '../logic'
import { answers } from './list'

export function getAnswerOfDay(day: number) {
  let answer: string[]
  // When the day is out of range, pick a random answer from the list.
  if (day > answers.length) {
    const seed = seedrandom(`day-${day}`)()
    answer = answers[Math.floor(seed * answers.length)]
  }
  else {
    answer = answers[day]
  }
  const [word = '', hint = ''] = answer
  return {
    word,
    hint: hint || getHint(word),
  }
}

// Get a random idiom for random mode
export function getRandomIdiom() {
  const randomIndex = Math.floor(Math.random() * answers.length)
  const answer = answers[randomIndex]
  const [word = '', hint = ''] = answer
  return {
    word,
    hint: hint || getHint(word),
  }
}
