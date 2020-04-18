'use strict';
let axios = require('axios');
let httpUrl = 'https://api.apiopen.top/getJoke';
// var options1 = {
//   page: 1,
//   count: 10,
//   type: "text"
// }
// var options2 = {
//   page: 1,
//   count: 10,
//   type: "image"
// }
// var options3 = {
//   page: 1,
//   count: 10,
//   type: "video"
// }

exports.main = async (data) => {
    console.log(data)
    let result = await axios.get(httpUrl,{params:data})
    return result.data;
};
