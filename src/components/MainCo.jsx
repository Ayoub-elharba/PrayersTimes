// import React from 'react'
import Grid from '@mui/material/Unstable_Grid2';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Prayer from './Prayer';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';
import { useState ,useEffect } from 'react';
import Ma from './ma.json';
import moment from 'moment';
import 'moment/dist/locale/ar-ma';
moment.locale("ar");


import dohr from '../photos/4.png';
import fajr from '../photos/1.png';
import asrr from '../photos/5.png';
import isha from '../photos/3.png';
import mughr from '../photos/2.png';


export default function MainCo() {
    
    const [timings ,setTimings]= useState({});
    const [SelectedCity, setSelect]=useState('Safi');
    const [today, setToday]=useState("");
    // const [timer, setTimer]=useState(10);
    const [nextprayertimer,setNextprayer]=useState(0)
    const [remaingT ,setRemainigT]=useState('');

    const prayersArray=[
        {
            key:"Fajr", displayName:"الفجر"
        },
        {
            key:"Dhuhr", displayName:"الظهر"
        },
        {
            key:"Asr", displayName:"العصر"
        },
        {
            key:"Maghrib", displayName:"المغرب"
        },
        {
            key:"Isha", displayName:"العشاء"
        },

    ]

    const getTiming = async ()=>{
    const res= await axios.get(`https://api.aladhan.com/v1/timingsByCity/09-10-2023?country=MA&city=${SelectedCity}`)
        console.log('infos=>>>>' ,res.data.data.timings);
        setTimings(res.data.data.timings)
    }
    useEffect(()=>{

        getTiming()
        
        
    },[SelectedCity]);

    useEffect(()=> {
        let interval = setInterval(()=>{
            // setTimer((t)=>{
            //     return t-1;
            // })

            setupCountDownTimer();
        }, 1000)

        const t = moment()
        setToday(t.format("MMM Do YYYY | h:mm"));

        return()=>{
            clearInterval(interval)
        }
    },[timings])

    const setupCountDownTimer = () =>{
        const momentNow= moment()
        let prayerIndex =1;

        if(momentNow.isAfter(moment(timings["Fajr"],"hh:mm")) && momentNow.isBefore(moment(timings["Dhuhr"],"hh:mm"))){
            prayerIndex=1
        }else if (momentNow.isAfter(moment(timings["Dhuhr"],"hh:mm")) && momentNow.isBefore(moment(timings["Asr"],"hh:mm"))){
            prayerIndex=2
        }else if (momentNow.isAfter(moment(timings["Asr"],"hh:mm")) && momentNow.isBefore(moment(timings["Maghrib"],"hh:mm"))){
            prayerIndex=3
        }else if (momentNow.isAfter(moment(timings["Maghrib"],"hh:mm")) && momentNow.isBefore(moment(timings["Isha"],"hh:mm"))){
            prayerIndex=3
        }else {
            prayerIndex=0
        }

        setNextprayer(prayerIndex)

        // now after knowing 

        const nextPrayerObject = prayersArray[prayerIndex]
        const nextPrayerTimer = timings[nextPrayerObject.key]
        const nextPrayerTimerMoment=moment(nextPrayerTimer, "hh:mm");

        let remainingTime=moment(nextPrayerTimer, "hh:mm").diff(momentNow);

        if(remainingTime < 0){
            const midnightDiff=moment("23:59:59","hh:mm:ss").diff(momentNow);
            const fajrmidnightdiff= nextPrayerTimerMoment.diff(moment("00:00:00","hh:mm:ss"));
            const totalDiffrence=midnightDiff+fajrmidnightdiff;
            remainingTime = totalDiffrence

        }

        const durationRemainingTime=moment.duration(remainingTime)

        setRemainigT(`${durationRemainingTime.seconds()} : ${durationRemainingTime.minutes()} : ${durationRemainingTime.hours()}`)

        // const Isha = timings["Isha"];
        // const IshaMoment =moment(Isha, "hh:mm")

    }

    const handleChange = (event) => {
        console.log(event.target.value);
        console.log('value is',event.target.value);
        setSelect(event.target.value)
        

      };
  return (
    <div>
        { /* Row */  } 

        <Grid container marginRight={'50px'}>

            <Grid xs={5}>
                <div>
                    <h2 style={{color:' #0073ff'}}>{today}</h2>
                    <h1 style={{color:' #000000'}}>{SelectedCity}</h1>
                </div>
            </Grid>

            <Grid xs={3}>
                <div>
                    <h2   style={{color:' #ff0000'}}>  متبقي لصلاة {prayersArray[nextprayertimer].displayName}</h2>
                    <h1 style={{color:' #000000'}}>{remaingT}</h1>
                </div>
            </Grid>

            <Grid xs={4}>
                
                     {/*Select city*/}
                    <Stack direction='row' justifyContent={"center"} style={{marginTop:'40px'}}>
                    <FormControl style={{width:'50%'}}>
                    <InputLabel id="demo-simple-select-label">المدينة</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    
                        label="Age"
                    onChange={handleChange}
            >
            {
            
                Ma.map(e => <MenuItem key={e.lat} value={e.city}>{e.city} </MenuItem> )
            }
          
          {/* <MenuItem value={{
            displayName:'طنجة',
            apiName:'Tanger'
    }}>طنجة</MenuItem>
          <MenuItem value={{
            displayName:'الرباط',
            apiName:'Rabat'
            }}>الرباط</MenuItem>
          <MenuItem value={{
            displayName:'اسفي',
            apiName:'Safi'
            }}>اسفي</MenuItem> */}


                </Select>
            </FormControl>
                </Stack>
        {/*F-Select city*/}
                
            </Grid>

        </Grid>
        {/*Row f*/}

        <Divider/>

        {/*Cards */}
        <Stack direction='row' justifyContent={'space-around'} style={{marginTop:'50px'}}>
            <Prayer name="الفجر" time= {timings.Fajr} image={fajr}/>
            <Prayer name="الظهر"  time= {timings.Dhuhr} image={dohr}/>
            <Prayer name="العصر"  time= {timings.Asr} image={asrr}/>
            <Prayer name="المغرب"  time= {timings.Maghrib} image={mughr}/>
            <Prayer name="العشاء"  time= {timings.Isha} image={isha}/>

        </Stack>
        {/*F-cards*/}

      



    </div>
  )
}
