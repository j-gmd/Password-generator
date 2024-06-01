import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [length, setLength] = useState(0);
  const [password, setPassword] = useState("");
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [strenght, setStrenght] = useState(0);

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

    let characters = "";
    if (includeUppercase) characters += uppercase;
    if (includeLowercase) characters += lowercase;
    if (includeNumbers) characters += numbers;
    if (includeSymbols) characters += symbols;
    
    if (characters.length === 0) {
      alert("Please select at least one option to include.");
      return;
    }
    
    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      generatedPassword += characters[randomIndex];
    }
    
  };

  return (
    <div className="main_container">
      <div className="main_content">
        <div className="title">Password Generator</div>
        <div className="password_box">{password}</div>
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
                /*defaultValue="0"*/
                onChange={handleChange}
                style={{
                  background: `linear-gradient(to right, #a3fdab ${length * 5}%, #24232b ${length * 5}%)`,
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
            <div>M</div>
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
