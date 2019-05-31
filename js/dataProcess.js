fetch("http://ec2-54-84-4-117.compute-1.amazonaws.com:3000", {
  headers: {
    'Content-Type': 'application/json',
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
})
  .then(res => res.json())
  .then(data => {
    console.log(data)
  })





