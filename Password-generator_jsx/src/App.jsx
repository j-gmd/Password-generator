import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [length, setLength] = useState(0);
  const [password, setPassword] = useState("");
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [strength, setStrenght] = useState(0);
  const [showCopyButton, setshowCopyButton] = useState(0); //0 = não mostra, 1 = mostra branco(para copiar), 2 = mostra verde (já copiado)

  useEffect(() => {
    const slider = document.getElementById("slider");
    slider.style.setProperty("--value", slider.value);
    slider.style.setProperty("--min", slider.min || "0");
    slider.style.setProperty("--max", slider.max || "20");
    slider.addEventListener("input", () => {
      slider.style.setProperty("--value", slider.value);
    });
  }, []);

  const handleChange = (e) => {
    setLength(e.target.value);
  };

  const generatePassword = () => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

    let nOfSelectedOptions = 0;

    let characters = "";
    if (includeUppercase) (characters += uppercase), nOfSelectedOptions++;
    if (includeLowercase) (characters += lowercase), nOfSelectedOptions++;
    if (includeNumbers) (characters += numbers), nOfSelectedOptions++;
    if (includeSymbols) (characters += symbols), nOfSelectedOptions++;

    if (characters.length === 0) {
      alert("Please, select at least one option to include.");
      return;
    } else if (length === 0) {
      alert("Please, increase the password size.");
      return;
    }

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      generatedPassword += characters[randomIndex];
    }

    if (nOfSelectedOptions === 1) {
      setStrenght(1);
    } else if (nOfSelectedOptions === 2) {
      setStrenght(2);
    } else if (nOfSelectedOptions === 3) {
      setStrenght(3);
    } else {
      setStrenght(4);
    }
    setPassword(generatedPassword);
    setshowCopyButton(1);
  };

  function getPasswordStrength() {
    switch (strength) {
      case 1:
        return "WEAK";
      case 2:
        return "FAIR";
      case 3:
        return "MEDIUM";
      case 4:
        return "STRONG";
      default:
        return "WEAK";
    }
  }

  /* Função que retorna a cor que a barra deve possuir. Ele usa a variável sstrength para
  setar quais barras devem ser coloridas em determinado momento*/
  function getBarStyle(index) {
    if (strength >= index) {
      switch (strength) {
        case 1:
          return { backgroundColor: "#A62B1F", borderColor: "#A62B1F" };
        case 2:
          return { backgroundColor: "#F2A71B", borderColor: "#F2A71B" };
        case 3:
          return { backgroundColor: "#45C4B0", borderColor: "#45C4B0" };
        case 4:
          return { backgroundColor: "#a3fdab", borderColor: "#a3fdab" };
        default:
          return { backgroundColor: "#18171f" };
      }
    }
    return { backgroundColor: "#18171f" };
  }
  
  function CopyButton() {
    if(showCopyButton===0){
      return(
        <button className="copyButton"></button>
      );
    }else if(showCopyButton===1){
      return(
        <button className="copyButton" onClick={copyToClipboard}> <img src="src/images/contentCopy.svg" alt="Copy to clipboard"></img> </button>
      );
    }else if(showCopyButton===2){
      return(
        <button className="copyButton" onClick={copyToClipboard}> <img src="src/images/contentCopyGreen.svg" alt="Copy to clipboard"></img> </button>
      );
    }
  
  }
  
  function copyToClipboard() {
    var copyText = password;
    if(copyText.length !== 0){
      setshowCopyButton(2);
      navigator.clipboard.writeText(copyText);
      //alert("Copied the text: " + copyText);
    } 
  }

  return (
    <div className="main_container">
      <div className="main_content">
        <div className="title">Password Generator</div>
        <div className="password_box">
          {password}
          <CopyButton />
        </div>
        <div className="generator_box">
          <div className="length_box">
            <div className="length_title">
              <span>Character Length</span>
              <span id="value">{length}</span>
            </div>
            <div className="length_slider">
              <input
                type="range"
                min="0"
                max="20"
                value={length}
                className="styled-slider slider-progress"
                id="slider"
                onChange={handleChange}
                style={{
                  background: `linear-gradient(to right, #a3fdab ${length * 5}%, #18171f ${length * 5}%)`,
                }}
              />
            </div>
          </div>

          <div className="checkboxes">
            <form>
              <div className="uppercase">
                <input
                  type="checkbox"
                  id="uppercase"
                  checked={includeUppercase}
                  onChange={(e) => setIncludeUppercase(e.target.checked)}
                />
                <label htmlFor="uppercase">Include Uppercase Letters</label>
              </div>
              <div className="lowercase">
                <input
                  type="checkbox"
                  id="lowercase"
                  checked={includeLowercase}
                  onChange={(e) => setIncludeLowercase(e.target.checked)}
                />
                <label htmlFor="lowercase">Include Lowercase Letters</label>
              </div>
              <div className="numbers">
                <input
                  type="checkbox"
                  id="numbers"
                  checked={includeNumbers}
                  onChange={(e) => setIncludeNumbers(e.target.checked)}
                />
                <label htmlFor="numbers">Include Numbers</label>
              </div>
              <div className="symbols">
                <input
                  type="checkbox"
                  id="symbols"
                  checked={includeSymbols}
                  onChange={(e) => setIncludeSymbols(e.target.checked)}
                />
                <label htmlFor="symbols">Include Symbols</label>
              </div>
            </form>
          </div>

          <div className="strength_box">
            <div className="strength_title">Strength</div>

            <div className="strength-check-container">
              <span>{getPasswordStrength()}</span>
              <div className="strength-check" style={getBarStyle(1)}></div>
              <div className="strength-check" style={getBarStyle(2)}></div>
              <div className="strength-check" style={getBarStyle(3)}></div>
              <div className="strength-check" style={getBarStyle(4)}></div>
            </div>
          </div>

          <button className="button" onClick={generatePassword}>
            Generate
            <span className="button_icon"> &#x2192;</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;