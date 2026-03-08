let basket=document.getElementById("basket")
let gameArea=document.getElementById("gameArea")

let score=0
let lives=3
let basketX=180

let spawnInterval
let running=false
let paused=false

let music=document.getElementById("music")
let catchSound=document.getElementById("catch")
let boom=document.getElementById("boom")

let high=localStorage.getItem("fruitHigh") || 0
document.getElementById("high").innerText=high

const items=[
{emoji:"🍎",points:5},
{emoji:"🍌",points:3},
{emoji:"🍇",points:7},
{emoji:"🍉",points:10},
{emoji:"💣",points:0}
]

function startGame(){

document.getElementById("home").style.display="none"
document.getElementById("game").style.display="block"

score=0
lives=3
basketX=180

document.getElementById("score").innerText=score
document.getElementById("lives").innerText="❤️❤️❤️"

running=true
paused=false

spawnInterval=setInterval(createItem,1500)

}

document.addEventListener("keydown",e=>{

if(!running || paused) return

if(e.key==="ArrowLeft" && basketX>0) basketX-=25
if(e.key==="ArrowRight" && basketX<360) basketX+=25

basket.style.left=basketX+"px"

})

function createItem(){

if(!running || paused) return

let data=items[Math.floor(Math.random()*items.length)]

let fruit=document.createElement("div")
fruit.className="fruit"
fruit.innerText=data.emoji
fruit.dataset.points=data.points

if(data.emoji==="💣"){
fruit.classList.add("bomb")
}

fruit.style.left=Math.random()*380+"px"

gameArea.appendChild(fruit)

let y=-40

let fall=setInterval(()=>{

if(!running || paused) return

y+=3
fruit.style.top=y+"px"

if(y>480){

let fruitX=fruit.offsetLeft

if(fruitX>basketX && fruitX<basketX+60){

if(fruit.innerText==="💣"){

boom.play()
lives--

}else{

catchSound.play()
score+=Number(fruit.dataset.points)

}

document.getElementById("score").innerText=score
document.getElementById("lives").innerText="❤️".repeat(lives)

fruit.remove()

}else{

fruit.remove()

}

clearInterval(fall)

if(lives<=0){
gameOver()
}

}

},30)

}

function togglePause(){
paused=!paused
}

function toggleMusic(){

if(music.paused){
music.play()
}else{
music.pause()
}

}

function gameOver(){

running=false

clearInterval(spawnInterval)

document.getElementById("finalScore").innerText=score

if(score>high){
high=score
localStorage.setItem("fruitHigh",high)
document.getElementById("high").innerText=high
}

document.getElementById("gameOver").style.display="block"

}

function restartGame(){

clearInterval(spawnInterval)

document.querySelectorAll(".fruit").forEach(f=>f.remove())

document.getElementById("gameOver").style.display="none"

startGame()

}