// "use client"

// import { Button } from "@/components/ui"
// import { Form } from "@/components/ui/form"
// import { cn } from "@/lib/utils"
// import { FC, useEffect, useState } from "react"
// import { useForm } from "react-hook-form"
// import Node from "./Node"
// import { useQuestion } from "./useQuestions"

// const quiz = [
//   {
//     question: "q1",
//     options: [
//       {
//         answer: "q1 - 1",
//         isCorrect: true,
//       },
//       {
//         answer: "q1 -2",
//         isCorrect: false,
//       },
//       {
//         answer: "q1 - 3",
//         isCorrect: false,
//       },
//       {
//         answer: "q1 - 4",
//         isCorrect: false,
//       },
//     ],
//   },
//   {
//     question: "q2",
//     options: [
//       {
//         answer: "q2 - 1",
//         isCorrect: true,
//       },
//       {
//         answer: "q2 - 2",
//         isCorrect: false,
//       },
//       {
//         answer: "q2 - 3",
//         isCorrect: false,
//       },
//       {
//         answer: "q2 - 4",
//         isCorrect: false,
//       },
//     ],
//   },
//   {
//     question: "q3",
//     options: [
//       {
//         answer: "q3 - 1",
//         isCorrect: true,
//       },
//       {
//         answer: "q3 - 2",
//         isCorrect: false,
//       },
//       {
//         answer: "q3 - 3",
//         isCorrect: false,
//       },
//       {
//         answer: "q3 - 4",
//         isCorrect: false,
//       },
//     ],
//   },
// ]

// const Game: FC = () => {
//   const [isNextDisabled, setIsNextDisabled] = useState(true)
//   const form = useForm()

//   const questionsNodes = quiz.map(({ question, options }, i) => {
//     return (
//       <Node
//         key={question}
//         question={question}
//         options={options}
//         i={i}
//         form={form}
//       />
//     )
//   })

//   const { next, prev, currentQuestionIndex, isPrevShown, isNextShown } =
//     useQuestion(questionsNodes)

//   function onSubmit() {
//     console.log(form.getValues())
//   }

//   function handleNext() {
//     const currentValue = form.getValues(`question${currentQuestionIndex}`)
//     if (!currentValue) return
//     // setIsNextDisabled(true)

//     next()
//   }

//   function handlePrev() {
//     // setIsNextDisabled(false)
//     prev()
//   }

// 	form.watch()

//   useEffect(() => {
//     // const subscription = form.watch((value) => {
//       // console.log(value)
// 			const values = form.getValues()
// 			console.log(values)

//       const filledSteps = Object.keys(values).map((key) => key.at(-1))
//       const isFilled = filledSteps.includes(String(currentQuestionIndex))

//       console.log(filledSteps, isFilled)

//       if (isFilled) {
//         setIsNextDisabled(false)
//       }
//     // })
//     // return () => subscription.unsubscribe()
//   }, [currentQuestionIndex])

//   return (
//     <main className="container flex flex-1 items-center justify-center">
//       <section>
//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit(onSubmit)}
//             className="flex flex-col gap-2"
//           >
//             {questionsNodes[currentQuestionIndex]}
//             <div
//               className={cn("flex items-center justify-end px-2", {
//                 "justify-between": isPrevShown,
//               })}
//             >
//               {isPrevShown && (
//                 <Button onClick={handlePrev} type="button">
//                   Prev
//                 </Button>
//               )}

//               {isNextShown && (
//                 <Button
//                   disabled={isNextDisabled}
//                   onClick={handleNext}
//                   type="button"
//                 >
//                   Next
//                 </Button>
//               )}
//               {!isNextShown && (
//                 <Button
//                   disabled={isNextDisabled}
//                   onClick={onSubmit}
//                   type="submit"
//                 >
//                   Submit
//                 </Button>
//               )}
//             </div>
//           </form>
//         </Form>
//       </section>
//     </main>
//   )
// }

// export default Game
