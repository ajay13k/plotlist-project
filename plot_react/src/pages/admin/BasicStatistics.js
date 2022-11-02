
import { 
  barChartDataDailyTraffic,
   barChartOptionsDailyTraffic,
    lineBarChartData,
     lineBarChartOptions,
      lineChartDataOverallRevenue,
      
       lineChartOptionsOverallRevenue, 
  
        pieChartData, pieChartOptions,
         polarChartDataCharts,
          polarChartOptionsCharts, 
          radarChartDataCharts,
           radarChartOptionsCharts } from "../admin/charts/chartData";
import {
    Box,
    Center,
    chakra,
    SimpleGrid,
    Spinner,
    Stat,
    StatLabel,
    StatNumber,
    useColorModeValue,
  } from '@chakra-ui/react';
import BarChart from './charts/barChart';
import LineBarChart from './charts/lineBarChart';
import PieChart from './charts/pieChart';
import RadarChart from './charts/redarChart';
import PolarChart from './charts/polarChart';
import LineChart from './charts/lineChart';
import React, { useEffect, useState } from 'react'
import AuthService from "../../services/AuthService";
  const BasicStatistics = () =>{
   const [loginToken,setLoginToken] = useState()
const [days,setDays] = useState();
const [daysData,setDaysData] = useState([]);
const [weekTotalListing,setWeekTotalListing] =useState();

const [months,setMonths]=useState();
const [monthsData,setMonthsData]=useState();
const[yearTotalListing,setYearTotalListing]=useState();

const [hours,setHours]=useState();
const [hoursData,setHoursData]=useState();
const[dayTotalListing,setdayTotalListing]=useState();
const [loading , setLoading]=useState(true);

var weekListingCount = 0 ; 
var yearListingCount = 0 ; 
var dayListingCount = 0 ; 
useEffect(()=>{
      const loginuserToken = JSON.parse(localStorage.getItem('loginToken'));
       setLoginToken(loginuserToken?.token);
       graphData()
   },[loginToken]);


  const graphData = async()=>{
       setLoading(true);
    const data = await AuthService.graph(loginToken) ;
    console.log(data.data.dayGraph)
    for(var i=0 ; i < data.data.weekGraph.data.length ; i++){
        weekListingCount= weekListingCount+ data.data.weekGraph.data[i]
    }
    for(var j=0 ; j < data.data.yearGraph.data.length ; j++){
      yearListingCount= yearListingCount+ data.data.yearGraph.data[j]
  }
  for(var k=0 ; k < data.data.dayGraph.data.length ; k++){
    dayListingCount= dayListingCount+ data.data.dayGraph.data[k]
}
  console.log(dayListingCount)
   setWeekTotalListing(weekListingCount);
   setYearTotalListing(yearListingCount);
   setdayTotalListing(dayListingCount);
    setDays( 
      {
      chart: {
        toolbar: {
          show: false
        },
        dropShadow: {
          enabled: true,
          top: 13,
          left: 0,
          blur: 10,
          opacity: 0.1,
          color: "#4318FF"
        }
      },
      colors: ["#4318FF"],
      markers: {
        size: 0,
        colors: "white",
        strokeColors: "#4318FF",
        strokeWidth: 1,
        strokeOpacity: 0.9,
        strokeDashArray: 0,
        fillOpacity: 1,
        discrete: [],
        shape: "circle",
        radius: 2,
        offsetX: 0,
        offsetY: 0,
        showNullDataPoints: true
      },
      tooltip: {
        theme: "dark"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth",
        type: "gradient"
      },
      xaxis: {
        categories: data.data.weekGraph.days,
        labels: {
          style: {
            colors: "#A3AED0",
            fontSize: "14px",
            fontWeight: "500"
          }
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        show: false
      },
      legend: {
        show: false
      },
      dropShadow: {
        enabled: true,
        top: 0,
        left: 0,
        blur: 3,
        opacity: 0.5
      },
      grid: {
        show: false,
        column: {
          colors: ["transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      }
    });
    setDaysData([
      {
        name: "Listing",
        data:data.data.weekGraph.data
      }
    ]);


    setMonths(
      {
      chart: {
        toolbar: {
          show: false
        }
      },
      tooltip: {
        theme: "dark"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "datetime",
        categories: data.data.yearGraph.months,
        labels: {
          style: {
            colors: "#CBD5E0",
            fontSize: "12px"
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: "#A3AED0",
            fontSize: "12px",
            fontWeight: "500"
          }
        }
      },
      legend: {
        show: false
      },
      grid: {
        strokeDashArray: 5,
        yaxis: {
          lines: {
            show: true
          }
        },
        xaxis: {
          lines: {
            show: true
          }
        }
      },
      fill: {
        type: "solid",
        gradient: {
          type: "vertical",
          shadeIntensity: 0.5,
          gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
          inverseColors: true,
          opacityFrom: 0.8,
          opacityTo: 0,
          stops: []
        },
        colors: ["#000000", "#3182CE"]
      },
      plotOptions: {
        bar: {
          borderRadius: 2,
          columnWidth: "8px"
        }
      },
      colors: ["#000000", "#3182CE"]
    });
    setMonthsData(
      [
      {
        name: "listing",
        type: "line",
        data: data.data.yearGraph.data
      },
      // {
      //   name: "sales",
      //   type: "line",
      //   data: [232, 421, 352, 273, 143, 222, 173, 311]
      // }
    ])

  setHours(
    {
      chart: {
        toolbar: {
          show: false
        },
        dropShadow: {
          enabled: true,
          top: 13,
          left: 0,
          blur: 10,
          opacity: 0.1,
          color: "#4318FF"
        }
      },
      colors: ["#4318FF", "#39B8FF"],
      markers: {
        size: 0,
        colors: "white",
        strokeColors: "#7551FF",
        strokeWidth: 3,
        strokeOpacity: 0.9,
        strokeDashArray: 0,
        fillOpacity: 1,
        discrete: [],
        shape: "circle",
        radius: 2,
        offsetX: 0,
        offsetY: 0,
        showNullDataPoints: true
      },
      tooltip: {
        theme: "dark"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth",
        type: "line"
      },
      xaxis: {
        type: "numeric",
        categories: data.data.dayGraph.time,
        labels: {
          style: {
            colors: "#A3AED0",
            fontSize: "5px",
            fontWeight: "100"
          }
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        show: false
      },
      legend: {
        show: false
      },
      grid: {
        show: false,
        column: {
          color: ["#7551FF", "#39B8FF"],
          opacity: 0.5
        }
      },
      color: ["#7551FF", "#39B8FF"]
    }
  );
  setHoursData(
    [
    {
      name: "Listing",
      data: data.data.dayGraph.data
    },
    // {
    //   name: "sales",
    //   data:[
    //     0,
    //     0,
    //     0,
    //     0,
    //     0,
    //     0,
    //     0,
    //     0,
    //     0,
    //     0,
    //     6,
    //     0,
    //     4,
    //     0,
    //     0,
    //     0,
    //     0,
    //     0,
    //     0,
    //     0,
    //     0,
    //     0,
    //     0
    // ]
    // }
  ]);
setLoading(false)

  }


return (
      <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
       <Stat
        px={{ base: 4, md: 8 }}
        py={'10'}
        shadow={'xl'}
        border={'1px solid'}
        borderColor={useColorModeValue('gray.800', 'gray.500')}
        rounded={'lg'}
        
        >
        <StatLabel fontWeight={'medium'} isTruncated>
         Week
        </StatLabel>
        <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
         {weekTotalListing} Listing
        </StatNumber>
      {loading ? <Center><Spinner size='xl' /></Center> : days &&  daysData && <BarChart chartData={daysData} chartOptions={days}/>}  
      </Stat>
      <Stat
        px={{ base: 4, md: 8 }}
        py={'5'}
        shadow={'xl'}
        border={'1px solid'}
        borderColor={useColorModeValue('gray.800', 'gray.500')}
        rounded={'lg'}>
        <StatLabel fontWeight={'medium'} isTruncated>
         Year
        </StatLabel>
        <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
       {yearTotalListing} Listing
        </StatNumber>
          { loading ? <Center><Spinner size='xl' /></Center> : months && monthsData && <LineBarChart chartData={monthsData}chartOptions={months}/>}  
      </Stat>
      <Stat
        px={{ base: 4, md: 8 }}
        py={'5'}
        shadow={'xl'}
        border={'1px solid'}
        borderColor={useColorModeValue('gray.800', 'gray.500')}
        rounded={'lg'}>
        <StatLabel fontWeight={'medium'} isTruncated>
         Day
        </StatLabel>
        <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
        {dayTotalListing} Listing
        </StatNumber>
        {/* <PieChart
                chartData={pieChartData}
                chartOptions={pieChartOptions}
              /> */}
                {/* <RadarChart
                chartData={radarChartDataCharts}
                chartOptions={radarChartOptionsCharts}
              /> */}
                {/* <PolarChart
                chartData={polarChartDataCharts}
                chartOptions={polarChartOptionsCharts}
              /> */}
              {loading ? <Center><Spinner size='xl' /></Center> : hours && hoursData &&  <LineChart chartData={hoursData} chartOptions={hours}/>}
      </Stat>
        </SimpleGrid>
      </Box>
    );
  }

export default BasicStatistics