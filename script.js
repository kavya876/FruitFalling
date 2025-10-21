const container = document.querySelector(".game-area");
const basket = document.getElementById("basket");
let score = 0;
let lives = 3;

container.addEventListener("mousemove", (event) => {
  const rect=container.getBoundingClientRect();
  let basketX=event.clientX-rect.left-basket.offsetWidth/2;
  basketX=Math.max(0,Math.min(basketX,rect.width-basket.offsetWidth));
  basket.style.left=`${basketX}px`;
});

function randomFruit() {
  const fruits = ["apple.png", "grapes.png", "orange.png", "strawberry.png"];
  return fruits[Math.floor(Math.random()*fruits.length)];
}

function spawnFruit() {
  const isBomb = Math.random() < 0.2;
  const element = document.createElement("img");
  element.src = isBomb ? "./bomb.png" : randomFruit();
  element.classList.add(isBomb ? "bombs" : "fruits");
  element.style.position = "absolute";
  element.style.left = `${Math.random() * (container.offsetWidth - 40)}px`;
  element.style.top = "-50px";
  container.appendChild(element);

  dropFruit(element, isBomb);
}

function dropFruit(element, isBomb) {
  let posY = 0;
  const speed = Math.random() * 2 + 1; 
  function fall() {
    posY += speed;
    element.style.top = posY + "px";

    const basketRect = basket.getBoundingClientRect();
    const fruitRect = element.getBoundingClientRect();

    if (
      fruitRect.bottom >= basketRect.top &&
      fruitRect.left < basketRect.right &&
      fruitRect.right > basketRect.left
    ) {
      element.remove();
      if (isBomb) {
        lives--;
        if (lives <= 0) {
          alert(`💥 Game Over! Final Score: ${score}`);
          window.location.reload();
        }
      } else {
        score += 1;
      }
      document.getElementById("scoreDisplay").textContent = `Score: ${score} | Lives: ${lives}`;
      return; 
    }

    if (posY < container.offsetHeight) {
      requestAnimationFrame(fall);
    } else {
      element.remove();
    }
  }

  requestAnimationFrame(fall);
}

setInterval(spawnFruit, 1000);
