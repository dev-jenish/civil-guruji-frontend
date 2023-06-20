import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Progress,
} from "@chakra-ui/react";
import styles from "@/styles/QuizComponent.module.css";
import { BsArrowsFullscreen } from "react-icons/bs";
import { PieChart } from "react-minimal-pie-chart";
import { FaTimes, FaCheck, FaRegCircle, FaMinusCircle } from "react-icons/fa";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { api } from "utils/urls";

const QuizComponent = ({ subModule, courseId, courseProgressionData, getCourseProgressionData }) => {
  const [activeScreen, setActiveScreen] = useState("MainScreen");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const question = questions[currentIndex];
  const [showModel, setShowModel] = useState(false);

  console.log(question);

  useEffect(() => {
    if (subModule?.quiz?.questions) {
      setQuestions(subModule?.quiz?.questions);
    }
  }, [subModule]);

  useEffect(() => {
    if (question?.isAttempted && (question?.answer >= 0)) {
      setSelectedOption(question?.answer - 1)
    } else {
      setSelectedOption(null)
    }
  }, [question])

  const handleClick = async (e, screen) => {
    e.preventDefault();
    setActiveScreen(screen);
    if (screen === "ResultScreen") {
      await handleSubmit(e);
    }
  };

  const handleSaveAndNext = () => {
    const temp = [...questions];
    const oldData = temp[currentIndex];
    temp[currentIndex] = {
      ...oldData,
      answer: selectedOption !== null ? selectedOption + 1 : null,
      isAttempted: selectedOption !== null,
    };
    setQuestions(temp);
    console.log(currentIndex, questions?.length - 1)
    const isLastQuestion = currentIndex === questions.length - 1;
    if (isLastQuestion) {
      setShowModel(true);
    }
    setCurrentIndex((prevIndex) => {
      if (temp.length !== prevIndex + 1) {
        return prevIndex + 1;
      } else {
        return prevIndex;
      }
    });
    setSelectedOption(null);
  };

  const handleClearResponse = () => {
    setSelectedOption(null);
  };
  let attemptedQuestions = questions.filter((q) => q.isAttempted).length;
  let skippedQuestions = questions.filter((q) => !q.isAttempted).length;
  useEffect(() => {
    attemptedQuestions = questions.filter((q) => q.isAttempted).length;
    skippedQuestions = questions.filter((q) => !q.isAttempted).length;
  }, [selectedOption]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // need to add api call and data was in questions state
    try {
      console.log(questions)

      let response = await api('/course/save-quiz-attempt', 'post', {
        subModuleId: subModule?._id,
        courseId,
        questions,
        courseProgressionId: courseProgressionData?._id
      })

      console.log(response?.data)
      getCourseProgressionData()

    } catch (error) {
      console.log(error)
    }
  };

  const handleSetSolution = () => {
    if(courseProgressionData?.quizAttemps?.length>0){
      console.log("here..")
      const questionsData = courseProgressionData?.quizAttemps[0].questions?.map((question) => {
        return {
          answer: question?.answer,
          isAttempted: question?.isAttempted,
          ...question?.question
        }

      })

      console.log(questionsData)

      setQuestions(questionsData)
      setActiveScreen('ResultScreen');

    }
  }

  // screen module code
  const MainScreen = () => {
    return (
      <Box className={styles.mainScreen}>
        <h3 className={styles.headingText}>Practice Quiz</h3>
        <span className={styles.dividerLine}></span>
        <Box mb={4}>
          <p className={styles.labelText}>
            Total Questions:{" "}
            <span className={styles.valueText}>{questions?.length}</span>
          </p>
          <p className={styles.labelText}>
            Total Time: <span className={styles.valueText}>2 minutes</span>
          </p>
        </Box>
        <Box
          mt={5}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          className={styles.buttonDiv}
        >
          <Button
            colorScheme="blue"
            mr={2}
            onClick={(e) => handleClick(e, "QuizInstructionScreen")}
          >
            Start Quiz
          </Button>
          {console.log(courseProgressionData?.quizAttemps?.length)}
          <Button onClick={handleSetSolution} colorScheme="blue" variant="outline" isDisabled={!(courseProgressionData?.quizAttemps?.length>0)} >
            View Solutions
          </Button>
        </Box>
      </Box>
    );
  };
  const QuizInstructionScreen = () => {
    return (
      <Box className={styles.instructionScreen}>
        <h3 className={styles.instructionHeading}>Instructions</h3>
        <Box
          className={styles.instructionContent}
          style={{ fontSize: "14px", color: "#000000" }}
        >
          {subModule?.quiz?.instructions.replace("<p>", "").replace("</p>", "")}
        </Box>
        <button
          className={styles.startBtn}
          onClick={(e) => handleClick(e, "QuizQuestionsScreen")}
        >
          Start
        </button>
      </Box>
    );
  };

  const QuizQuestionsScreen = () => {
    return (
      <Box className={styles.quizMain}>
        <Box className={styles.topPart}>
          <button className={styles.fullScreenBtn}>
            <BsArrowsFullscreen />
            <span className={styles.btnText}>Full Screen</span>
          </button>
          <div className={styles.reaminTime}>
            <p className={styles.timeLabel}>Remaing Time:</p>
            <span className={styles.timeBlock}>00</span>
            <span className={styles.colonBlock}>:</span>
            <span className={styles.timeBlock}>00</span>
            <span className={styles.colonBlock}>:</span>
            <span className={styles.timeBlock}>00</span>
          </div>
        </Box>
        <Box className={styles.quizPart}>
          <div className={styles.leftPart}>
            <div className={styles.quesHeadPart}>
              <div className={styles.quesNo}>
                Question : {currentIndex + 1}{" "}
              </div>
              <div className={styles.points}>
                <span>Single Correct Option,</span>
                <span className={styles.plusPoint}>+2.00,</span>
                <span className={styles.minusPoint}> -1.00</span>
              </div>
            </div>
            <div className={styles.questionBlock}>
              {console.log(question)}
              {console.log(selectedOption)}
              <h5>{question.question}</h5>
              {question.options.map((option, index) => (
                <div
                  className={styles.queOption}
                  key={index}
                  onClick={() => {
                    setSelectedOption(index);
                    console.log(
                      index,
                      option,
                      selectedOption,
                      "<== after attempting ques"
                    );
                  }}
                >
                  <span
                    className={styles.optionIndex}
                    style={{
                      backgroundColor:
                        index === selectedOption ? "#ADADAD" : "#000000",
                    }}
                  >
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span
                    className={styles.optionText}
                    style={{
                      backgroundColor:
                        index === selectedOption ? "#ADADAD" : "transparent",
                    }}
                  >
                    {option}
                  </span>
                </div>
              ))}
            </div>
            <div className={styles.actionPart}>
              <div className={styles.quickActions}>
                <button
                  className={styles.saveBtn}
                  onClick={handleSaveAndNext}
                >
                  Save & Next
                </button>
                <button
                  className={styles.clearBtn}
                  onClick={handleClearResponse}
                >
                  Clear Response
                </button>
              </div>
              <div className={styles.submitTest}>
                <button
                  className={styles.submitBtn}
                  onClick={(e) => setShowModel(true)}
                >
                  Submit Test
                </button>
              </div>
            </div>
          </div>
          <div className={styles.rightPart}>
            <div className={styles.readPart}>
              <p>Read Carefully:</p>
              <div className={styles.blocks}>
                <div className={styles.block}>
                  <span className={styles.answered}></span>
                  <p style={{ fontSize: "8px" }}>Answered</p>
                </div>
                <div className={styles.block}>
                  <span className={styles.notAnswered}></span>
                  <p style={{ fontSize: "8px" }}>Not Answered</p>
                </div>
                <div className={styles.blocks}>
                  <div className={styles.block}>
                    <span className={styles.notVisited}></span>
                    <p>Not Visited</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.indicatorPart}>
              {questions.map((q, index) => {
                const isAnswered = questions[index]?.isAttempted;
                const isFirstNotAnswered = index === 0 && !isAnswered;
                const isNotAnswered =
                  !isAnswered && index !== currentIndex && !isFirstNotAnswered;
                const isNotVisited = !isAnswered && !isNotAnswered;

                let className = "";
                if (isAnswered) {
                  className = styles.answered;
                } else if (isNotAnswered) {
                  className = styles.notAnswered;
                } else if (isFirstNotAnswered) {
                  className = styles.notVisited;
                } else {
                  className = styles.notVisited
                }
                return (
                  <button
                    key={index}
                    className={className}
                    onClick={() => setCurrentIndex(index)}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </Box>
        <Modal isOpen={showModel} onClose={() => setShowModel(false)}>
          <ModalContent className={styles.resultPart}>
            <ModalHeader>Final Submit</ModalHeader>
            <ModalBody>
              <Box className={styles.values}>
                <span>Total Time:</span>
                <span>08 Sec</span>
              </Box>
              <Box className={styles.values}>
                <span>Total Questions:</span>
                <span>{questions.length}</span>
              </Box>
              <Box className={styles.values}>
                <span>Attempted Questions:</span>
                <span>{attemptedQuestions}</span>
              </Box>
              <Box className={styles.values}>
                <span>Skipped Questions:</span>
                <span>{skippedQuestions}</span>
              </Box>
            </ModalBody>
            <ModalFooter>
              <div className={styles.modelAction}>
                <button
                  className={styles.continueBtn}
                  onClick={() => setShowModel(false)}
                >
                  Continue
                </button>
                <button
                  className={styles.responseBtn}
                  onClick={(e) => handleClick(e, "ResultScreen")}
                >
                  See Responses
                </button>
              </div>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    );
  };

  const ResultScreen = () => {
    return (
      <Box className={styles.resultScreenMain}>
        <Box className={styles.progressBar}>
          <p className={styles.textLabel}>Result:</p>
          <span className={styles.progressValue}> {(questions?.filter(questionData => ( questionData?.isAttempted && (questionData?.answer == questionData?.solution)))?.length / questions?.length) * 100} %</span>
          <Progress value={30} size="lg" />
        </Box>
        <Box className={styles.chartPart}>
          <div className={styles.chart}>
            <PieChart
              data={[
                { title: "One", value: questions?.filter(questionData => ( questionData?.isAttempted && (questionData?.answer == questionData?.solution)))?.length, color: "#2BB970" },
                { title: "Two", value: questions?.filter(questionData => ( questionData?.isAttempted && (questionData?.answer != questionData?.solution)))?.length, color: "#FF0000" },
                { title: "Three", value: questions?.filter(questionData => ( !questionData?.isAttempted ))?.length, color: "#292A2E" },
              ]}
            />
          </div>
          <div className={styles.indication}>
            <div className={styles.indicatorBlock}>
              <span className={styles.correct}></span>
              <span className={styles.answerMethod}>Correct Answers:</span>
              {console.log(questions?.filter(questionData => ( questionData?.isAttempted && (questionData?.answer == questionData?.solution))))}
              <span className={styles.answersNo}>{questions?.filter(questionData => ( questionData?.isAttempted && (questionData?.answer == questionData?.solution)))?.length}/{questions?.length}</span>
            </div>
            <div className={styles.indicatorBlock}>
              <span className={styles.wrongAnswered}></span>
              <span className={styles.answerMethod}>Wrong Answers:</span>
              <span className={styles.answersNo}>{questions?.filter(questionData => ( questionData?.isAttempted && (questionData?.answer != questionData?.solution)))?.length}/{questions?.length}</span>
            </div>
            <div className={styles.indicatorBlock}>
              <span className={styles.notAnswered}></span>
              <span className={styles.answerMethod}>Not Answered:</span>
              <span className={styles.answersNo}>{questions?.filter(questionData => ( !questionData?.isAttempted ))?.length}/{questions?.length}</span>
            </div>
          </div>
        </Box>
        <Box className={styles.quesPart}>
          {
            questions && questions?.length > 0 && questions.map((questionData, index) => {
              console.log(questionData)
              return <div key={index} className={styles.quesionContainer}>
                <div className={styles.questionBlock}>
                  <h5>{`${index + 1}. ${questionData?.question}`}</h5>
                  {
                    questionData?.options && questionData?.options?.length > 0 && questionData?.options.map((optionData, index) => {
                      return <div key={index} className={styles.queOption}>
                        <span
                          className={styles.optionIndex}
                          style={{ backgroundColor: `${(questionData?.isAttempted && (questionData?.answer == (index + 1))) ? (questionData?.answer == questionData?.solution) ? "#2BB970" : "#FF0000" : "#000"}` }}
                        >
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span
                          className={styles.optionText}
                          style={{ backgroundColor: `${(questionData?.isAttempted && (questionData?.answer == (index + 1))) ? (questionData?.answer == questionData?.solution) ? "#2BB970" : "#FF0000" : "#fff"}` }}
                        >
                          {optionData}
                        </span>
                      </div>
                    })
                  }
                </div>
                <div className={styles.answerPart}>
                  {
                    questionData?.isAttempted ? questionData?.answer == questionData?.solution ?
                      <div className={styles.rightAnswer}>
                        <FaCheck />
                        Your answer is correct
                      </div>
                      :
                      <div className={styles.wrongAnswer}>
                        <FaTimes />
                        Your answer is wrong
                      </div>
                      :
                      <div className={styles.skippedAnswer}>
                        <MdDoNotDisturbAlt />
                        You Have Skipped.
                      </div>
                  }
                  <p className={styles.correctAns}>Correct Answer: {String.fromCharCode(65 + questionData?.solution - 1)}</p>
                  {
                    questionData?.isAttempted ?
                      <p className={styles.yourAns}>Your Answer: {String.fromCharCode(65 + questionData?.answer - 1)}</p>
                      :
                      <p className={styles.yourAns}>Your Answer: -</p>
                  }
                  <p className={styles.gotMark}>Got Marks: { questionData?.isAttempted ? (questionData?.answer == questionData?.solution) ? '+2.00' : '-1.00' : '0.00'}</p>
                </div>
              </div>
            })
          }
        </Box>
      </Box>
    );
  };

  return (
    <Box display="flex" flexDirection="column">
      {activeScreen === "MainScreen" && <MainScreen />}
      {activeScreen === "QuizInstructionScreen" && <QuizInstructionScreen />}
      {activeScreen === "QuizQuestionsScreen" && <QuizQuestionsScreen />}
      {activeScreen === "ResultScreen" && <ResultScreen questions={questions} />}
    </Box>
  );
};

export default QuizComponent;
