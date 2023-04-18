import React, { useState, useEffect } from "react";
import styled from "styled-components";

/* THE WAY THAT THIS COMPONENT WORKS IS THAT IT:
- TAKES A BODY OF TEXT
- SPLITS THE BODY OF TEXT INTO CHARS
- ITERATES THROUGH ALL THE CHARS;
  IF THE CHAR IS IN OUR 'used' OBJ, WE SHOW IT AT 100% OPACITY;
  OTHERWISE, SHOW A RANDOM CHARACTER FROM OUR BODY OF TEXT AT 36% OPACITY
*/

// THIS OBJ KEEPS TRACK OF LETTERS WE ARE SHOWING
// WE ADD LETTERS FROM OUR TEXT BODY TO IT
let used = {};

// BUILT-IN STYLE FOR EACH CHARACTER
const Character = styled.div`
  width: 12px;
  display: flex;
  justify-content: center;
`;

// BUILT-IN STYLE FOR FADED CHARACTER
const FadedCharacter = styled(Character)`
  opacity: 36%;
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 30px;
  line-height: 1.4;
  font-family: "omnes-georgian", sans-serif;
  font-weight: 500;
  font-style: normal;
  color: #8e8e8e;
`;

const TextScan = ({
  inText,
  scanStyle,
  fontSize,
  style,
  animationSpeed,
  placeholderOpacity,
}) => {
  let charOpacity = !placeholderOpacity
    ? "36%"
    : placeholderOpacity === 10
    ? "100%"
    : placeholderOpacity === 9
    ? "90%"
    : placeholderOpacity === 8
    ? "80%"
    : placeholderOpacity === 7
    ? "70%"
    : placeholderOpacity === 6
    ? "60%"
    : placeholderOpacity === 5
    ? "50%"
    : placeholderOpacity === 4
    ? "40%"
    : placeholderOpacity === 3
    ? "30%"
    : placeholderOpacity === 2
    ? "20%"
    : placeholderOpacity === 1
    ? "10%"
    : "10%";

  let intervals = !animationSpeed
    ? 6
    : animationSpeed === 10
    ? 1
    : animationSpeed === 9
    ? 1
    : animationSpeed === 8
    ? 1
    : animationSpeed === 7
    ? 1
    : animationSpeed === 6
    ? 1
    : animationSpeed === 5
    ? 2
    : animationSpeed === 4
    ? 4
    : animationSpeed === 3
    ? 6
    : animationSpeed === 2
    ? 8
    : animationSpeed === 1
    ? 10
    : 10;

  let intervalSpeed = !animationSpeed
    ? 3
    : animationSpeed === 10
    ? 0.00195312
    : animationSpeed === 9
    ? 0.0078125
    : animationSpeed === 8
    ? 0.03125
    : animationSpeed === 7
    ? 0.125
    : animationSpeed === 6
    ? 0.25
    : animationSpeed === 5
    ? 0.5
    : animationSpeed === 4
    ? 1
    : animationSpeed === 3
    ? 2
    : animationSpeed === 2
    ? 3
    : animationSpeed === 1
    ? 4
    : 4;

  // in-order text split into indiv characters
  let letters = inText.split("");

  //  ------------------- SOLELY USED TO CREATE A RANDOMIZED PARAGRAPH OF LETTERS, THE SAME LENGTH AS OUR INTAKEN TEXT BODY ------------------- vv
  // returns a random index number that is within the body of text we intook
  const randomCharIndex = () => {
    return Math.floor(Math.random() * (inText.length - 0 + 1) + 0);
  };

  // returns paragraph with same amount of characters as the text we are going to display, but characters are random
  // let randomizedAlph = (letters) => {
  //   const randomizedP = [];
  //   let i = 0;
  //   while (i < letters.length) {
  //     randomizedP.push(letters[randomCharIndex()]);
  //     i++;
  //   }
  //   return randomizedP.join("");
  // };
  //  ------------------- SOLELY USED TO CREATE A RANDOMIZED PARAGRAPH OF LETTERS, THE SAME LENGTH AS OUR INTAKEN TEXT BODY ------------------- ^^

  // this will hold the text we will be displaying in the about-desc
  const [text, setText] = useState("");
  // this will keep track of how many letters of the uniqueChars we have gone through
  const [hitUniqueChars, setHitUniqueChars] = useState(0);
  // this will keep track of how many letter switches we have/the scan effect
  const [hit8, setHit8] = useState(0);

  // THIS FUNCTION WILL TAKE THE INTAKEN TEXT BODY, AND RETURNS AN ARRAY OF UNIQUE CHARACTERS
  const getUniqueChars = (str) => {
    let arr = [];
    for (let char of str.split("")) {
      if (arr.indexOf(char) < 0) {
        arr.push(char);
      }
    }
    return arr;
  };

  useEffect(() => {
    // set uniqueChars to equal the arr of all unique chars in our body of text
    let uniqueChars = getUniqueChars(inText);
    // FUNCTION THAT BASICALLY CAUSES THE ANIMATION BY UPDATING THE 'text' STATE OVER AND OVER
    const randomFunc = () => {
      // THIS IS A SORT OF BASE CASE; WHEN WE HIT THIS CASE, WE ADD A NEW CHAR TO THE 'used' OBJ HENCE RENDERING A NEW CHARACTER IN ITS CORRECT PLACE
      if (hit8 === intervals) {
        // WE RESET OUR hit8 TO MAKE SURE WE WAIT A COUPLE OF RANDOM TEXT RE-RENDERS TO ADD A NEW LETTER TO THE 'used' OBJ
        setHit8(0);
        // WE SLICE THE UNIQUE CHARS AT THE LAST CHARACTER WE'VE ADDED TO THE 'used' OBJ TO ENSURE THESE ARE ALL CHARS THAT HAVEN'T BEEN RENDERED YET
        uniqueChars = uniqueChars.slice(hitUniqueChars);
        // WE GRAB THE FIRST LETTER IN OUR FRESHLY SLICED ARR OF UNIQUE CHARS.
        const correctLetterToSet = uniqueChars[0];
        // WE ADD THAT UNIQUE CHAR TO THE 'used' OBJ
        used[correctLetterToSet] = 1;
      }

      //  function below will:
      //  - for each letter/char:
      //      - if the char is in the used obj, then push the char as a Character component into an arr, else, push a random letter into an arr.
      //      - if the char is a space, push the space as it is
      //      - join all chars
      //      - split the new randomized chars at the spaces

      // outcome of this should be [[w,o,r,d],[w,o,r,d],[w,o,r,d]]
      const newP = [];
      let currWordArr = [];
      for (let i = 0; i <= letters.length; i++) {
        let placeholder;
        if (hit8 % 2 === 0) {
          placeholder = "0";
        } else {
          placeholder = "8";
        }
        let capChar = letters[i];
        let char;
        if (capChar) {
          char = capChar.toLowerCase();
        }
        // if we havent stored the current char in the object, push a random character in its place
        if (scanStyle === "digit") {
          if (char === " " || i === letters.length) {
            currWordArr.push(<Character key={i}>{capChar}</Character>);
            newP.push(
              <div style={{ display: "flex" }} key={`${i}-div`}>
                {currWordArr}
              </div>
            );
            currWordArr = [];
          } else if (used[char] === 1) {
            currWordArr.push(<Character key={i}>{capChar}</Character>);
          } else {
            // USING AN ACTUAL RANDOM CHAR FROM THE TEXT AS THE RANDOM CHARS FOR THE SCAN
            currWordArr.push(
              <Character style={{ opacity: charOpacity }} key={i}>
                {placeholder}
              </Character>
            );
          }
        } else {
          if (char === " " || i === letters.length) {
            currWordArr.push(<Character key={i}>{capChar}</Character>);
            newP.push(
              <div style={{ display: "flex" }} key={`${i}-div`}>
                {currWordArr}
              </div>
            );
            currWordArr = [];
          } else if (used[char] === 1) {
            currWordArr.push(<Character key={i}>{capChar}</Character>);
          } else {
            // USING AN ACTUAL RANDOM CHAR FROM THE TEXT AS THE RANDOM CHARS FOR THE SCAN
            currWordArr.push(
              <Character style={{ opacity: charOpacity }} key={i}>
                {inText[randomCharIndex()]}
              </Character>
            );
          }
        }
      }

      setText(newP);
    };

    // CREATE INTERVAL
    let animationInterval;
    // If we haven't yet hit all of our uniqueChars, set the interval;
    if (hitUniqueChars <= uniqueChars.length) {
      // setInterval
      animationInterval = setInterval(() => {
        // if we have hit 8 iterations of random chars/not setting/rendering a new unique char in its correct place:
        if (hit8 === intervals) {
          // increment the hitUniqueChars state because we are about to add a new unique char to the used OBJ by calling the randomFunc function
          setHitUniqueChars(hitUniqueChars + 1);
          randomFunc();
          // otherwise, just call the randomFunc which will render no new unique characters in their respective correct place
        } else {
          randomFunc();
          // make sure to increment the count8 so that after doing these random character renders 8 times, we finally add a new char from uniqueChars to the used OBJ and render it the next time we call the randomFunc function after that
          setHit8(hit8 + 1);
        }
      }, intervalSpeed);
      // clear the interval each time
      return () => clearInterval(animationInterval);
    }
    return () => (used = {});
  });

  return !style || style === "default" ? (
    <TextContainer style={{ fontSize: `calc(${fontSize} + 0.2vw)` }}>
      {text}
    </TextContainer>
  ) : (
    <div style={style}>{text}</div>
  );
};

export default TextScan;
