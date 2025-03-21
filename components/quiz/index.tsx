'use client'

import { useState, useEffect, Suspense } from 'react'
import { useCookies } from 'react-cookie'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { useSearchParams } from 'next/navigation'
import Video from 'next-video';
import results from '/videos/results.mp4';

const quizData = {
  title: "CMS Evaluation Checklist for Marketers",
  description: "Determine if your current Content Management System (CMS) aligns with your marketing goals and operational needs. If you're encountering limitations, it's time to make a change.",
  sections: [
    {
      name: "Usability",
      questions: [
        {
          question: "Can non-technical team members easily create and update content without IT support?",
          points: 5
        },
        {
          question: "Does the CMS offer customizable templates that adhere to your brand guidelines?",
          points: 5
        }
      ]
    },
    {
      name: "Performance",
      questions: [
        {
          question: "Does your website score above 90% for performance on Page Speed Insights for both desktop and mobile?",
          points: 15,
          note: "You can take the test here: https://pagespeed.web.dev/. The best way to take this test is to run Chrome in incognito mode."
        },
        {
          question: "Have you experienced major CMS errors like the 'White Screen of Death' in the past year?",
          points: -10
        }
      ]
    },
    {
      name: "SEO Capabilities",
      questions: [
        {
          question: "Does the CMS allow easy editing of meta titles, descriptions, and URLs?",
          points: 10
        },
        {
          question: "Is there built-in support for sitemaps and robots.txt files?",
          points: 10
        }
      ]
    },
    {
      name: "Scalability",
      questions: [
        {
          question: "Does your CMS support scalability for content volume, user load, and feature expansion without performance issues?",
          points: 20
        },
        {
          question: "Do you have to copy content across multiple pages instead of using reusable blocks?",
          points: -10
        }
      ]
    },
    {
      name: "Content Flexibility",
      questions: [
        {
          question: "Does the CMS support various content types (e.g., blog posts, landing pages, product listings)?",
          points: 10
        },
        {
          question: "Can you collaborate in real time with teammates?",
          points: 10
        }
      ]
    },
    {
      name: "Security",
      questions: [
        {
          question: "Does the CMS receive regular security updates?",
          points: 10
        },
        {
          question: "Is it easy to back up and restore your site?",
          points: 5
        }
      ]
    }
  ],
  scoring: {
    max_points: 100,
    guide: {
      "80_percent_above": "Your CMS has excellent usability and performance, aligning well with your team's needs.",
      "60_to_79_percent": "Your CMS's usability and performance are adequate but may benefit from some improvements.",
      "below_60_percent": "Consider evaluating alternative CMS options that offer better usability and performance for your team."
    }
  }
};

const QuizSearchParamsWrapper = ({ pageKey }: { pageKey: string }) => {
  const searchParams = useSearchParams()
  const shortKey = searchParams.get('key')

  return <CMSQuiz pageKey={pageKey} shortKey={shortKey} />
}

export default function CMSQuizSuspense({ pageKey }: { pageKey: string }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuizSearchParamsWrapper pageKey={pageKey} />
    </Suspense>
  )
}

function CMSQuiz({ pageKey, shortKey }: { pageKey: string; shortKey: string | null }) {
  const [cookies, setCookie, removeCookie] = useCookies(['hasSubmittedForm', 'quizResults'])
  const [currentSection, setCurrentSection] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showUserInfoModal, setShowUserInfoModal] = useState(false)
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    companySize: '',
  })

  useEffect(() => {
    if (shortKey && shortKey === pageKey) {
      setShowUserInfoModal(false); // Ensure modal does not show
      return;
    }
  
    if (!cookies.hasSubmittedForm) {
      setShowUserInfoModal(true);
    } else if (cookies.quizResults) {
      const savedResults = cookies.quizResults;
      console.log('Parsed cookie score:', savedResults.score);
  
      if (savedResults && typeof savedResults.score === 'number') {
        setScore(savedResults.score);
        setShowResult(true);
      }
    }
  }, [cookies.hasSubmittedForm, cookies.quizResults, removeCookie, shortKey, pageKey]);

  const handleAnswer = (answer: string) => {
    const newAnswers = { ...answers }
    const currentQuestionData = quizData.sections[currentSection]?.questions[currentQuestion]
    if (currentQuestionData) {
      newAnswers[`${currentSection}-${currentQuestion}`] = answer === 'yes' ? currentQuestionData.points : 0
      setAnswers(newAnswers)
      updateProgress()
    }
  }

  const handleNext = () => {
    if (currentQuestion < (quizData.sections[currentSection]?.questions.length || 0) - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else if (currentSection < quizData.sections.length - 1) {
      setCurrentSection(currentSection + 1)
      setCurrentQuestion(0)
    } else {
      calculateScore()
      setShowResult(true)
    }
  }

  const updateProgress = () => {
    const totalQuestions = quizData.sections.reduce((sum, section) => sum + section.questions.length, 0)
    const answeredQuestions = Object.keys(answers).length
    const currentQuestionAnswered = answers[`${currentSection}-${currentQuestion}`] !== undefined
    setProgress(((answeredQuestions + (currentQuestionAnswered ? 0 : 1)) / totalQuestions) * 100)
  }

  const calculateScore = () => {
    const totalScore = Object.values(answers).reduce((sum, value) => sum + value, 0)
    const finalScore = Math.max(totalScore, 0)
    console.log('Calculating score:', finalScore)
    setScore(finalScore)
    setCookie('quizResults', JSON.stringify({ score: finalScore }), { path: '/', maxAge: 31536000 }) // 1 year expiration
    console.log('Cookie set with score:', JSON.stringify({ score: finalScore }))
  }

  const getResultMessage = () => {
    const percentage = (score / quizData.scoring.max_points) * 100
    if (percentage >= 80) return quizData.scoring.guide["80_percent_above"]
    if (percentage >= 60) return quizData.scoring.guide["60_to_79_percent"]
    return quizData.scoring.guide["below_60_percent"]
  }

  const handleUserInfoSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await fetch('https://usebasin.com/f/dda4fcf3088a', {
        method: 'POST',
        body: new FormData(e.currentTarget),
      })

      if (response.ok) {
        setCookie('hasSubmittedForm', 'true', { path: '/', maxAge: 31536000 }) // 1 year expiration
        setShowUserInfoModal(false)
      } else {
        alert('There was an issue submitting the form. Please try again.')
      }
    } catch (error) {
      console.error('An error occurred:', error)
      alert('An error occurred. Please try again.')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.id]: e.target.value })
  }

  const handleRetakeQuiz = () => {
    setCurrentSection(0)
    setCurrentQuestion(0)
    setAnswers({})
    setScore(0)
    setShowResult(false)
    setProgress(0)
    removeCookie('quizResults', { path: '/' })
  }

  useEffect(() => {
    updateProgress()
  }, [updateProgress])

  if (showResult) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className='mb-5'>Your CMS Assessment Results</CardTitle>
          <Video src={results} />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-6 bg-muted rounded-lg">
            <p className="text-2xl font-bold mb-2">Score: {score} / {quizData.scoring.max_points}</p>
            <p className="text-lg">{getResultMessage()}</p>
          </div>
          <div className="space-y-2">
            <p className="font-medium">What&apos;s Next?</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Review your answers and identify areas for improvement</li>
              <li>Explore modern CMS solutions that address your pain points</li>
              <li>Consider scheduling a consultation with our CMS experts</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            onClick={() => window.open('https://calendly.com/ohmni/quiz', '_blank')}
            className="w-full bg-primary plausible-event-name=Scheduled+Consultation"
          >
            Schedule a Consultation
          </Button>
          <Button 
            onClick={handleRetakeQuiz}
            className="w-full plausible-event-name=Retake+Quiz"
            variant="outline"
          >
            Retake Assessment
          </Button>
        </CardFooter>
      </Card>
    )
  }

  const currentQuestionData = quizData.sections[currentSection]?.questions[currentQuestion]

  if (!currentQuestionData) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p>There was an error loading the quiz data. Please try again later.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className='leading-relaxed'>{quizData.title}</CardTitle>
          <CardDescription>{quizData.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Progress value={progress} className="w-full" />
          <div>
            <h2 className="text-xl font-semibold mb-4">{quizData.sections[currentSection].name}</h2>
            <RadioGroup 
              onValueChange={(value) => handleAnswer(value)}
              value={answers[`${currentSection}-${currentQuestion}`] === undefined ? '' : (answers[`${currentSection}-${currentQuestion}`] !== 0 ? 'yes' : 'no')}
              className="space-y-3"
            >
              <p className="text-lg mb-4">{currentQuestionData.question}</p>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="yes" />
                <Label htmlFor="yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="no" />
                <Label htmlFor="no">No</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleNext} 
            disabled={answers[`${currentSection}-${currentQuestion}`] === undefined}
            className={`w-full ${currentSection === quizData.sections.length - 1 && currentQuestion === quizData.sections[currentSection].questions.length - 1 ? 'plausible-event-name=Finished+Quiz' : ''}`}
          >
            {currentSection === quizData.sections.length - 1 && currentQuestion === quizData.sections[currentSection].questions.length - 1 ? 'View Results' : 'Next Question'}
          </Button>
        </CardFooter>
      </Card>

      <Dialog 
        open={showUserInfoModal}
        onOpenChange={(isOpen) => {
          // Prevent closing when clicking outside
          if (!isOpen) setShowUserInfoModal(true);
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Before we begin...</DialogTitle>
            <DialogDescription>
              Please provide your information to start the CMS assessment.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUserInfoSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="name" name='name' value={userInfo.email} className='border border-black' onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" name='email' value={userInfo.email} className='border border-black' onChange={handleInputChange} required />
            </div>
            <DialogFooter className='mt-5'>
              <Button type="submit" className="w-full plausible-event-name=Quiz+Form+Submit">Start Assessment</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}