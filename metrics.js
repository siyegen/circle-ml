var restler = require('restler');
var jsdom = require('jsdom');
var fs = require('fs');
var jquery = fs.readFileSync('./jquery-1.7.2.min.js').toString();
var sites = ['stackoverflow.com', 'google.com', 'sendgrid.com', 'github.com', 'arstechnica.com'];
//var sites = ['stackoverflow.com'];
var url = require('url');

function process_sites(items, callback) {
  var todo = items.concat();

  var current = todo.shift();
  process.nextTick(function () {
    callback(current);
  });

  if (todo.length > 0) {
    process.nextTick(function() {
      process_sites(todo, callback);
    });
  }
}

function get_site(site) {
  restler.get('http://' + site).on('complete', function(data) {
    log_data(data, site);
  });
}

function log_data(data, site) {
  jsdom.env({
    html: data,
    src: [jquery],
    done: function(err, window, undefined) {
      var $ = window.$;
      var everything = $('*');
      var keys = [];
      var element_count = {};

      everything.each(function(index) {
        var element_name = $(this).prop('tagName').toLowerCase();
        var key = element_count[element_name];
        if(key === undefined) {
          keys.push(element_name);
          element_count[element_name] = 1;
        } else {
          element_count[element_name] = key + 1;
        }
      });
      keys.sort();
      var formatted_results = [];

      console.log("site: " + site);
      keys.forEach(function(key) {
        var obj = {};
        obj.element = key;
        obj.count = element_count[key];
        formatted_results.push(obj);
        console.log("\t%s: %s", key, element_count[key]);
      });
      console.log(JSON.stringify(formatted_results));
    }
  });
}

process_sites(sites, get_site);
