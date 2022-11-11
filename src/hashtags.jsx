import React , {useEffect, useState} from 'react'
import JsonData from './data.json'
import axios from 'axios';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';  


const JsonDataDisplay = () => {
           
        const [data, setData] = useState([]);
        useEffect(()=> {
            axios.get("https://alivecore360.com/api/stats/v5?key=15d273cc-0b8a-4460-9cd8-55fa55a3e1c1&lang=en&optional_connectors=livesearch&Twitter_handler=hsbc_uk&days=2&type=sentiment,hashtags&interval=day").then(
              responce => {console.log(responce.data.stats.twitter.timelineStats.timeline);
              setData(responce.data.stats.twitter.timelineStats.timeline)
                    
        }
            )
    },[]) 
  return(
	 <div className="App">
      <table  id="dateSen" class="table">
        <tr>
          <th>Date</th><br />
          <th>positiveExternalTweets</th><br />
          <th>neutralExternalTweets</th><br />
          <th>negativeExternalTweets</th><br />
        </tr>
        {
          data.map((val, key) => {
            return (
              
              <tr key={key}>
                <td>{val.date}</td><br />
                <td>{val.sentimentAsCategories.positiveExternalTweets}</td><br />
                <td>{val.sentimentAsCategories.neutralExternalTweets}</td><br />
                <td>{val.sentimentAsCategories.negativeExternalTweets}</td><br />
              </tr>
              
            )
          })}

       </table>
       <div>  
           <ReactHTMLTableToExcel  
                                  table="dateSen"  
                                                filename="SentCategories"  
                                                sheet="SentCategories"  
                                                buttonText="Export excel" />  
     </div>

    </div>

  );

	
}

export default JsonDataDisplay;
