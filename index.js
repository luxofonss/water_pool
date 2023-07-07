let waterArr = [];

function solve(arr) {
  let res = 0;
  let maxIndex = 0;
  let max = arr[0];

  // get index of max element
  arr.forEach((e, index) => {
    if (e > max) {
      max = e;
      maxIndex = index;
    }
  });

  // check from index = 0  to maxIndex
  let i = 0,
    j = 1;
  let holdAble = [];
  while (j <= maxIndex) {
    // if arr[i] >  arr[j] that means we can hold some water in index = j, then we push arr[j] onto holdAble array
    if (arr[i] > arr[j]) {
      holdAble.push(arr[j]);
      j++;
    } else {
      waterArr[i] = 0;
      // if holdAble array is not empty then we increase holdable count and set holdable value to waterArr
      if (holdAble.length > 0)
        holdAble.forEach((child, index) => {
          res += arr[i] - child;
          waterArr[i + index + 1] = arr[i] - child;
        });
      i = j;
      j++;
      holdAble = [];
    }
  }

  //check from end of arr to maxIndex (same with above while loop but different order)
  i = arr.length - 1;
  j = arr.length - 2;
  holdAble = [];
  while (j >= maxIndex) {
    if (arr[i] > arr[j]) {
      holdAble.push(arr[j]);
      j--;
    } else {
      waterArr[i] = 0;
      if (holdAble.length > 0)
        holdAble.forEach((child, index) => {
          res += arr[i] - child;
          waterArr[i - index - 1] = arr[i] - child;
        });
      i = j;
      j--;
      holdAble = [];
    }
  }
  waterArr[maxIndex] = 0;
  return res;
}

// get dom element
const submitBtn = document.querySelector(".submit");
const input = document.querySelector(".input");
const box = document.querySelector(".box");
const resultBox = document.querySelector(".result");

submitBtn.onclick = (e) => {
  e.preventDefault();
  handleSubmit(input.value);
};
function handleSubmit(value) {
  // delete previous value
  const elements = document.querySelectorAll(".element");
  elements.forEach((element) => {
    element.remove();
  });
  let arr = [];
  value.split(",").forEach((char) => {
    // generate array of elements
    if (char !== "") arr.push(parseInt(char));
    else arr.push(0);
  });
  let result = solve(arr);
  resultBox.innerText = `Result: ${result}`;
  arr.forEach((e, index) => {
    let newElem = document.createElement("div");
    newElem.className = "element";
    newElem.style.width = "20px";
    let newChildElem = document.createElement("div");
    newChildElem.style.width = "20px";
    newChildElem.style.height = "20px";
    newChildElem.style.background = "#AA4A44";
    newChildElem.style.margin = "4px";

    let waterElem = document.createElement("div");
    waterElem.style.width = "20px";
    waterElem.style.height = "20px";
    waterElem.style.background = "#1ca3ec";
    waterElem.style.margin = "4px";
    if (waterArr[index]) {
      let i = 0;
      while (i < waterArr[index]) {
        newElem.appendChild(waterElem.cloneNode(true));
        i++;
      }
    }
    let i = 0;
    while (i < e) {
      newElem.appendChild(newChildElem.cloneNode(true));
      i++;
    }

    box.appendChild(newElem);
  });
}
