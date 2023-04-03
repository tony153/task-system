

// First, select the HTML element you want to track the click event on
const clickedElement = document.querySelector('body');
console.log(clickedElement);

// Add a click event listener to that element
clickedElement.addEventListener('click', (event) => {
  // Use the MouseEvent object to get the X and Y coordinates of the click
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  // Log the coordinates to the console for testing purposes
  let firework = document.querySelector('.firework');
  firework.style.display="block";
  firework.style.top = mouseY +"px";
  firework.style.left = mouseX +"px";
  firework.style.animation = "firework 0.8s";

  firework.addEventListener("animationend", () => {
    // Remove the `animate` class from the element when the animation is finished
    firework.style.animation = "";
    firework.style.display="none";
  });
});