'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Question {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
  emoji: string
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: 'What is the fastest land animal on Earth?',
    options: ['Lion', 'Cheetah', 'Greyhound', 'Pronghorn Antelope'],
    correct: 1,
    explanation: 'The cheetah can reach speeds of up to 75 mph (120 km/h) in short bursts, making it the fastest land animal.',
    emoji: '🐆',
  },
  {
    id: 2,
    question: 'How many hearts does an octopus have?',
    options: ['1', '2', '3', '4'],
    correct: 2,
    explanation: 'Octopuses have 3 hearts: two pump blood to the gills, and one pumps it to the rest of the body.',
    emoji: '🐙',
  },
  {
    id: 3,
    question: 'Which bird has the largest wingspan of any living species?',
    options: ['Bald Eagle', 'Wandering Albatross', 'Andean Condor', 'Dalmatian Pelican'],
    correct: 1,
    explanation: 'The Wandering Albatross has the largest wingspan of any living bird, reaching up to 11.5 feet (3.5 meters).',
    emoji: '🦅',
  },
  {
    id: 4,
    question: "A dog's sense of smell is approximately how many times stronger than a human's?",
    options: ['100 times', '1,000 times', '10,000 times', '100,000 times'],
    correct: 3,
    explanation: 'Dogs have up to 300 million olfactory receptors vs. about 6 million in humans — giving them a sense of smell up to 100,000 times more sensitive.',
    emoji: '🐕',
  },
  {
    id: 5,
    question: 'Which animal sleeps the most hours per day on average?',
    options: ['Sloth', 'Cat', 'Koala', 'Lion'],
    correct: 2,
    explanation: 'Koalas sleep up to 22 hours a day! Their low-nutrition eucalyptus diet means they must conserve energy.',
    emoji: '🐨',
  },
  {
    id: 6,
    question: 'What is a group of flamingos called?',
    options: ['A flock', 'A flamboyance', 'A colony', 'A pride'],
    correct: 1,
    explanation: 'A group of flamingos is called a "flamboyance" — perfectly matching their colorful and dramatic appearance!',
    emoji: '🦩',
  },
  {
    id: 7,
    question: 'Which animal has the longest gestation period?',
    options: ['African Elephant', 'Giraffe', 'Blue Whale', 'Rhinoceros'],
    correct: 0,
    explanation: 'African elephants carry their young for about 22 months — nearly 2 years — the longest gestation period of any land animal.',
    emoji: '🐘',
  },
  {
    id: 8,
    question: 'How many toes do cats typically have on each front paw?',
    options: ['4', '5', '6', 'It varies by breed'],
    correct: 1,
    explanation: 'Cats typically have 5 toes on each front paw (including the dewclaw) and 4 on each back paw.',
    emoji: '🐱',
  },
  {
    id: 9,
    question: 'What is the only mammal naturally capable of true sustained flight?',
    options: ['Flying Squirrel', 'Sugar Glider', 'Bat', 'Colugo'],
    correct: 2,
    explanation: 'Bats are the only mammals with true powered flight. Flying squirrels, sugar gliders, and colugos only glide.',
    emoji: '🦇',
  },
  {
    id: 10,
    question: 'Which animal has blue blood?',
    options: ['Blue Whale', 'Horseshoe Crab', 'Blue-ringed Octopus', 'Azure Jay'],
    correct: 1,
    explanation: "Horseshoe crabs have blue blood due to copper-based hemocyanin (instead of iron-based hemoglobin). Their blood is also used in medical testing!",
    emoji: '🦀',
  },
]

type GameState = 'intro' | 'playing' | 'result'

function getResultData(score: number) {
  if (score === 10) return { title: 'Perfect Score! 🏆', desc: "You're a true Animal Expert — flawless!", emoji: '🦁', color: 'from-yellow-400 to-orange-500' }
  if (score >= 8) return { title: 'Wildlife Expert! 🌟', desc: 'Impressive! You know the animal kingdom really well.', emoji: '🐆', color: 'from-orange-400 to-amber-500' }
  if (score >= 6) return { title: 'Animal Enthusiast! 🐾', desc: 'Great job! You have solid animal knowledge.', emoji: '🐘', color: 'from-green-400 to-emerald-500' }
  if (score >= 4) return { title: 'Nature Learner 🌿', desc: "Not bad! Keep exploring the animal world.", emoji: '🦔', color: 'from-blue-400 to-cyan-500' }
  return { title: 'Animal Rookie 🐣', desc: "Every expert started somewhere — keep learning!", emoji: '🐧', color: 'from-purple-400 to-pink-500' }
}

export default function QuizPage() {
  const [gameState, setGameState] = useState<GameState>('intro')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])

  const question = QUESTIONS[currentQuestion]
  const isLastQuestion = currentQuestion === QUESTIONS.length - 1
  const progress = ((currentQuestion + (showExplanation ? 1 : 0)) / QUESTIONS.length) * 100
  const result = getResultData(score)

  function handleAnswer(optionIndex: number) {
    if (selectedAnswer !== null) return
    setSelectedAnswer(optionIndex)
    setShowExplanation(true)
    if (optionIndex === question.correct) {
      setScore(s => s + 1)
    }
    setAnswers(prev => [...prev, optionIndex])
  }

  function handleNext() {
    if (isLastQuestion) {
      setGameState('result')
    } else {
      setCurrentQuestion(q => q + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    }
  }

  function handleRestart() {
    setGameState('intro')
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setScore(0)
    setAnswers([])
  }

  if (gameState === 'intro') {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="text-7xl mb-6">🎯</div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Animal Knowledge Quiz</h1>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          Think you know the animal kingdom? Test your knowledge with 10 questions about animals from around the world!
        </p>
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { emoji: '❓', label: '10 Questions' },
            { emoji: '🧠', label: 'Fun Facts' },
            { emoji: '🏆', label: 'Get Your Score' },
          ].map(({ emoji, label }) => (
            <div key={label} className="bg-orange-50 rounded-xl p-4">
              <div className="text-2xl mb-1">{emoji}</div>
              <div className="text-sm font-medium text-gray-700">{label}</div>
            </div>
          ))}
        </div>
        <button
          onClick={() => setGameState('playing')}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-10 py-4 rounded-xl text-xl transition-colors shadow-lg shadow-orange-200"
        >
          Start Quiz →
        </button>
        <p className="text-sm text-gray-400 mt-4">No login required · Completely free</p>
      </div>
    )
  }

  if (gameState === 'result') {
    const tweetText = encodeURIComponent(`I scored ${score}/10 on the Animal Knowledge Quiz! ${result.title}\n\nTest yourself at vetrefill.com/quiz 🐾`)
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className={`bg-gradient-to-br ${result.color} rounded-3xl p-10 text-white mb-8 shadow-xl`}>
          <div className="text-7xl mb-4">{result.emoji}</div>
          <h1 className="text-3xl font-extrabold mb-2">{result.title}</h1>
          <p className="text-white/90 text-lg mb-6">{result.desc}</p>
          <div className="text-6xl font-extrabold mb-1">{score}<span className="text-3xl opacity-70">/10</span></div>
          <p className="text-white/80 text-sm">Questions correct</p>
        </div>

        {/* Answer Review */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8 text-left shadow-sm">
          <h2 className="font-bold text-gray-900 mb-4 text-lg">Answer Review</h2>
          <div className="space-y-3">
            {QUESTIONS.map((q, i) => (
              <div key={q.id} className="flex items-start gap-3">
                <span className="text-lg flex-shrink-0">{answers[i] === q.correct ? '✅' : '❌'}</span>
                <div>
                  <p className="text-sm font-medium text-gray-800">{q.question}</p>
                  {answers[i] !== q.correct && (
                    <p className="text-xs text-orange-600 mt-0.5">Correct: {q.options[q.correct]}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleRestart}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-xl transition-colors"
          >
            🔄 Play Again
          </button>
          <a
            href={`https://twitter.com/intent/tweet?text=${tweetText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black hover:bg-gray-800 text-white font-bold px-8 py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Share on X
          </a>
          <Link
            href="/news"
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-8 py-3 rounded-xl transition-colors"
          >
            📰 Read News
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
          <span>Question {currentQuestion + 1} of {QUESTIONS.length}</span>
          <span className="font-semibold text-orange-600">Score: {score}/{currentQuestion + (showExplanation ? 1 : 0)}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-orange-500 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <div className="text-5xl text-center mb-6">{question.emoji}</div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-8 leading-tight">
          {question.question}
        </h2>

        <div className="space-y-3">
          {question.options.map((option, idx) => {
            let cls = 'w-full text-left px-5 py-4 rounded-xl border-2 font-medium text-sm sm:text-base transition-all '
            if (selectedAnswer === null) {
              cls += 'border-gray-200 text-gray-700 hover:border-orange-300 hover:bg-orange-50'
            } else if (idx === question.correct) {
              cls += 'border-green-500 bg-green-50 text-green-800'
            } else if (idx === selectedAnswer && idx !== question.correct) {
              cls += 'border-red-400 bg-red-50 text-red-700'
            } else {
              cls += 'border-gray-200 text-gray-400 opacity-60'
            }

            return (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className={cls}
                disabled={selectedAnswer !== null}
              >
                <span className="inline-flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {['A', 'B', 'C', 'D'][idx]}
                  </span>
                  {option}
                </span>
              </button>
            )
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className={`mt-6 p-4 rounded-xl text-sm leading-relaxed ${
            selectedAnswer === question.correct
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            <strong>{selectedAnswer === question.correct ? '✅ Correct!' : '❌ Incorrect!'}</strong>
            <p className="mt-1">{question.explanation}</p>
          </div>
        )}

        {showExplanation && (
          <button
            onClick={handleNext}
            className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl text-lg transition-colors"
          >
            {isLastQuestion ? 'See My Results 🏆' : 'Next Question →'}
          </button>
        )}
      </div>
    </div>
  )
}
