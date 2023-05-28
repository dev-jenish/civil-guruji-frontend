import React, { useEffect, useState } from "react";
import { Box, Button, Progress } from "@chakra-ui/react";
import styles from "@/styles/QuizComponent.module.css";
import { BsArrowsFullscreen } from "react-icons/bs";
import { PieChart } from "react-minimal-pie-chart";
import { FaTimes, FaCheck, FaRegCircle, FaMinusCircle } from "react-icons/fa";
import { MdDoNotDisturbAlt } from "react-icons/md";


const QuizComponent = ({ subModule }) => {
  const [activeScreen, setActiveScreen] = useState("MainScreen");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(subModule.quiz);
  useEffect(() => {
    if (subModule?.quiz?.questions) {
      setQuestions(subModule?.quiz?.questions);
    }
  }, [subModule]);

  const handleClick = (e, screen) => {
    e.preventDefault();
    setActiveScreen(screen);
  };

  // screen module code 
  const MainScreen = () => {
    return (
      <Box className={styles.mainScreen}>
        <h3 className={styles.headingText}>Practice Quiz</h3>
        <span className={styles.dividerLine}></span>
        <Box mb={4}>
          <p className={styles.labelText}>
            Total Questions: <span className={styles.valueText}>{questions?.length}</span>
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
          <Button colorScheme="white" variant="outline" isDisabled>
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
        <Box className={styles.instructionContent} style={{fontSize: '14px', color: '#000000'}}>
          {subModule?.quiz?.instructions.replace('<p>','').replace('</p>', '')}
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
            {questions?.map((question, index) => {
              return (
                <React.Fragment key={index}>
                  <div className={styles.quesHeadPart}>
                    <div className={styles.quesNo}>Question : {index + 1}</div>
                    <div className={styles.points}>
                      <span>Single Correct Option,</span>
                      <span className={styles.plusPoint}>+2.00,</span>
                      <span className={styles.minusPoint}>-1.00</span>
                    </div>
                  </div>
                  <div className={styles.questionBlock}>
                    <h5>{question.title}</h5>
                    {question.options.map((option, optionIndex) => (
                      <div className={styles.queOption} key={optionIndex}>
                        <span
                          className={styles.optionIndex}
                          style={{ backgroundColor: "#ADADAD" }}
                        >
                          {String.fromCharCode(65 + optionIndex)}
                        </span>
                        <span className={styles.optionText}>Option: {option}</span>
                      </div>
                    ))}
                  </div>
                </React.Fragment>
              );
            })}
            {/* <div className={styles.quesHeadPart}>
              <div className={styles.quesNo}>`Question : ${index} + 1 `</div>
              <div className={styles.points}>
                <span>Single Correct Option,</span>
                <span className={styles.plusPoint}>+2.00,</span>
                <span className={styles.minusPoint}> -1.00</span>
              </div>
            </div>
            <div className={styles.questionBlock}>
              <h5>Where does it come from?</h5>
              <div className={styles.queOption}>
                <span
                  className={styles.optionIndex}
                  style={{ backgroundColor: "#ADADAD" }}
                >
                  A
                </span>
                <span
                  className={styles.optionText}
                  style={{ backgroundColor: "#ADADAD" }}
                >
                  Option: 1
                </span>
              </div>
              <div className={styles.queOption}>
                <span className={styles.optionIndex}>B</span>
                <span className={styles.optionText}>Option: 2</span>
              </div>
              <div className={styles.queOption}>
                <span className={styles.optionIndex}>C</span>
                <span className={styles.optionText}>Option: 3</span>
              </div>
              <div className={styles.queOption}>
                <span className={styles.optionIndex}>D</span>
                <span className={styles.optionText}>Option: 4</span>
              </div>
            </div> */}
            <div className={styles.actionPart}>
              <div className={styles.quickActions}>
                <button className={styles.saveBtn}>Save & Next</button>
                <button className={styles.clearBtn}>Clear Response</button>
              </div>
              <div className={styles.submitTest}>
                <button
                  className={styles.submitBtn}
                  onClick={(e) => handleClick(e, "QuizSubmitScreen")}
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
                  <p style={{fontSize: '8px'}}>Answered</p>
                </div>
                <div className={styles.block}>
                  <span className={styles.notAnswered}></span>
                  <p style={{fontSize: '8px'}}>Not Answered</p>
                </div>
                <div className={styles.blocks}>
                  <div className={styles.block}>
                    <span className={styles.notVisited}></span>
                    <p >Not Visited</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.indicatorPart}>
              <span className={styles.answered}>00</span>
              <span className={styles.notAnswered}>00</span>
              <span className={styles.notAnswered}>00</span>
              <span className={styles.notVisited}>00</span>
              <span className={styles.notVisited}>00</span>
              <span className={styles.notVisited}>00</span>
              <span className={styles.notVisited}>00</span>
              <span className={styles.notVisited}>00</span>
              <span className={styles.notVisited}>00</span>
              <span className={styles.notVisited}>00</span>
              <span className={styles.notVisited}>00</span>
              <span className={styles.notVisited}>00</span>
              <span className={styles.notVisited}>00</span>
              <span className={styles.notVisited}>00</span>
              <span className={styles.notVisited}>00</span>
              <span className={styles.notVisited}>00</span>
              <span className={styles.notVisited}>00</span>
              <span className={styles.notVisited}>00</span>
              <span className={styles.notVisited}>00</span>
              <span className={styles.notVisited}>00</span>
              <span className={styles.notVisited}>00</span>
              <span className={styles.notVisited}>00</span>
            </div>
          </div>
        </Box>
      </Box>
    );
  };
  const QuizSubmitScreen = () => {
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
              <div className={styles.quesNo}>Question : 1</div>
              <div className={styles.points}>
                <span>Single Correct Option,</span>
                <span className={styles.plusPoint}>+2.00,</span>
                <span className={styles.minusPoint}> -1.00</span>
              </div>
            </div>
            <div className={styles.questionBlock}>
              <h5>Where does it come from?</h5>
              <div className={styles.queOption}>
                <span
                  className={styles.optionIndex}
                  style={{ backgroundColor: "#ADADAD" }}
                >
                  A
                </span>
                <span
                  className={styles.optionText}
                  style={{ backgroundColor: "#ADADAD" }}
                >
                  Option: 1
                </span>
              </div>
              <div className={styles.queOption}>
                <span className={styles.optionIndex}>B</span>
                <span className={styles.optionText}>Option: 2</span>
              </div>
              <div className={styles.queOption}>
                <span className={styles.optionIndex}>C</span>
                <span className={styles.optionText}>Option: 3</span>
              </div>
              <div className={styles.queOption}>
                <span className={styles.optionIndex}>D</span>
                <span className={styles.optionText}>Option: 4</span>
              </div>
            </div>
            <div className={styles.actionPart}>
              <div className={styles.quickActions}>
                <button className={styles.saveBtn}>Save & Next</button>
                <button className={styles.clearBtn}>Clear Response</button>
              </div>
              <div className={styles.submitTest}>
                <button className={styles.submitBtn}>Submit Test</button>
              </div>
            </div>
          </div>
          <div className={styles.rightPart}>
            <div className={styles.readPart}>
              <p>Read Carefully:</p>
              <div className={styles.blocks}>
                <div className={styles.block}>
                  <span className={styles.answered}></span>
                  <p>Answered</p>
                </div>
                <div className={styles.block}>
                  <span className={styles.notAnswered}></span>
                  <p>Not Answered</p>
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
              <span className={styles.answered}>00</span>
              <span className={styles.notAnswered}>00</span>
              <span className={styles.notAnswered}>00</span>
              <span className={styles.notVisited}>00</span>
              <span className={styles.notVisited}>00</span>
              <span className={styles.notVisited}>00</span>
              <span className={styles.notVisited}>00</span>
              <span className={styles.notVisited}>00</span>
              <span className={styles.notVisited}>00</span>
              <span className={styles.notVisited}>00</span>
              <span className={styles.notVisited}>00</span>
              <span className={styles.notVisited}>00</span>
              <span className={styles.notVisited}>00</span>
              <span className={styles.notVisited}>00</span>
              <span className={styles.notVisited}>00</span>
              <span className={styles.notVisited}>00</span>
              <span className={styles.notVisited}>00</span>
              <span className={styles.notVisited}>00</span>
              <span className={styles.notVisited}>00</span>
              <span className={styles.notVisited}>00</span>
              <span className={styles.notVisited}>00</span>
              <span className={styles.notVisited}>00</span>
            </div>
          </div>
        </Box>
        <div className={styles.overlayModel}>
          <div className={styles.resultPart}>
            <div className={styles.headingResult}>Final Submit</div>
            <div className={styles.content}>
              <div className={styles.values}>
                <span>Total Time:</span>
                <span>08 Sec</span>
              </div>
              <div className={styles.values}>
                <span>Total Questions:</span>
                <span>10</span>
              </div>
              <div className={styles.values}>
                <span>Attempted Questions:</span>
                <span>02</span>
              </div>
              <div className={styles.values}>
                <span>Skipped Questions:</span>
                <span>08</span>
              </div>
              <button className={styles.continueBtn}>Continue</button>
              <button
                className={styles.responseBtn}
                onClick={(e) => handleClick(e, "ResultScreen")}
              >
                See Responses
              </button>
            </div>
          </div>
        </div>
      </Box>
    );
  };
  
  const ResultScreen = () => {
    return (
      <Box className={styles.resultScreenMain}>
        <Box className={styles.progressBar}>
          <p className={styles.textLabel}>Result:</p>
          <span className={styles.progressValue}>30%</span>
          <Progress value={30} size="lg" />
        </Box>
        <Box className={styles.chartPart}>
          <div className={styles.chart}>
            <PieChart
              data={[
                { title: "One", value: 10, color: "#2BB970" },
                { title: "Two", value: 15, color: "#FF0000" },
                { title: "Three", value: 20, color: "#292A2E" },
              ]}
            />
          </div>
          <div className={styles.indication}>
            <div className={styles.indicatorBlock}>
              <span className={styles.correct}></span>
              <span className={styles.answerMethod}>Correct Answers:</span>
              <span className={styles.answersNo}>04/10</span>
            </div>
            <div className={styles.indicatorBlock}>
              <span className={styles.wrongAnswered}></span>
              <span className={styles.answerMethod}>Wrong Answers:</span>
              <span className={styles.answersNo}>02/10</span>
            </div>
            <div className={styles.indicatorBlock}>
              <span className={styles.notAnswered}></span>
              <span className={styles.answerMethod}>Not Answered:</span>
              <span className={styles.answersNo}>04/10</span>
            </div>
          </div>
        </Box>
        <Box className={styles.quesPart}>
          <div className={styles.quesionContainer}>
            <div className={styles.questionBlock}>
              <h5>1. Where does it come from?</h5>
              <div className={styles.queOption}>
                <span
                  className={styles.optionIndex}
                  style={{ backgroundColor: "#2BB970" }}
                >
                  A
                </span>
                <span
                  className={styles.optionText}
                  style={{ backgroundColor: "#2BB970" }}
                >
                  Option: 1
                </span>
              </div>
              <div className={styles.queOption}>
                <span className={styles.optionIndex}>B</span>
                <span className={styles.optionText}>Option: 2</span>
              </div>
              <div className={styles.queOption}>
                <span
                  className={styles.optionIndex}
                  style={{ backgroundColor: "#FF0000" }}
                >
                  C
                </span>
                <span
                  className={styles.optionText}
                  style={{ backgroundColor: "#FF0000" }}
                >
                  Option: 3
                </span>
              </div>
              <div className={styles.queOption}>
                <span className={styles.optionIndex}>D</span>
                <span className={styles.optionText}>Option: 4</span>
              </div>
            </div>
            <div className={styles.answerPart}>
              <div className={styles.wrongAnswer}>
                <FaTimes />
                Your answer is wrong
              </div>
              <p className={styles.correctAns}>Correct Answer: A</p>
              <p className={styles.yourAns}>Your Answer: C</p>
              <p className={styles.gotMark}>Got Marks: -1.00</p>
            </div>
          </div>
          <div className={styles.quesionContainer}>
            <div className={styles.questionBlock}>
              <h5>2. Where does it come from?</h5>
              <div className={styles.queOption}>
                <span
                  className={styles.optionIndex}
                  style={{ backgroundColor: "#2BB970" }}
                >
                  A
                </span>
                <span
                  className={styles.optionText}
                  style={{ backgroundColor: "#2BB970" }}
                >
                  Option: 1
                </span>
              </div>
              <div className={styles.queOption}>
                <span className={styles.optionIndex}>B</span>
                <span className={styles.optionText}>Option: 2</span>
              </div>
              <div className={styles.queOption}>
                <span className={styles.optionIndex}>C</span>
                <span className={styles.optionText}>Option: 3</span>
              </div>
              <div className={styles.queOption}>
                <span className={styles.optionIndex}>D</span>
                <span className={styles.optionText}>Option: 4</span>
              </div>
            </div>
            <div className={styles.answerPart}>
              <div className={styles.rightAnswer}>
                <FaCheck />
                Your answer is correct
              </div>
              <p className={styles.correctAns}>Correct Answer: A</p>
              <p className={styles.yourAns}>Your Answer: A</p>
              <p className={styles.gotMark}>Got Marks: +2.00</p>
            </div>
          </div>
          <div className={styles.quesionContainer}>
            <div className={styles.questionBlock}>
              <h5>3. Where does it come from?</h5>
              <div className={styles.queOption}>
                <span
                  className={styles.optionIndex}
                  style={{ backgroundColor: "#2BB970" }}
                >
                  A
                </span>
                <span
                  className={styles.optionText}
                  style={{ backgroundColor: "#2BB970" }}
                >
                  Option: 1
                </span>
              </div>
              <div className={styles.queOption}>
                <span className={styles.optionIndex}>B</span>
                <span className={styles.optionText}>Option: 2</span>
              </div>
              <div className={styles.queOption}>
                <span className={styles.optionIndex}>C</span>
                <span className={styles.optionText}>Option: 3</span>
              </div>
              <div className={styles.queOption}>
                <span className={styles.optionIndex}>D</span>
                <span className={styles.optionText}>Option: 4</span>
              </div>
            </div>
            <div className={styles.answerPart}>
              <div className={styles.skippedAnswer}>
                <MdDoNotDisturbAlt />
                You Have Skipped.
              </div>
              <p className={styles.correctAns}>Correct Answer: A</p>
              <p className={styles.yourAns}>Your Answer: -</p>
              <p className={styles.gotMark}>Got Marks: 0.00</p>
            </div>
          </div>
        </Box>
      </Box>
    );
  };

  return (
    <Box display="flex" flexDirection="column">
      {activeScreen === "MainScreen" && <MainScreen />}
      {activeScreen === "QuizInstructionScreen" && <QuizInstructionScreen />}
      {activeScreen === "QuizQuestionsScreen" && <QuizQuestionsScreen />}
      {activeScreen === "QuizSubmitScreen" && <QuizSubmitScreen />}
      {activeScreen === "ResultScreen" && <ResultScreen />}
    </Box>
  );
};

export default QuizComponent;
