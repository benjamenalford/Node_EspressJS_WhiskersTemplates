// declare a string
var s = "1 dose daily1 dose daily"
console.log(s)
console.log(s.length)
console.log(s.length / 2)
    // use the substring function to get the first half of the string
console.log(s.substr(0, s.length / 2))
    // use the substring function to get the second half
console.log(s.substr(s.length / 2, s.length))

//combine it and test to see if they are the same
if (s.substr(0, s.length / 2) == s.substr(s.length / 2, s.length)) {
    console.log("string is repeated")
}