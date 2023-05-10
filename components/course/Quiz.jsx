import { Button, Progress } from "@chakra-ui/react";
import styles from "@/styles/Login.module.css";
import { toast } from "react-hot-toast";


const { useRouter } = require("next/router");
const { useState, useEffect } = require("react");


export default function Quiz({ subModule }) {
    const [queNum, setQueNum] = useState(0);
    const [selected, setSelected] = useState({});
    const [questions, setQuestions] = useState([])
    const [loading, setLoading] = useState(false)
    const router = useRouter();
  
    useEffect(() => {
      console.log(selected)
    }, [selected])

    useEffect(() => {
        if(subModule?.quiz?.questions){
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
  
    const submit = async () => {
  
      try{
        // set Api to save answers
        toast.success("Quiz responses saved successfully!")
      }catch(error){
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
  
    const progress = Math.floor(((queNum + 1) / questions.length) * 100);
    const question = questions[queNum];
    return (
      <>
      {
        loading ? (<p>Loading...</p>) :
        (
          <>
          <Progress
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
                  className={selected[queNum] === opt ? styles.selected : ""}
                  onClick={() => {
                    setSelected((prev) => ({ ...prev, [queNum]: opt }));
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
              <Button onClick={nextQue}>{ (queNum + 1) == questions?.length ? "Save" : "Next"}</Button>
            </div>
          </div>
        </>
        )
      }
      </>
    );
  }