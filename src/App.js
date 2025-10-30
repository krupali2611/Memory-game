import "./App.css";
import React,{ useEffect,useState} from 'react'
import Card from './Card'

function App() {

  const cardImages = [
    { src: "🍕", matched: false },
    { src: "🚗", matched: false },
    { src: "🐶", matched: false },
    { src: "🎮", matched: false },
    { src: "🌈", matched: false },
    { src: "🧠", matched: false },
  ];

  const [cards,setCards]=useState([]);
  const [turns,setTurns]=useState(0);
  const [choiceOne,setChoiceOne]=useState(null);
  const [choiceTwo,setChoiceTwo]=useState(null);
  const [disabled,setDisabled]=useState(false);
  const [second,setSecond]=useState(0);
  const [isActive,setIsActive]=useState(false);

  useEffect(()=>{
    shuffleCard();
  },[]);

  const shuffleCard=()=>{
    const shuffled=[...cardImages,...cardImages]
    .map((card)=>({...card,id:Math.random()}))
    .sort(()=>Math.random()-0.5);
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffled);
    setTurns(0);
    setSecond(0);
    setIsActive(true);
  }

  useEffect(()=>{
    let timer;
    if(isActive){
      timer=setInterval(() => {
        setSecond((prev)=>prev+1)
      }, 1000);
    }
    return ()=>clearInterval(timer);
  },[isActive])

  useEffect(()=>{
    if(cards.length>0 && cards.every((card)=> card.matched)){
      setIsActive(false)
    }
  },[cards])
  
  const handleChoice=(card)=>{
    !disabled && (choiceOne ? setChoiceTwo(card):setChoiceOne(card))
  }

  useEffect(()=>{
    if(choiceOne&&choiceTwo){
      setDisabled(true);
      if(choiceOne.src===choiceTwo.src){
        setCards((prevCards)=>
          prevCards.map((card)=>
            card.src === choiceOne.src ? {...card,matched:true} : card
          )
        );
        resetTurn();
      }
      else{
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  },[choiceOne,choiceTwo]);

  const resetTurn =()=>{
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prev)=>prev+1);
    setDisabled(false);
  }

  return (
    <div className="App">
      <h1> Memory Game </h1>
      <button onClick={shuffleCard}> Reset Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns:{turns}</p>
      <p>Time : {second} seconds</p>
    </div>
  );
}

export default App;
