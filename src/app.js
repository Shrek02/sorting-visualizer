///////////////////////////////////////////////////////////////////

//Global variables
let arr = [];
let size = 100;
let timeOut = 10;
generateLines();
const barDesign = '5px solid white';
const compareDesign = '5px solid goldenRod';
const sortedDesign = '5px solid green';

///////////////////////////////////////////////////////////////////
//Configuring Slider
//Array Size 
var arrayRange = document.getElementById('arrayRange');
arrayRange.oninput = function() {
    size = arrayRange.value;
    generateLines();    
}

//TimeOut Slder
var tOut = document.getElementById('timeOutRange');
tOut.oninput = function() {
    timeOut = 100 - tOut.value;
}

///////////////////////////////////////////////////////////////////
//generate new set of random lines when new array button is clicked.
document.getElementById("newArray").addEventListener("click", generateLines);

///////////////////////////////////////////////////////////////////
//Generate new random array function
function generateLines(){
    document.getElementById("bars").innerHTML = "";
    
    arr = createArray();
    createDivs(arr);
}

//Creates a random array;
function createArray() {
    const arr = [];
    
    for(var i = 0; i < size; i++){
        arr.push(Math.ceil(Math.random() * 100));
    }
    
    return arr;
}


//Create divs out of random array;
function createDivs() {
    
    for(var i = 0; i < size; i++) {
        const div = document.createElement('div');
        div.classList.add('bar');
        div.style.height = arr[i]*5.5 + 'px';
        div.setAttribute('id', `${i}`);
        const parentDiv = document.getElementById('bars')
        parentDiv.appendChild(div);
        
    }
}

///////////////////////////////////////////////////////////////////
//Method to generate delay
async function delay() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, timeOut);
    });
}

///////////////////////////////////////////////////////////////////
//Method to compare two el based on height;
//Also changes el colors to red;
function compare(el1, el2) {
    const h1 = el1.clientHeight;
    const h2 = el2.clientHeight;
            
    el1.style.borderLeft = compareDesign;
    el2.style.borderLeft = compareDesign;
    
    return h1 - h2;
}


///////////////////////////////////////////////////////////////////
//Function to swap heights;
function swap(el1, el2){
    const h1 = el1.clientHeight;
    const h2 = el2.clientHeight;
    
    el1.style.height = h2 + 'px';
    el2.style.height = h1 + 'px';
}

///////////////////////////////////////////////////////////////////
//Disable and enable UI

function disable() {
    var els = document.querySelectorAll('button, input')
    for(let i = 0; i < els.length; i++) {
        els[i].disabled = true;
    }
}

function enable() {
    var els = document.querySelectorAll('button, input')
    for(let i = 0; i < els.length; i++) {
        els[i].disabled = false;
    }
}

///////////////////////////////////////////////////////////////////
//Implementing Bubble sort;
document.getElementById("bubbleSort").addEventListener("click", bubbleSort);

async function bubbleSort() {
    disable();
    for(let i = 0; i < size; i++){
        for(let j = i+1; j < size; j++){
            let el1 = document.getElementById(i);
            let el2 = document.getElementById(j);
            
            if(compare(el1, el2) > 0){
                await delay();
                swap(el1, el2);
            }
            el1.style.borderLeft = barDesign;
            el2.style.borderLeft = barDesign;
        }
        document.getElementById(i).style.borderLeft = sortedDesign;
    }
    enable();
}

///////////////////////////////////////////////////////////////////
//Implementing Selection sort;
document.getElementById("selectionSort").addEventListener("click", selectionSort);

async function selectionSort() {
    disable();
    for(let i = 0; i < size - 1; i++){
        let minEl = document.getElementById(i);
        for(let j = i + 1; j < size; j++) {
            let curEl = document.getElementById(j);
            if(compare(minEl, curEl) > 0){
                await delay();
                minEl.style.borderLeft = barDesign;
                minEl = curEl;
            }
            minEl.style.borderLeft = barDesign;
            curEl.style.borderLeft = barDesign;
        }
        swap(document.getElementById(i), minEl);
        document.getElementById(i).style.borderLeft = sortedDesign;
    }
    document.getElementById(size - 1).style.borderLeft = sortedDesign;
    enable();
}

///////////////////////////////////////////////////////////////////
//Implementing Insertion sort;

document.getElementById("insertionSort").addEventListener("click", insertionSort);

async function insertionSort() {
    disable();
    for(let i = 1; i < size; i++){
        let curEl = document.getElementById(i);
        
        let k = i - 1;
        
        while(k >= 0 && compare(curEl, document.getElementById(k)) < 0){
            await delay();
            curEl.style.borderLeft = barDesign;
            document.getElementById(k).style.borderLeft = barDesign;
            k--;
        }
        
        curEl.style.borderLeft = barDesign;
        if(k >= 0) {
            document.getElementById(k).style.borderLeft = sortedDesign;
        } else {
            document.getElementById(k + 1).style.borderLeft = sortedDesign;
        }
        
        let height = curEl.clientHeight;
        
        k = i - 1;
        
        while(k >= 0 && height < document.getElementById(k).clientHeight) {
            document.getElementById(k+1).style.height = document.getElementById(k).clientHeight + 'px';
            k--;
        }
        document.getElementById(k+1).style.height = height + 'px';
        
        for(let j = 0; j <= i; j++){
            document.getElementById(j).style.borderLeft = sortedDesign;
        }
        
    }
    enable();
}

///////////////////////////////////////////////////////////////////
//Implementing Quick Sort;

document.getElementById("quickSort").addEventListener("click", quickSort);

async function hoare(l, h) {
    
    let pivot = document.getElementById(l);
    var i = l - 1;
    var j = h + 1;
    
    while(true){
        
        do{
            await delay();
            if(i >= l){
                document.getElementById(i).style.borderLeft = barDesign;
                pivot.style.borderLeft = barDesign;
            }
            i++;
            
        } while(compare(document.getElementById(i), pivot) < 0);
        pivot.style.borderLeft = barDesign;
        document.getElementById(i).style.borderLeft = barDesign;
        
        do {
            await delay();
            if( j<= h){
                document.getElementById(j).style.borderLeft = barDesign;
            pivot.style.borderLeft = barDesign;
            }
            j--;            
        } while(compare(document.getElementById(j), pivot) > 0);
        pivot.style.borderLeft = barDesign;
        document.getElementById(j).style.borderLeft = barDesign;
        
        if(i >= j) return j;
        swap(document.getElementById(i), document.getElementById(j));
    }
    
}

async function lomuto(l, h) {
    let pivot = document.getElementById(h);
    let win = l-1;
    for(let i = l; i<= h; i++){
        if(compare(document.getElementById(i), pivot) < 0){
            win++;
            await delay();
            document.getElementById(i).style.borderLeft = barDesign;
            pivot.style.borderLeft = barDesign;
            swap(document.getElementById(i), document.getElementById(win));
        }
        await delay();
        document.getElementById(i).style.borderLeft = barDesign;
        pivot.style.borderLeft = barDesign;
        
    }
    
    swap(document.getElementById(win + 1), pivot);
    
    return win + 1;
}

async function qSort(l, h) {
    
    if(l < h) {
        var p = await hoare(l, h);
        await qSort(l, p);
        await qSort(p+1, h);
    }
    
    for(let i = l; i <= h; i++){
        document.getElementById(i).style.borderLeft = sortedDesign;
    }
    
}

async function quickSort() {
    disable();
    await qSort(0, arr.length-1);
    enable();
}


///////////////////////////////////////////////////////////////////
//Implementing Merge Sort;

document.getElementById("mergeSort").addEventListener("click", mergeSort);

async function merge(l, m, h) {
    const a = [];
    const b = [];
    
    for(let i = l; i <= m; i++){
        a.push(arr[i]);
    }
    
    for(let j = m + 1; j <= h; j++){
        b.push(arr[j])
    }
    
    let i = 0;
    let j = 0;
    let k = l;
    
    while(i < a.length && j < b.length){
        compare(document.getElementById(l + i), document.getElementById(m + j + 1));
        await delay();
        if(a[i] <= b[j]){
            document.getElementById(l + i).style.borderLeft = barDesign;
            document.getElementById(m + j + 1).style.borderLeft = barDesign;
            arr[k] = a[i];
            document.getElementById(k).style.height = a[i]*5.5 + 'px';
            k++;
            i++;
        } else {
            document.getElementById(l + i).style.borderLeft = barDesign;
            document.getElementById(m + j + 1).style.borderLeft = barDesign;
            arr[k] = b[j];
            document.getElementById(k).style.height = b[j]*5.5 + 'px';
            k++;
            j++;
        }
        
    }
    
    while(i < a.length){
        document.getElementById(l + i).style.borderLeft = compareDesign;
        await delay();
        document.getElementById(l + i).style.borderLeft = barDesign;
        if(m + j + 1 < size){
            document.getElementById(m + j + 1).style.borderLeft = barDesign;
        }
        
        arr[k] = a[i];
        document.getElementById(k).style.height = a[i]*5.5 + 'px';
        k++;
        i++;
    }
    
    while(j < b.length){
        compare(document.getElementById(l + i), document.getElementById(m + j + 1));
        await delay();
        document.getElementById(l + i).style.borderLeft = barDesign;
        document.getElementById(m + j + 1).style.borderLeft = barDesign;
        arr[k] = b[j];
        document.getElementById(k).style.height = b[j]*5.5 + 'px';
        k++;
        j++;
    }
 
    
}

async function mSort(l ,h) {
    
    if(l < h) {
        
        let m = Math.floor(l + (h - l)/2);
        await mSort(l, m);
        await mSort(m + 1, h);
        await merge(l, m, h);
    }
    for(let i = l; i <= h; i++){
        await delay();
        document.getElementById(i).style.borderLeft = sortedDesign;
    }
      
}

async function mergeSort(){
    disable();
    await mSort(0, size - 1);
    enable();
}


