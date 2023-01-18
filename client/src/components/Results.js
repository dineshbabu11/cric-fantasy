import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {Grid} from '@material-ui/core'
import '../App.css'

const Results = () => {

  const [userData, setUserData] = useState([0])
  
  let matches, highest, match, high, high_wickets, high_scores, mom, winner, display, total
  let index

  const navigate = useNavigate()


  
    const fetchData = async () => {
      let displayList = []
      try{

        const res = await fetch('/userSelected', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json'
          },
          credentials: 'include'
        })
  
        const data = await res.json() 
  
        matches = data["matches"]
        highest = data["highest"]  
        
        index = 0
        
        matches.map(() => {
          total = 0
          match = matches[index]
          if(highest.length > 0){
            high = highest[index]
            high_wickets = high.high_wickets.map((player) => {
              return(player[1])
            })
            high_scores = high.high_scores.map((player) => {
              return(player[1])
            })
    
            display = {matchid : match.matchid}
    
            if(high_scores.indexOf(match.batsman) > -1 ){
              display["batsman"] = match.batsman + "--" + 2
              total = total + 2
            } else {
              display["batsman"] = match.batsman + "--" + 0
            }
            if(high_wickets.indexOf(match.bowler) > -1 ){
              display["bowler"] = match.bowler + "--" + 2
              total = total + 2
            } else {
              display["bowler"] = match.bowler + "--" + 0
            }
            if(high.mom['data'] == match.mom ){
              display["mom"] = match.mom + "--" + 2
              total = total + 2
            } else {
              display["mom"] = match.mom + "--" + 0
            }
            if(high.winner == match.team ){
              display["winner"] = match.team + "--" + 2
              total = total + 2
            } else {
              display["winner"] = match.team + "--" + 0
            }
            display["total"] = total
            index = index + 1
            displayList = displayList.concat(display)

          }
          
          
      })

      // data1.displayList = displayList
  
      setUserData(displayList)
      
  
      } catch(error) {
        console.log(error)
        navigate('/')
      }

    }

    useEffect(() => {
      fetchData()
    }, [userData])
    


  let userData1 = [] 
  
  
  return(
    
    <div className="App">
    <h1>Points Table</h1>
    <table>
      <thead>
        <tr>
          <th>MatchId</th>
          <th>Batsman</th>
          <th>Bowler</th>
          <th>Man of Match</th>
          <th>Winning Team</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        {userData.map((value, key)=> {
          return (
            <tr key={key}>
              <td>{value.matchid}</td>
              <td>{value.batsman}</td>
              <td>{value.bowler}</td>
              <td>{value.mom}</td>
              <td>{value.winner}</td>
              <td>{value.total}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
    {userData.length == 0 && <h1>First match complete ayyaka chudara rey results</h1>}
  </div>
                   
        
    
    
  )
}

export default Results