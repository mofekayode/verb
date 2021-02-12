
import './App.css';
import Sidebar from './Sidebar'
import Chat from './Chat'
import Header from './Header'
import Graph from './Graph'
import {BrowserRouter as Router, Switch,Route,Link }from 'react-router-dom'
import React,{useState, useEffect} from 'react'
import Login from'./Login'
import{ useStateValue} from './StateProvider'
import { Card, CardBody } from "reactstrap"
import ReactApexChart from "react-apexcharts"
import db from './firebase'
function App() {
  const [{user},dispatch]=useStateValue();
  const [graph,setgraph]=useState(false)
  const [graphinfo,setgraphinfro]=useState([])
  const [xasis,setxasis]=useState([])
  const [yasis,setyasis]=useState([])
  const showGraph=()=>{
    setgraph(true)
  }
  const noGraph=()=>{
    setgraph(false)
  }
  useEffect(() => {
    if(user)
        {db.collection('graph').doc(user?.uid).collection(user?.uid)
      .orderBy('timestamp','asc').onSnapshot(snapshot=>(
       
        seriesdata(snapshot)
      ))}
     
  }, [graph])
 

  const seriesdata=(snapshot)=>{
    setgraphinfro(snapshot.docs.map(doc=>doc.data()))
    let track1 =[]
    let track2 =[]
    snapshot.docs.map(doc=>doc.data()).forEach(element=>{
      track1.push(element.count)
      track2.push(element.mins+' mins')
    })
    setxasis(track1)
    setyasis(track2)
   
  }
 
  

  console.log('info',graphinfo)
  console.log('xasis',xasis)
  console.log('yasis',yasis)
  const wallet={
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: yasis
      },
      chart: {
        height: 950,
        type: "area",
        toolbar: {
          show: false,
        },
      },
     
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.45,
          opacityTo: 0.05,
          stops: [20, 100, 100, 100],
        },
      },
    
  
      markers: {
        size: 3,
        strokeWidth: 3,
  
        hover: {
          size: 4,
          sizeOffset: 2,
        },
      },
     
    
    },
    series: [
      {
        name: "messages",
      data: xasis
      }
    
    ]
  }
  return (
    
    <div className="app">
        <div className="header">
        <header className="app-header">
          <div onClick={noGraph} className='link'>
            <img src='https://media-exp1.licdn.com/dms/image/C4E0BAQFKdbBJ-9NRPA/company-logo_200_200/0/1553013203712?e=2159024400&v=beta&t=2NhOPVbgO3K8HZr_LSb9CISS5oSvma_lqvTTXb8Ghn0' className="WebLogo" alt="Website-logo" />
          </div>
          {/* <Link to='/'> */}
          <div onClick={showGraph} className='data'>Graph</div>
          {/* </Link> */}
          
      
        </header>
  
      </div>
     {!user?(<Login/>):(  
       
       
       <div style={{display:graph==true?'none':'flex'}}className="app-body">
  
      <Router>
      <Sidebar/>
        <Switch>
       
        <Route path="/rooms/:roomId">
            <Chat/>
          </Route>
          <Route path="/">
          <Chat/>
          </Route>
          <Route path="/graph">
          <Graph/>
          </Route>
          
        </Switch>
      </Router>
      
      </div > )}
      <div style={{display:graph==false?'none':'flex'}}>
            {/* <h1 style={{display:'flex',justifyContent:'center',alignItems:'center'}}> Messages over time</h1> */}
      <Card>
      <CardBody>
        <h4 className="card-title mb-3">Messages over time</h4>

        <div>
          <div className="apex-charts" id="area-chart" dir="ltr" >
            <ReactApexChart
              series={wallet.series}
              options={wallet.options}
              type="area"
              height={600}
              width={'100%'}
            />
          </div>
        </div>
      </CardBody>
    </Card>
      </div>
  
    </div>
  );
}

export default App;
