function checkCashRegister(price, cash, cid) {
  let cashValues = {
    "ONE HUNDRED": 10000,
    "TWENTY": 2000,
    "TEN": 1000,
    "FIVE": 500,  
    "ONE": 100,
    "QUARTER": 25,
    "DIME": 10,
    "NICKEL": 5,
    "PENNY": 1
  }
  let cidObj = {
    "ONE HUNDRED": cid[8][1]*100,
    "TWENTY": cid[7][1]*100,
    "TEN": cid[6][1]*100,
    "FIVE": cid[5][1]*100,
    "ONE": cid[4][1]*100,
    "QUARTER": cid[3][1]*100,
    "DIME": cid[2][1]*100,
    "NICKEL": cid[1][1]*100,
    "PENNY": cid[0][1]*100,
  }  
  let change = [];
  let changeLeft = cash*100 - price*100;
  var index = 0;
  for(let bills in cashValues){
    while (changeLeft >= cashValues[bills] && cidObj[bills] >= cashValues[bills]){
      changeLeft -= cashValues[bills]
      if(change.length === 0){
        change.push([bills, cashValues[bills]/100])   
      }else if(change[index][0].indexOf(bills) != -1){
        change[index][1] += cashValues[bills]/100
      }else {
        change.push([bills, cashValues[bills]/100])
        index += 1
      }
        switch(bills) {
        case "PENNY":
        cidObj[bills] -= 1
        break;
        case "NICKEL":
        cidObj[bills] -= 5
        break;
        case "DIME":
        cidObj[bills] -= 10
        break;
        case "QUARTER":
        cidObj[bills] -= 25
        break;
        case "ONE":
        cidObj[bills] -= 100
        break;
        case "FIVE":
        cidObj[bills] -= 500
        break;
        case "TEN":
        cidObj[bills] -= 1000
        break;
        case "TWENTY":
        cidObj[bills] -= 2000
        break;
        case "ONE HUNDRED":
        cidObj[bills] -= 10000
        break;
      }
    }
  }
let cidTotal = 0;
let initialChange = cash*100 - price*100
for(let elem of cid){
  cidTotal += elem[1]*100
}
if(cidTotal === initialChange){
  let change = cid
  return {status: "CLOSED", change}
}
if(changeLeft > 0){
  return {status: "INSUFFICIENT_FUNDS", change: []}
}
  return {status: "OPEN", change: change};
}
