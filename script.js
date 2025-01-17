

// variables and info
let sessionStart = false;


let inhale = true;
let breath = "Exhale"
let length = ""

let sixteenItems = ["1. knwoing this is a long breath","2. Knowing this is a short breath", "3. aware of this whole body",
    "4. calming this whole body","5. sensitive to successful joy","6. sensitive to secure ease",
    "7. Aware of emotion","8. calming emotion","9. aware of state of mind","10. satisfying state of mind","11. collecting state of mind","12. freeing state of mind","13. investigating change","14. investigating fading","15. investigating ending","16. throwing it all back to nature"]
let defaultList = ['This is satisfying enough',"It's nice to relax right now"]
let randomWholesomeList = ['This is satisfying enough','We got this', "Wow, I can do this","No place to go","nothing to do","everything is alright right now",'This is it', 'I can relax right now','nothing beats this','I can just relax','no need for anything else right now']
let wholesomeInList = ['This is satisfying enough','We got this', "Wow, I can do this","No place to go","nothing to do","everything gonna be alright"]
let wholesomeOutList = ['Letting it all go', 'relaxing the whole body', 'releasing all stress', "I'm a happy camper", "got everything I need"]
let hindranceSpotList = [ 'A-ha! I see you mara!', 'Congratulations']
let sevenFactors = ['Remembering','Investigating','energizing','enjoying','relaxing','collecting','balancing']
let customList = []

let wholesomeList = defaultList
let currentWholesome = wholesomeList[0]
let wholesomeListMode = 'none'
let current16Object = -1;


let editMode = true;

// Variables for dom elements
const breathBubble = document.querySelector('.wholesomeText');
const breathTimer = document.querySelector('.bubbleTimer');
const sessionTimerUI = document.querySelector('.sessionTime');
const clock = document.querySelector('.sessionTime');
const spot = document.querySelector('.spotBubble')
const settings = document.getElementById('settings');
const addButton = document.querySelector('.submitText');
const addWindow = document.querySelector('.addText');
const listButton = document.querySelector('.listChange');
const rightCycle = document.querySelector('.rightCycle');
const leftCycle = document.querySelector('.leftCycle');

// Timer
let timerTime = 0;
let sessionTimeSecs = 0;
let sessionTimeMins = 0;

function displayItems(){
    let itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach((item) => {
        makeWholesomeLi(item)
    });
}


setInterval(function happyTime(){
    if (sessionStart == true){
        breathTimer.textContent = timerTime += 1;
        if (timerTime == 5){
            length = 'long'
            breathBubble.innerHTML = `<p>${breath}</p><p>${currentWholesome}</p><p class="fadeIn">${length}</p>` 
        } else if (timerTime == 2) {
            breathBubble.innerHTML = `<p>${breath}</p><p class="fadeIn">${currentWholesome}</p><p>${length}</p>`
    
        }
    }
    
}, 1000)

setInterval(function sessionTimer(){
        if (sessionStart == true){
            if (sessionTimeSecs == 59){
                sessionTimeSecs = 0
                sessionTimeMins += 1;
            } else {
                sessionTimeSecs += 1
            }
            sessionTimerUI.children[0].innerHTML = `${sessionTimeMins}:${sessionTimeSecs}`
        }
    
}, 1000)

function resetClock() {
    sessionTimeSecs = 0;
    sessionTimeMins = 0;
    sessionTimerUI.children[0].innerHTML = `${sessionTimeMins}:${sessionTimeSecs}`
}

let wholesomeNumberIn = 0
let wholesomeNumberOut = 0
let wholesomeListCount = 0

function wholesomeRandomPick(inOut,inOutList){ 
    inOut =  Math.floor(Math.random() * inOutList.length);
    return inOut;
}

function listCycle(list){
    currentWholesome = list;
    if (wholesomeListCount >= wholesomeList.length -1 && inhale == false){
        wholesomeListCount = 0;
    } else if (inhale == false) wholesomeListCount += 1;

}

function listManualCycle(list){
    currentWholesome = list;

}

function wholesomeListPick(){

    if(wholesomeListMode == 'lock'){
        listManualCycle(wholesomeList[wholesomeListCount]);
        
    }

    else if (wholesomeListMode == 'alternate'){
           currentWholesome = wholesomeList[wholesomeListCount];
           if (wholesomeListCount >= wholesomeList.length -1){
            wholesomeListCount = 0;
           } else wholesomeListCount += 1;
           
        
        
        }
    

           
    
    else if (wholesomeList == defaultList){
         if (inhale == true){
                    currentWholesome = defaultList[0];
                } else {
                    currentWholesome = defaultList[1];
               }
    }

    else if (wholesomeListMode == 'random'){
        currentWholesome = wholesomeList[Math.floor(Math.random() * wholesomeList.length)];          
    }
    else if (wholesomeListMode == 'cycle'){
        listCycle(wholesomeList[wholesomeListCount]);      
    }
   
}

function  settingsSelect(e){
    
    if (e.target.classList.value == 'setButton defaultList'){
        wholesomeList = defaultList;
        
    }
    // else if (e.target.classList.value == 'setButton premadeList' ){
    //     wholesomeList = sixteenSteps
    //     wholesomeListMode = 'cycle'
    // }
    else if (e.target.classList.value == 'setButton customList'){
        wholesomeList = customList;
        wholesomeListMode = 'alternate';
        
    }
    // // These are for the premade
    // else if (e.target.classList.value == 'steps16' ){
    //     wholesomeList = sixteenSteps
    //     wholesomeListMode = 'cycle'
    // }
    // else if (e.target.classList.value == 'factors7' ){
    //     wholesomeList = sevenFactors
    //     wholesomeListMode = 'cycle'
    // }
    // else if (e.target.classList.value == 'randomList' ){
    //     wholesomeList = randomWholesomeList
    //     wholesomeListMode = 'random'
    // }
    else if(e.target.innerHTML[0] <= 16 && e.target.innerHTML[0] > 0){
        wholesomeList =  [e.target.innerHTML.slice(3)]
        wholesomeListMode = 'cycle'
        console.log(e.target.innerHTML)
       
    }
    
}



// wholesome change
// function wholesomeChange() {
//     if (inhale == true){
//         currentWholesome = wholesomeInList[wholesomeNumberIn]
//     } else {
//         currentWholesome = wholesomeOutList[wholesomeNumberOut]
//     }
// }

// Checks if this is the first time clicking or pressing space.
function startCheck(){
    if (sessionStart == false){
        breathBubble.classList.add('animate');
        breathTimer.classList.add('timerAnimate');
        sessionStart = true;
    }

};

// breath change function
function breathChange(){
    startCheck()

    // wholesomeChange()
    if (inhale == true) {
        // wholesomeNumberIn = wholesomeRandomPick(wholesomeNumberIn,wholesomeInList);
        wholesomeListPick();
        breath = "Inhaling";
        length = ''
        breathBubble.classList.remove('exhale');
        breathTimer.classList.remove('bubbleTimerExhale');
        
        breathBubble.innerHTML = `<p class="fadeIn">${breath}</p><p></p><p>${length}</p>`;
        inhale = false;
        
        timerTime = 0; 
        breathTimer.textContent = timerTime;
        spot.classList.remove('glowUp');
        
    } else {
        // wholesomeNumberOut = wholesomeRandomPick(wholesomeNumberOut,wholesomeOutList);
        wholesomeListPick();
        breath = "Exhaling";
        length = ''
        breathBubble.classList.add('exhale');
        breathTimer.classList.add('bubbleTimerExhale');
       
        breathBubble.innerHTML = `<p class="fadeIn">${breath}</p><p></p><p>${length}</p>`;
        inhale = true;
        timerTime = 0;
        breathTimer.textContent = timerTime;
        spot.classList.remove('glowUp');
        
        
    }
}

function breathKeyChange(e){
    if (e.key == ' ' && editMode == false) {
        e.preventDefault()
        breathChange()
        console.log('hi');
    }
}

const jsConfetti = new JSConfetti({breathBubble});

function spotHindrance(){
    spot.classList.remove('glowUp');
    currentWholesome = hindranceSpotList[Math.floor(Math.random() * hindranceSpotList.length)]
   
    breathBubble.innerHTML = `<p>${breath}</p><p >${currentWholesome}</p><p>${length}</p>`;
    jsConfetti.addConfetti(
        {
            confettiColors: [
                'white', 'yellow', 'white', '#7ec5ef', 'yellow', 'yellow'
              ],
            }
    );

    spot.classList.add('glowUp');
    

    // breathBubble.classList.add('glowUp');
}



function makeWholesomeLi(item) {
        list = document.querySelector('.customList').nextElementSibling;
        const newList = document.createElement('li');
        const text = document.createTextNode(item);
        newList.appendChild(text);
        list.appendChild(newList);
        customList.push(item);

}

// Allows you to add custom wholesome Thoughts
function addCustomWholesome(){
    makeWholesomeLi(addWindow.value)
    
    // Add to Local Storage
    let itemsFromStorage = getItemsFromStorage();
    
    itemsFromStorage.push(addWindow.value);

    // convert to json string and set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));    

    addWindow.value = '';
}


// Gets the wholesome thoughts from storage.
function getItemsFromStorage() {
    let itemsFromStorage;

    if (localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemsFromStorage;
}

// Come back and do this with a filter if I feel like it.
function deleteCustom(e){
    
    customList.forEach((i, n) => {
        if (i === e.target.textContent){
            customList.splice(n, 1)
            
        }
    }
    )
    removeItemFromStorage(e.target.textContent)
    e.target.remove();
}

function removeItemFromStorage(item){
    let itemsFromStorage = getItemsFromStorage()
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item );
    console.log(itemsFromStorage);
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

// The function that gives with the +-RLC buttons functionality
function listItemChange(e){
    if (e.target === listButton.children[0] && wholesomeListCount <= wholesomeList.length -1){
        wholesomeListCount++
        console.log(wholesomeListCount);
    }
    else if (e.target === listButton.children[1] && wholesomeListCount > 0) {
        wholesomeListCount--
        console.log(wholesomeListCount);
    }
    else if (e.target === listButton.children[2]) {
        wholesomeListMode = 'random'
        console.log(wholesomeListMode);
    }
    else if (e.target === listButton.children[3]) {
        wholesomeListMode = 'lock'
        console.log(wholesomeListMode);
        
    }
    else if (e.target === listButton.children[4]) {
        wholesomeListMode = 'cycle'
        console.log(wholesomeListMode);
    }
}

rightCycleCLick = () => {
    wholesomeList = sixteenItems
    current16Object++
    current16Object > 15 && (current16Object = 0)
    currentWholesome = wholesomeList[current16Object]
}

leftCycleClick = () => {
    wholesomeList = sixteenItems
    current16Object--
    current16Object < 0 && (current16Object = 15)
    currentWholesome = wholesomeList[current16Object]
}

// Click to change
breathBubble.addEventListener('click', breathChange)
window.addEventListener('keypress', breathKeyChange)
breathBubble.parentElement.addEventListener('mouseover', () => {
    editMode = false;
})
breathBubble.parentElement.addEventListener('mouseout', () => {
    editMode = true;
})
clock.addEventListener('click', resetClock);
spot.addEventListener('click', spotHindrance);
settings.addEventListener('click', settingsSelect);
addButton.addEventListener('click', addCustomWholesome)
document.querySelector('.customList').nextElementSibling.addEventListener('dblclick', deleteCustom)
document.addEventListener('DOMContentLoaded', displayItems);
rightCycle.addEventListener('click', rightCycleCLick );
leftCycle.addEventListener('click', leftCycleClick)

// listButton.addEventListener('click', listItemChange)