jwt = require('jsonwebtoken');


console.log(new Date(1000*1599976613))

var token = jwt.decode("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1OTk5NzU3MTMsIm5iZiI6MTU5OTk3NTcxMywianRpIjoiZWY1NjVkMGItMjQ1Mi00MDk1LTgwYWUtZDZjMDk3NTkzZjNkIiwiZXhwIjoxNTk5OTc2NjEzLCJpZGVudGl0eSI6MSwiZnJlc2giOnRydWUsInR5cGUiOiJhY2Nlc3MifQ.YSqEiS7DJc10uX7liVOxwxelyX8CAiVhFT0GOXZ4gKU");

console.log(JSON.stringify(token));