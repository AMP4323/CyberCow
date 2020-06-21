const userAction = async () => {
  const response = await fetch('http://172.22.29.86:5000/model');
  const myJson = await response.json(); //extract JSON from the http response
  // do something with myJson
  console.log(myJson);
}
userAction();