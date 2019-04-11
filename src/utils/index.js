export default {
  randKey(size = 6) {
    let seed = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','m','n','p','Q','r','s','t','u','v','w','x','y','z','2','3','4','5','6','7','8','9'];
    let seedlength = seed.length;
    let createPassword = '';
    for (let i = 0; i < size; i++) {
      let j = Math.floor(Math.random() * seedlength);
      createPassword += seed[j];
    }
    return createPassword;
  },
  formatMoney(val, dotLength = 2) {
    var str = val.toFixed(dotLength);
    var intSum = str.substring(0, str.indexOf('.')).replace(/\B(?=(?:\d{3})+$)/g, ',');
    var dot = str.substring(str.length, str.indexOf('.'));
    return intSum + dot
  },
  formatMobile(mobile) {
    if (!mobile) return
    return `${mobile.substring(0, 3)}***${mobile.substr(-4)}`;
  },
  getQuery(str = location.search) {
    if (str.indexOf('?') == 0) str = str.substr(1);
    let arr = str.split("&");
    let res = {};
    for (let i = 0 ; i < arr.length; i++) {
      let num = arr[i].indexOf('='); 
      if (num > 0) {
        let name = arr[i].substring(0, num);
        let value = arr[i].substr(num + 1);
        res[name] = value;
       }
    }
    return res;
   }
}
