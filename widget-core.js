(function (global, $, factory) {
  global = factory.call(global, $);
})(window, $, function ($) {
  var R = {};

  R.Event = function (props) {
    if (!(this instanceof $$.Event)) return new $$.Event(props);
    this.oldValue = null;
    this.newValue = null;
    this.element = null;
    this.params = {};
    $.extend(this, props);
  };

  R.trigger = function (type, el, args) {
    var event = $.Event(type, args);
    el.trigger(event, args);
  };

  R.isNumber = function (target) {
    var regex = /^[+]{0,1}(\d+)$/;
    if (regex.test(target)) return true;
    else return false;
  };

  R.isBool = function (target) {
    var container = [true, false];
    return (container.includes(target));
  }

  R.isArray = function (target) {
    return $.isArray(target);
  }

  //防抖
  R.debounce = function (fn, delay) {
    var timer,
      self = this;
    return function (e) {
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(self, [e]);
      }, delay);
    };
  };

  //节流
  R.throttle = function () {

  }





  R.generateRows = function (num) {
    var arr = [];
    for (var i = 0; i < (num || 1); i++) {
      arr.push(R.generateRow());
    }
    return arr;
  }
  //随机生成一行数据
  R.generateRow = function () {
    var
      firstNames = ["Andrew", "Nancy", "Shelley", "Regina", "Yoshi", "Antoni", "Mayumi", "Ian", "Peter", "Lars", "Petra", "Martin", "Sven", "Elio", "Beate", "Cheryl", "Michael", "Guylene"],
      lastNames = ["adams", "anderson", "arnold", "baker", "bell", "campbell", "carter", "cecil", "charles", "christian", "dale", "david", "clark", "clive", "cook", "duncan", "eddy", "edward", "evelyn", "fergus", "garcia", "gary", "george", "gerard", "giles", "green", "griffin", "hall", "harris", "hill", "jackson", "james", "ja", "joyce", "keith", "kirk", "lee", "leonard", "leslie", "lester", "lewis", "may", "murphy", "nelson", "oliver", "owen", "percy", "peters", "quick", "raphael", "rodney", "rose", "rupert", "scott", "shelley", "smith", "taylor", "tuener", "walker", "warren", "williams"],
      productNames = ["Black Tea", "Green Tea", "Caffe Espresso", "Doubleshot Espresso", "Caffe Latte", "White Chocolate Mocha", "Cramel Latte", "Caffe Americano", "Cappuccino", "Espresso Truffle", "Espresso con Panna", "Peppermint Mocha Twist"],
      priceValues = ["2.25", "1.5", "3.0", "3.3", "4.5", "3.6", "3.8", "2.5", "5.0", "1.75", "3.25", "4.0"],
      colors = ["#0066FF", "#009966", "#990000", "#CC6633", "#CCCCFF", "#FF9900", "#FFFF33", "#66CCFF"],
      complexs = [{
        name: "apple",
        value: 0,
        box: {
          x: 100,
          y: 100
        },
        test: [{ x: 100 }, { x: 1000 }]
      }, {
        name: "pear",
        value: 0,
        box: {
          x: 10000,
          y: 10000
        },
        test: [{ x: 3000 }]
      }, {
        name: "banana",
        value: 0,
        box: {
          x: 7654321,
          y: 7654321
        },
        test: [{ x: 1001 }, { x: 1000 }, { x: 11111 }, { x: 78122 }]
      }, {
        name: "peach",
        value: 0,
        box: {
          x: 1,
          y: 1
        },
        test: [{ x: 6897946 }]
      }],
      row = {},
      productindex = Math.floor(Math.random() * productNames.length),
      price = parseFloat(priceValues[productindex]),
      quantity = 1 + Math.round(Math.random() * 10),
      tasks = [
        [],
        [{ name: "IITS-Training one" }],
        [],
        [{ name: "IITS-Training two" }],
        [],
        [{ name: "DBP迭代会" }],
        [{ name: "交互设计讨论" }],
        [],
        [{ name: "IITS-Training one" }, { name: "IITS-Training two" }, { name: "DBP迭代会" }, { name: "交互设计讨论" }, { name: "法国饮食文化变迁讨论" }, { name: "如何挑选一款好的奶酪" }],
        [{ name: "IITS-Training one" }, { name: "IITS-Training two" }, { name: "DBP迭代会" }, { name: "交互设计讨论" }],
        [{ name: "IITS-Training one" }, { name: "交互设计讨论" }, { name: "法国饮食文化变迁讨论" }, { name: "如何挑选一款好的奶酪" }],
        [],
        [{ name: "法国饮食文化变迁讨论" }, { name: "如何挑选一款好的奶酪" }],
        [],
        [{ name: "IITS-Training one" }, { name: "DBP迭代会" }, { name: "交互设计讨论" }, { name: "法国饮食文化变迁讨论" }, { name: "如何挑选一款好的奶酪" }]
      ],
      //detail
      titles = ["Sales Representative", "Vice President, Sales", "Sales Representative", "Sales Representative", "Sales Manager", "Sales Representative", "Sales Representative", "Inside Sales Coordinator", "Sales Representative"],
      hiredate = ["01-May-92", "14-Aug-92", "01-Apr-92", "03-May-93", "17-Oct-93", "17-Oct-93", "02-Jan-94", "05-Mar-94", "15-Nov-94"],
      postalcode = ["98122", "98401", "98033", "98052", "SW1 8JR", "EC2 7JR", "RG1 9SP", "98105", "WG2 7LT"],
      country = ["USA UK GER", "CN", "USA UK", "USA UK GER", "USA UK GER CN", "USA CN", "UK", "USA", "UK"];

    row["isChecked"] = (productindex % 2 == 0) ? true : false;
    row["firstName"] = firstNames[Math.floor(Math.random() * firstNames.length)];
    row["lastName"] = lastNames[Math.floor(Math.random() * lastNames.length)];
    row["productName"] = productNames[productindex];
    row["price"] = price;
    row["quantity"] = quantity;
    row["total"] = price * quantity;

    //detail
    row["title"] = titles[Math.floor(Math.random() * titles.length)];
    row["hiredate"] = hiredate[Math.floor(Math.random() * hiredate.length)];
    row["postalcode"] = postalcode[Math.floor(Math.random() * postalcode.length)];
    row["country"] = country[Math.floor(Math.random() * country.length)];
    row["color"] = colors[Math.floor(Math.random() * colors.length)];
    row["task"] = tasks[Math.floor(Math.random() * tasks.length)];
    row["complex"] = complexs[Math.floor(Math.random() * complexs.length)];
    //
    switch (Math.floor(Math.random() * 5)) {
      case 1:
        row["message"] = '<div style="color:#0094ff">Title: ' + row["title"] + "</br> Hiredate: " + row["hiredate"] + "</br> Postalcode: " + row["postalcode"] + "</br> Country: " + row["country"] + '</div>';
        break;
      case 2:
        row["message"] = '<div style="color:chocolate">Title: ' + row["title"] + "</br> Hiredate: " + row["hiredate"] + "</br> Postalcode: " + row["postalcode"] + '</div>';
        break;
      case 3:
        row["message"] = '<div style="color:#4800ff">Title: ' + row["title"] + "</br> Hiredate: " + row["hiredate"] + '</div>';
        break;
      case 4:
        row["message"] = '<div style="color:red">Title: ' + row["title"] + '</div>';
        break;
      default:
        row["message"] = "This guy is lazy, nothing left";
    }

    return row;
  }

  window.R = window.$$ = R;
});
