import "../styles/Home.css";
import { useState, useEffect, useRef } from "react";
import randomWords from "random-words";
import { createSession } from "../actions/session";

const NUMB_OF_WORDS = 200;
const SECONDS = 10;

const Home = () => {
  const [words, setWords] = useState([]);
  const [countDown, setCountDown] = useState(SECONDS);
  const [currInput, setCurrInput] = useState("");
  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [currCharIndex, setCurrCharIndex] = useState(-1);
  const [currChar, setCurrChar] = useState("");
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [status, setStatus] = useState("waiting");
  const [send, setSend] = useState(false);
  const textInput = useRef(null);

  useEffect(() => {
    setWords(generateWords());
  }, []);

  useEffect(() => {
    if (status === "started") {
      textInput.current.focus();
    }
  }, [status]);

  useEffect(() => {
    if (send === true) {
      console.log(correct, incorrect);
      createSessionRequest ();
      setSend(false);
    }
  }, [send]);

  function generateWords() {
    return new Array(NUMB_OF_WORDS).fill(null).map(() => randomWords());
  }

 function createSessionRequest () {
  const val=correct + incorrect;
    var session = {
      gross: val,
      net: correct,
      accuracy: Math.round((correct / (correct + incorrect )) * 100),
    };
    // const session = JSON.stringify(data);
    const token = JSON.parse(localStorage.getItem("auth")).token;
    console.log(session);
    (async () => {
      const res = await createSession( session, token );
    })();
    // let res=await createSession({ session, token });
  };

  function start() {
    if (status === "finished") {
      setWords(generateWords());
      setCurrWordIndex(0);
      setCorrect(0);
      setIncorrect(0);
      setCurrCharIndex(-1);
      setCurrChar("");
    }
    if (status !== "started") {
      setStatus("started");
      let interval = setInterval(() => {
        setCountDown((prevCountdown) => {
          if (prevCountdown === 0) {
            // createSessionRequest();
            clearInterval(interval);
            setStatus("finished");
            setSend(true);
            setCurrInput("");
            return SECONDS;
          } else {
            return prevCountdown - 1;
          }
        });
        // console.log(correct, incorrect);
      }, 1000);
      // console.log(correct, incorrect);
    }
  
  }

  function handleKeyDown({ keyCode, key }) {
    // space bar
    if (keyCode === 32) {
      checkMatch();
      setCurrInput("");
      setCurrWordIndex(currWordIndex + 1);
      setCurrCharIndex(-1);
      // backspace
    } else if (keyCode === 8) {
      setCurrCharIndex(currCharIndex - 1);
      setCurrChar("");
    } else {
      setCurrCharIndex(currCharIndex + 1);
      setCurrChar(key);
    }
  }

  function checkMatch() {
    const wordToCompare = words[currWordIndex];
    const doesItMatch = wordToCompare === currInput.trim();
    if (doesItMatch) {
      // setCorrect(correct + 1);
      setCorrect(previousCorrect => previousCorrect + 1);
    } else {
      // setIncorrect(incorrect + 1);
      setIncorrect(previousIncorrect => previousIncorrect + 1);
    }
    console.log({ doesItMatch });
    
    // console.log(correct, incorrect);
  }

  function getCharClass(wordIdx, charIdx, char) {
    if (
      wordIdx === currWordIndex &&
      charIdx === currCharIndex &&
      currChar &&
      status !== "finished"
    ) {
      if (char === currChar) {
        return "has-background-success";
      } else {
        return "has-background-danger";
      }
    } else if (
      wordIdx === currWordIndex &&
      currCharIndex >= words[currWordIndex].length
    ) {
      return "has-background-danger";
    } else {
      return "";
    }
  }

  return (
    <>
      <div className="App">
        {status === "waiting" && (
          <div className="home-header section has-text-centered">
            TEST YOUR TYPING SKILLS
          </div>
        )}
        <div className="timesection">
          <div className=" has-text-centered">
            <h2 className="is-size-1 time">Time : {countDown}</h2>

            {/* <button onclick={selectTime}>Change Time</button> */}
          </div>
        </div>
        <div className="control is-expanded section">
          <input
            placeholder="Type Here"
            ref={textInput}
            disabled={status !== "started"}
            type="text"
            className="input"
            onKeyDown={handleKeyDown}
            value={currInput}
            onChange={(e) => setCurrInput(e.target.value)}
          />
        </div>

        <div className="section  has-text-centered">
          <button className="button is-link is-light " onClick={start}>
            Start
          </button>
        </div>

        {status === "started" && (
          <div className="section">
            <div className="card">
              <div className="card-content">
                <div className="content">
                  {words.map((word, i) => (
                    <span key={i}>
                      <span>
                        {word.split("").map((char, idx) => (
                          <span
                            className={getCharClass(i, idx, char)}
                            key={idx}
                          >
                            {char}
                          </span>
                        ))}
                      </span>
                      <span> </span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {status === "finished" && (
          <div className="section">
            <div className="columns">
              <div className="column has-text-centered">
                <p className="resulthead">Gross words per minute:</p>
                <p className="has-text-primary is-size-1">
                  {correct + incorrect}
                </p>
              </div>
              <div className="column has-text-centered">
                <p className="resulthead">Net words per minute:</p>
                <p className="has-text-primary is-size-1">{correct}</p>
              </div>
              <div className="column has-text-centered">
                <p className="resulthead">Accuracy:</p>
                {correct !== 0 ? (
                  <p className="has-text-primary  is-size-1">
                    {Math.round((correct / (correct + incorrect)) * 100)}%
                  </p>
                ) : (
                  <p className="has-text-primary is-size-1">0%</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Home;
