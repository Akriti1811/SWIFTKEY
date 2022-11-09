import "../styles/Home.css";
import { useState, useEffect, useRef } from "react";
import randomWords from "random-words";
import { createSession } from "../actions/session";

const NUMB_OF_WORDS = 200;
const SECONDS = 60;

const Home = () => {
  const [time, setTime] = useState(1);
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
  const [interrupt, setInterrupt] = useState(0);
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
    if (send === true && interrupt === 1) {
      console.log(correct, incorrect);
      createSessionRequest();
      setSend(false);
    }
  }, [send]);

  function generateWords() {
    return new Array(NUMB_OF_WORDS).fill(null).map(() => randomWords());
  }

  function createSessionRequest() {
    var session = {
      gross: Math.round((correct + incorrect) / time),
      net: Math.round(correct / time),
      accuracy: Math.round((correct / (correct + incorrect)) * 100),
    };
    try {
      const token = JSON.parse(localStorage.getItem("auth")).token;
      console.log(session);
      (async () => {
        const res = await createSession(session, token);
      })();
    } catch (err) {
      console.log(err);
    }
  }

  function stop() {
    setCountDown(0);
    setStatus("finished");
    setWords(generateWords());
    setCurrWordIndex(0);
    setCorrect(0);
    setIncorrect(0);
    setCurrCharIndex(-1);
    setCurrChar("");
    setCurrInput("");
    setInterrupt(0);
    setTime(1);
  }

  function start() {
    if (status === "finished") {
      setWords(generateWords());
      setCurrWordIndex(0);
      setCorrect(0);
      setIncorrect(0);
      setCurrCharIndex(-1);
      setCurrChar("");
      setTime(1);
    }
    if (status !== "started") {
      setStatus("started");
      setInterrupt(1);
      setCountDown(SECONDS * time);
      let interval = setInterval(() => {
        setCountDown((prevCountdown) => {
          if (prevCountdown === 0) {
            clearInterval(interval);
            setStatus("finished");
            setSend(true);
            setCurrInput("");
            return SECONDS * time;
          } else {
            return prevCountdown - 1;
          }
        });
      }, 1000);
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
      setCorrect((previousCorrect) => previousCorrect + 1);
    } else {
      // setIncorrect(incorrect + 1);
      setIncorrect((previousIncorrect) => previousIncorrect + 1);
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
        {(status === "waiting" || interrupt === 0) && (
          <div className="home-header section has-text-centered">
            TEST YOUR TYPING SKILLS
          </div>
        )}

        {status !== "started" && (
          <>
            <div className="section m-5 has-text-centered">
              <p className="timehead mb-3">CHOOSE TEST TIME </p>
              <button
                className="btntime"
                onClick={() => {
                  setTime(1);
                }}
              >
                1 min{" "}
              </button>
              <button
                className="btntime"
                onClick={() => {
                  setTime(3);
                }}
              >
                3 min
              </button>
              <button
                className="btntime"
                onClick={() => {
                  setTime(5);
                }}
              >
                5 min
              </button>
            </div>
            <div className="section  has-text-centered">
              <button className="btntime px-5 py-2" onClick={start}>
                Start
              </button>
            </div>
          </>
        )}

        {status === "started" && (
          <>
            <div className="timesection">
              <div className=" has-text-centered">
                <h2 className="is-size-1 time">Time : {countDown}</h2>
              </div>
            </div>
            <div className="section  has-text-centered">
              <button className="btntime px-5 py-2" onClick={stop}>
                Stop
              </button>
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
          </>
        )}

        {status === "finished" && interrupt === 1 && (
          <div className="section">
            <div className="columns">
              <div className="column has-text-centered">
                <p className="resulthead">Gross words per minute:</p>
                <p className="has-text-primary is-size-1">
                  {Math.round((correct + incorrect) / time)}
                </p>
              </div>
              <div className="column has-text-centered">
                <p className="resulthead">Net words per minute:</p>
                <p className="has-text-primary is-size-1">
                  {Math.round(correct / time)}
                </p>
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
