# REST-API-Challenge
Build a simple REST-API with Node.js


```javascript
function formatDate(str){
	const splitedDate = str.split(/\//);
	const formatedDate = [splitedDate[1], splitedDate[0], splitedDate[2]].join('/');
  return formatedDate;
}

const birthdate = formatDate('10/06/1958');
const date = new Date() - new Date(birthdate);

function msToYear(ms){
    const year = Math.floor(ms / 31536000000);
    return year;
}

const age = msToYear(date);
