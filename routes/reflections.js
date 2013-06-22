
/*
 * REFLECTIONS
 */

exports.fetch = function(req, res, next){
  var jsdom = require("jsdom");

  jsdom.env(
    "http://baptist.sk/chlieb-nas-kazdodenny",
    ["http://code.jquery.com/jquery.js"],
    function (errors, window) {
      var $ = window.$;

      var articleDOM = window.$(".mainbody table div");
      var html = $(articleDOM[0]).html();

      var strdate = $($(articleDOM[0]).find('strong')[0]).text().replace(/(\s)/g, ' ').trim();
      var title = $($(articleDOM[0]).find('strong')[1]).text().replace(/(\s)/g, ' ').trim();
      var thought = $($(articleDOM[0]).find('strong')[2]).text().replace(/(\s)/g, ' ').trim();

      console.log(html);
      console.log(strdate);
      console.log(title);
      console.log(thought);

      if (req && res) {
        res.send(200);
      }
    }
  );
};