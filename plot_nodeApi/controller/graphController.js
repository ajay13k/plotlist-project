const date = require("date-and-time");
const Listing = require("../model/listingModel");
exports.graph = async (req, res) => {
  try {
    var days = [];
    var dates = [];
    var weekData = [];
    var weekGraph = {};

    var hours = [];
    //find the cuurent week dates
    let week = Array.from(Array(7).keys()).map((idx) => {
      const d = new Date();
      d.setDate(d.getDate() - d.getDay() + idx);
      return d;
    });
    // based on date find the listing and count
    for (var i = 0; i < week.length; i++) {
      var today = date.format(week[i], "YYYY-MM-DD");
      var dayviceData = await Listing.find({
        postedDate: new Date(today),
        isDeleted: 0,
      });
      weekData.push(dayviceData.length);
      dates.push(date.format(week[i], "YYYY-MM-DD"));
      days.push(week[i].toLocaleDateString("en-US", { weekday: "short" }));
    }
    weekGraph={
      days: days,
      dates: dates,
      data: weekData,
    };

    // week logic end

    //year start
    var month = [];
    var monthNames = [...Array(12).keys()].map((key) =>
      new Date(0, key).toLocaleString("en", { month: "short" })
    );
    var toDay = new Date();
    var a;
    var lastAndFirstDateOfMonth = [];
    var years = [];
    var months = [];
    var monthVoiceData = [];
    var yearGraph = {};
    for (var i = 12; i > 0; i -= 1) {
      a = new Date(toDay.getFullYear(), toDay.getMonth() - i, 1);
      month.push(monthNames[a.getMonth()]);
      lastAndFirstDateOfMonth.push({
        firstdate: firstDateOfMonth(toDay.getFullYear(), a.getMonth()),
        lastdate: LastDateOfMonth(toDay.getFullYear(), a.getMonth()),
      });
      //  console.log("first date of month ",firstDateOfMonth(toDay.getFullYear(),a.getMonth()))
      //  console.log("last date of month ",LastDateOfMonth(toDay.getFullYear(),a.getMonth()))
    }
    for (var j = 0; j < lastAndFirstDateOfMonth.length; j++) {
      var f = date.format(lastAndFirstDateOfMonth[j].firstdate, "YYYY-MM-DD");
      var l = date.format(lastAndFirstDateOfMonth[j].lastdate, "YYYY-MM-DD");
      var monthData = await Listing.find({
        postedDate: {
          $gte: new Date(f),
          $lt: new Date(l),
        },
        isDeleted: 0,
      });
      // months.push(
      //   `${
      //     monthNames[lastAndFirstDateOfMonth[j].lastdate.getMonth()]
      //   } ${lastAndFirstDateOfMonth[j].lastdate.getFullYear()}`
      // );
      months.push(
        `${
          monthNames[lastAndFirstDateOfMonth[j].lastdate.getMonth()]
        }`
      );
      //years.push(lastAndFirstDateOfMonth[j].lastdate.getFullYear());
      monthVoiceData.push(monthData.length);
      //console.log(monthNames[lastAndFirstDateOfMonth[j].lastdate.getMonth()],"==>",lastAndFirstDateOfMonth[j].lastdate.getFullYear()," listing ==>",monthData.length)
    }
    yearGraph={
      months: months,
      data: monthVoiceData,
    };
    // year end

    // day start
    var DateTimeArray = []; // Results will go here
    var hours = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
    ];
    var endHourTime;
    var startHourTime;
    var dayGraph = {} ;
    var time = [];
    var data = [];
    for (var i = 0; i < 24; i++) {
      //console.log(`${i} before ${hours[i]} hour time was => `,new Date(toDay.getTime() - (hours[i]*1000*60*60)) ,"current time is ==>",new Date(toDay.getTime()))
      DateTimeArray.push(new Date(toDay.getTime() - hours[i] * 1000 * 60 * 60));
    }
    result = DateTimeArray.slice(1).map((a, i, aa) => [
      i ? aa[i - 1] : DateTimeArray[0],
      a,
    ]);

    for (var j = 0; j < result.length; j++) {
      // console.log(result[j][0], result[j][1],"currr  => ",currentHour , currentHour.toLocaleTimeString());
      endHourTime = result[j][0];
      startHourTime = result[j][1];
      var dayData = await Listing.find({
        createdAt: {
          $gte: startHourTime, // 8
          $lt: endHourTime, // 9
        },
        isDeleted: 0,
      });
     // console.log(result[j][1].toLocaleTimeString() , " between  ",result[j][0].toLocaleTimeString() , " listing added ",dayData.length);
      time.push(`${result[j][1].toLocaleTimeString()} - ${result[j][0].toLocaleTimeString()}`);
      //  time.push(`${result[j][0].toLocaleTimeString()}`);
       
       data.push(dayData.length);
  
    }
    dayGraph={
      time: time ,
      data : data
    };
    res.status(200).send({dayGraph, weekGraph ,yearGraph});
  } catch (error) {
    res.status(400).send({
      message: "Oops! something went wrong in fetching graph data",
      SubError: error.message,
    });
  }
};

function LastDateOfMonth(Year, Month) {
  return new Date(Year, Month, 0);
}
function firstDateOfMonth(Year, Month) {
  return new Date(Year, Month - 1, 1);
}
