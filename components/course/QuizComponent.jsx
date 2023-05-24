import React, { useState } from "react";
import { Box, Button, Progress } from "@chakra-ui/react";
import styles from "@/styles/QuizComponent.module.css";
import { BsArrowsFullscreen } from "react-icons/bs";
import { PieChart } from "react-minimal-pie-chart";
import { FaTimes, FaCheck, FaRegCircle, FaMinusCircle } from "react-icons/fa";
import { MdDoNotDisturbAlt } from "react-icons/md";

const QuizComponent = () => {
  const [activeScreen, setActiveScreen] = useState("MainScreen");

  const QuizInstructionScreen = () => {
    return (
      <Box className={styles.instructionScreen}>
        <h3 className={styles.instructionHeading}>Instructions</h3>
        <Box className={styles.instructionContent}>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <p>Nullam quis ligula sit amet felis faucibus tincidunt.</p>
          <p>Donec et justo sodales, sollicitudin justo eu, consequat arcu.</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste eius,
            sit commodi nesciunt architecto odio totam adipisci aliquam
            perspiciatis vitae nisi voluptatibus, corrupti itaque impedit a
            eveniet? Sed, natus repudiandae culpa doloribus ullam, dolorem
            impedit sint autem repellendus esse tenetur explicabo modi neque
            sunt in error debitis ducimus provident. Voluptate quas voluptas ut
            enim quidem corporis, sequi repellat laboriosam deserunt beatae
            repellendus iusto ipsam architecto sunt eveniet illo consequuntur.
            Aut maiores itaque, non cumque alias fugiat velit! Dolorem, alias!
            Sit, ut. Dignissimos non explicabo repudiandae optio aliquam. Fuga
            voluptate officiis quam vel. Sequi iste porro voluptatem placeat
            quia tempora culpa voluptates hic nemo consectetur odio distinctio
            modi soluta autem qui cumque, labore nobis perspiciatis fugiat alias
            repudiandae! Culpa repudiandae asperiores enim consectetur commodi!
            Soluta dolore commodi aut totam reiciendis a, vero maxime laborum
            itaque enim repellat dolores dolorum temporibus culpa id amet
            molestiae saepe perferendis corporis nesciunt possimus aliquid?
            Blanditiis incidunt iure necessitatibus inventore minima atque
            voluptatum veniam consectetur earum ducimus nesciunt animi, quae
            perspiciatis, perferendis alias delectus? Eligendi sit excepturi non
            alias provident, perspiciatis quidem error et eum incidunt
            accusantium nulla veniam laboriosam culpa in consequuntur
            repellendus aspernatur ratione, maxime enim dolor ab delectus sequi?
            Officia, ex suscipit. Ex rerum explicabo eum, recusandae alias esse,
            cupiditate voluptates labore nesciunt necessitatibus hic beatae
            atque quidem, fugiat commodi quis? Nemo, repudiandae. Debitis
            ducimus vel perferendis asperiores, delectus rem reiciendis numquam
            sit maiores laborum cumque ratione ipsa quaerat dolorem dolores odio
            quam, saepe sed blanditiis, ex fugiat voluptas ipsum. Sequi vero
            animi, adipisci unde ab veritatis optio praesentium culpa fugit quis
            ea quisquam earum minus est quam magnam, laborum illo reprehenderit
            id vitae ratione illum, error aut. Numquam deleniti aut aliquid
            blanditiis eaque veniam cumque architecto, molestiae, vero,
            perspiciatis possimus doloremque. Hic pariatur, dolorem veniam,
            ullam voluptates ad magni debitis totam in impedit dolores expedita
            saepe iure, facere quis. Voluptatibus repellat deleniti amet esse
            soluta nemo perspiciatis quas, ex adipisci deserunt aspernatur et
            dolorum vitae expedita molestiae? Similique, eos illum architecto
            ratione esse laudantium dolorem blanditiis optio velit, cumque enim,
            asperiores explicabo reprehenderit omnis id neque aliquam earum
            autem. Accusantium quae adipisci vitae possimus qui! Nihil aut sequi
            asperiores praesentium. Deserunt nesciunt repellat assumenda ratione
            sequi voluptate, nemo, dolore dignissimos quod porro facere! Qui
            ullam nam odit, id tempore nostrum quas quia voluptatibus fugiat
            eveniet magni quisquam iure consequuntur placeat aliquam laudantium
            et dicta, ut aut! Autem, quasi? Deserunt cupiditate laborum
            doloremque dolor deleniti similique explicabo commodi optio cum et
            sapiente possimus minus ea accusantium, aperiam, adipisci dolores
            fuga magni iste? Possimus tempora nisi ex rerum voluptatum iusto
            nemo ipsam veritatis quo sunt at aut reprehenderit itaque ipsa
            laboriosam quaerat architecto, sint ipsum fugiat. Eligendi rerum
            odio dignissimos corrupti. Quo veniam possimus harum, natus
            voluptate nobis adipisci ad dicta odio a voluptatem consequuntur
            itaque, voluptas explicabo perspiciatis voluptatum obcaecati beatae
            doloribus assumenda! Molestiae culpa temporibus commodi nemo, odit
            eos possimus placeat eius. Quis quod reprehenderit doloribus aliquam
            nam assumenda? Accusamus aperiam error unde amet molestias
            perferendis, ea et facilis ipsam qui eaque obcaecati dolorem
            exercitationem recusandae doloremque dignissimos, voluptates nihil
            provident eius iure aspernatur hic, beatae debitis! Aspernatur
            exercitationem officiis non quae rerum iusto. Voluptas nisi eius
            enim, cupiditate alias soluta deserunt odio incidunt repellat!
            Tempora doloribus cupiditate ullam numquam, velit a sed aliquam
            quidem fuga quod voluptatibus culpa voluptates blanditiis totam
            incidunt, eaque ex laudantium vel deleniti. Expedita dolor omnis
            dignissimos officia architecto accusantium laboriosam debitis, earum
            veniam quae qui accusamus, odit voluptatem, suscipit delectus. Minus
            facere dignissimos itaque obcaecati nostrum saepe quos blanditiis
            architecto, dolores velit dolore commodi labore hic molestiae
            suscipit eaque culpa debitis. Voluptate blanditiis cumque fuga
            tempore esse omnis consectetur, corrupti ipsum dolores mollitia
            magnam error eveniet nihil? Aliquid eos error praesentium dolor quis
            dolores quaerat maiores rerum, cupiditate qui omnis porro inventore
            nemo ea fuga possimus alias cumque quibusdam vel. Vel ratione
            quaerat animi molestias cupiditate dolore quae ullam repellat at
            distinctio sed ipsam numquam doloremque maiores ducimus optio, unde
            iste est praesentium iure dolorem beatae amet harum? Blanditiis
            reprehenderit, necessitatibus sunt qui dicta earum eligendi rem
            facilis temporibus magnam ad. Dolorum nulla asperiores et odit
            facilis quis quos ipsam veniam voluptates aliquam. Harum ad
            molestiae excepturi quod nostrum consequuntur reprehenderit unde
            ipsum, magnam accusantium! Praesentium voluptatem odit vel cumque
            eligendi rerum ullam quod facere. Itaque maiores voluptatum autem
            laborum officiis repellat fugit iusto totam neque esse. Itaque
            debitis repellendus laborum sit necessitatibus deleniti rerum velit
            dolores aperiam quia dignissimos obcaecati vitae, ratione
            consequatur consectetur, quos, architecto assumenda maiores ducimus
            qui? Aut nulla consectetur autem quas quibusdam quo earum, corrupti
            debitis pariatur facilis, modi excepturi, quia maiores enim minus
            id. Error at nisi impedit? Rerum quibusdam iusto repudiandae beatae
            voluptates enim molestiae voluptatibus ipsa, alias qui, ea,
            laudantium ut dolore provident mollitia eos! Id eaque quis hic
            excepturi reprehenderit quisquam delectus fugiat illum quas, quae
            dolorum non cumque exercitationem recusandae ipsa quibusdam
            voluptate pariatur explicabo, labore maxime! Autem, laboriosam
            adipisci nulla aspernatur officia hic ut, aut maxime eius delectus
            officiis accusamus aliquid dolorem! Nulla, esse ipsam! Laborum nisi
            repellat pariatur obcaecati numquam aspernatur? Ipsum fugiat quasi
            eum provident porro laborum necessitatibus dolorum quisquam tenetur
            totam. Explicabo fugit sed, excepturi doloremque dicta perferendis
            hic et, ipsa odio atque dignissimos. Sit exercitationem fuga nobis
            quibusdam veniam voluptas omnis officia fugiat dolor corporis
            perspiciatis aspernatur veritatis, provident saepe sapiente
            assumenda enim labore eum ex cupiditate qui sunt blanditiis esse
            dolorem. Corporis quia incidunt repellat omnis nulla eaque rem
            dolorum quo repudiandae earum beatae officia, debitis quaerat
            doloribus soluta doloremque eum itaque magni molestias sunt dolorem
            ratione adipisci. Hic delectus voluptates sit vitae, sed quidem
            perspiciatis deserunt voluptatem itaque. Iure ab animi
            necessitatibus nesciunt, minima harum cumque hic delectus mollitia
            accusamus impedit aut ea, facere praesentium reprehenderit labore
            architecto voluptatibus explicabo itaque, vitae dolorem fugiat quia
            et? Nobis pariatur animi veritatis, aut eius debitis corporis
            aperiam ullam officiis aspernatur quos ipsum sunt ipsam unde
            nesciunt cumque tempora inventore maiores impedit? Repellat ducimus
            illum, magni iste velit voluptates nesciunt provident iure. Rem
            totam vero itaque vitae consequuntur, laudantium similique velit.
            Obcaecati.
          </p>
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

  const handleClick = (e, screen) => {
    e.preventDefault();
    setActiveScreen(screen);
  };

  const MainScreen = () => {
    return (
      <Box className={styles.mainScreen}>
        <h3 className={styles.headingText}>Practice Quiz</h3>
        <span className={styles.dividerLine}></span>
        <Box mb={4}>
          <p className={styles.labelText}>
            Total Questions: <span className={styles.valueText}>10</span>
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
                <span className={styles.optionIndex} style={{ backgroundColor: "#FF0000" }}>C</span>
                <span className={styles.optionText} style={{ backgroundColor: "#FF0000" }}>Option: 3</span>
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
