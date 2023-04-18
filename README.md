# **text-scan**

**text-scan** is a react component which takes a text input, and displays the text with a digital text-scan animation, similar to subway split-flap.

The component needs a "inText" prop value as listed in the parameters below. The rest of the parameters listed have default values.

# Installation
`npm i text-scan`


# Props

## **inText** (necessary):

ex: <**TextScan** inText={"When you're feeling bobo,  take some time and watch a movie"} />

This prop takes the text/string that you want to display.

## **scanStyle**:

### **"alph"** (default)
ex: <**TextScan** inText={"When you're feeling bobo,  take some time and watch a movie"} scanStyle={"alph"} />

Giving the scanStyle a vallue of "alph" will show letters when scanning through the text.
<br/><br/>
### **"digit"** (default)
ex: <**TextScan** inText={"When you're feeling bobo,  take some time and watch a movie"} scanStyle={"digit"} />

Giving the scanStyle a vallue of "digit" will show numbers("0"s and "8"s) when scanning through the text.

It is set to "alph" by default if no value is value provided

## **fontSize**:

ex: <**TextScan** inText={"When you're feeling bobo,  take some time and watch a movie"} scanStyle={"digit"} fontSize={"15px"}/>

This prop takes a string value of px which is used to adjust the font-size to that size.

It is set to '15px' by default if no vlaue is provided.

## **animationSpeed**:

ex: <**TextScan** inText={"When you're feeling bobo,  take some time and watch a movie"} scanStyle={"digit"} fontSize={"15px"} animationSpeed={6}/>

This prop takes an integer(1-10) to set the speed of the text-scan animation.

It is set to around 3 by default if no value is provided


## **placeholderOpacity**:

ex: <**TextScan** inText={"When you're feeling bobo,  take some time and watch a movie"} scanStyle={"digit"} fontSize={"15px"} animationSpeed={6} placeholderOpacity={4}/>

This prop takes an integer(1-10) to set the opacity of the placeholder text(random letters or '0's and '8's) in the text-scan animation.

It is set to around 4 by default if no value is provided


## **style**:

ex: <**TextScan** inText={"When you're feeling bobo,  take some time and watch a movie"} scanStyle={"digit"} fontSize={"15px"} animationSpeed={6} placeholderOpacity={4} style={{display: block, color: 'green'}}/>

You can adjust the styling of the text/text-container by passing in a "style" object.

By default, the styling is set to:
`{
  display: "flex",
  justifyContent: "flex-start",
  flexWrap: "wrap",
  marginTop: "30px",
  lineHeight: "1.4",
  fontWeight: "500",
  fontStyle: "normal",
  color: "#8e8e8e",
}`

### CHANGING ANY OF THE DEFAULT STYLING MIGHT BREAK THE FORMAT OF THE COMPONENT. IF COMPONENT FORMAT BREAKS, REMOVE STYLE ALTOGETHER.

