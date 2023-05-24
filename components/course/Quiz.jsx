import { Button, CircularProgress, CircularProgressLabel, Progress } from "@chakra-ui/react";
import styles from "@/styles/Login.module.css";
import { toast } from "react-hot-toast";


const { useRouter } = require("next/router");
const { useState, useEffect } = require("react");


export default function Quiz({ subModule }) {
  const [queNum, setQueNum] = useState(0);
  const [selected, setSelected] = useState({});
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(false);
  const [showSolution, setShowSolution] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [correctAnswer, setCorrectAnswer] = useState(0)
  const [wrongAnswer, setWrongAnswer] = useState(0)
  const [notAnswered, setNotAnswered] = useState(0)
  const router = useRouter();

  //for solutions
  const [solutionNum, setSolutionNum] = useState(0)

  useEffect(() => {
    if (subModule?.quiz?.questions) {
      setQuestions(subModule?.quiz?.questions)
    }
  }, [subModule])

  const prevQue = () => {
    if (queNum === 0) {
      return;
    }

    setQueNum((prev) => prev - 1);
  };

  const nextQue = () => {
    if (queNum === questions.length - 1) {
      submit();
      return;
    }

    setQueNum((prev) => prev + 1);
  };

  const prevSolution = () => {
    if (solutionNum === 0) {
      return;
    }

    setSolutionNum((prev) => prev - 1);
  };

  const nextSolution = () => {
    if (solutionNum === questions.length - 1) {
      showFinalScreen();
      return;
    }

    setSolutionNum((prev) => prev + 1);
  };

  const showFinalScreen = () => {
    setShowResults(true)
    setShowSolution(false)
  }

  const submit = async () => {

    try {
      // set Api to save answers
      toast.success("Quiz responses saved successfully!")
      setShowSolution(true)
    } catch (error) {
      console.log(error)
      toast.error("Error while saving your choices!")
    }


    // await toast.promise(
    //   new Promise((res) =>
    //     setTimeout(() => {
    //       res();
    //     }, [3000])
    //   ),
    //   {
    //     loading: "Generating Courses for you",
    //     success: <b>Done, All the best!</b>,
    //     error: <b>Some error occured</b>,
    //   }
    // );
    // router.push("/explore");
    // if (isPopup) onClose();
  };

  useEffect(() => {
    if(showResults){
      if(Object.keys(selected).length>0){
          for(let select in selected){
            if(selected[select]?.isCorrect){
              setCorrectAnswer((prev) => prev + 1)
            }else{
              setWrongAnswer((prev) => prev + 1)
            }
          }
      }
      setNotAnswered(questions?.length - Object.keys(selected)?.length)
    }
  }, [showResults])

  const progress = Math.floor(((queNum + 1) / questions.length) * 100);
  const solutionProgress = Math.floor(((solutionNum + 1) / questions.length) * 100);
  const question = questions[queNum];
  const solution = questions[solutionNum]
  return (
    <>
      {
        loading ? (<p>Loading...</p>) :
          (
            !showSolution
              ?
              <>
                {!showResults ? <> <Progress
                  borderRadius={4}
                  size="sm"
                  value={progress}
                  background="#151515"
                  colorScheme="purple"
                  style={{ marginTop: "2rem" }}
                />
                  <div className={styles.step}>
                    <p id={styles.que}>{question?.question}</p>
                    <div className={styles.options}>
                      {question?.options.map((opt, idx) => (
                        <span
                          className={selected[queNum]?.['selectedAnswer'] === opt ? styles.selected : ""}
                          onClick={() => {
                            setSelected((prev) => ({ ...prev, [queNum]: { selectedAnswer: opt, isCorrect: question['solution'] == (idx+1) ? true : false} }));
                          }}
                          key={idx}
                        >
                          <p>{opt}</p>
                        </span>
                      ))}
                    </div>
                    <div className={styles.cta}>
                      <Button variant="outline" onClick={prevQue}>
                        Back
                      </Button>
                      <Button onClick={nextQue}>{(queNum + 1) == questions?.length ? "Save" : "Next"}</Button>
                    </div>
                  </div>
                </>
                  :
                  <>
                  <h2 style={{ fontSize: "1.4rem", marginBottom: "2rem" }} >Results</h2>
                  <div style={{ display: 'flex', gap: "4rem" }} >
                  <div style={{ display: 'flex', flexDirection: 'column' }} >
                    <span style={{ marginBottom: "1rem", textAlign: 'center' }} >Correct Answers</span>
                    <div>
                    <CircularProgress size={"8rem"} value={(correctAnswer/questions?.length)*100} color='green.400'>
                      <CircularProgressLabel fontSize={"1.4rem"}>{correctAnswer + '/' + questions?.length}</CircularProgressLabel>
                    </CircularProgress>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }} >
                    <span style={{ marginBottom: "1rem", textAlign: 'center' }} >Wrong Answers</span>
                    <div>
                    <CircularProgress size={"8rem"} value={(wrongAnswer/questions?.length)*100} color='red.400'>
                      <CircularProgressLabel fontSize={"1.4rem"}>{wrongAnswer + '/' + questions?.length}</CircularProgressLabel>
                    </CircularProgress>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }} >
                    <span style={{ marginBottom: "1rem", textAlign: 'center' }} >Not Answered</span>
                    <div>
                    <CircularProgress size={"8rem"} value={(notAnswered/questions?.length)*100} color='orange.400'>
                      <CircularProgressLabel fontSize={"1.4rem"}>{notAnswered + '/' + questions?.length}</CircularProgressLabel>
                    </CircularProgress>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }} >
                    <span style={{ marginBottom: "1rem", textAlign: 'center' }} >Overall Percentage</span>
                    <div>
                    <CircularProgress size={"8rem"} value={(correctAnswer/questions.length)*100} color='blue.400'>
                      <CircularProgressLabel fontSize={"1.1rem"} >{((correctAnswer/questions.length)*100).toFixed(2) + '%'}</CircularProgressLabel>
                    </CircularProgress>
                    </div>
                  </div>
                  </div>
                  </>
                }
              </>
              :
              <>
                {showSolution &&
                  <>
                    <h2>Solutions</h2>
                    <Progress
                      borderRadius={4}
                      size="sm"
                      value={solutionProgress}
                      background="#151515"
                      colorScheme="purple"
                      style={{ marginTop: "2rem" }}
                    />
                    <div className={styles.step}>
                      <p id={styles.que}>{solution?.question}</p>
                      <div className={styles.solutionOptions}>
                        {solution?.options.map((opt, idx) => (
                          <span
                            className={(solution['solution'] == (idx + 1) && selected[solutionNum]?.['selectedAnswer'] === opt) ? styles.selectedSolution : selected[solutionNum]?.['selectedAnswer'] === opt ? styles.selectedWrongAnswer : solution['solution'] == (idx + 1) ? styles.correctAnswer : ""}
                            key={idx}
                          >
                            <p>{opt}</p>
                          </span>
                        ))}
                      </div>
                      <div className={styles.cta}>
                        <Button variant="outline" onClick={prevSolution}>
                          Back
                        </Button>
                        <Button onClick={nextSolution}>{(solutionNum + 1) == questions?.length ? "Show results" : "Next"}</Button>
                      </div>
                    </div>
                  </>
                }
              </>
          )
      }
    </>
  );
}