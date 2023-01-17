import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Grid} from '@material-ui/core'
import ReactTable from "react-table"

const Results = () => {

    const [scores, setScores] = useState(0)
    const navigate = useNavigate()
    const test = []

    const columns = [{
              Header: 'Match',
              accessor: 'matchid'
            },
            {
              Header: 'Batsman',
              accessor: 'batsman'
            },
            {
              Header: 'Bowler',
              accessor: 'bowler'
            },
            {
              Header: 'MOM',
              accessor: 'mom'
            },
            {
              Header: 'Winner',
              accessor: 'winner'
            }]
  
    const callResults = async () => {
      let matches, highest, match, high, high_wickets, high_scores, mom, winner, data, display 
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
          let index = 0
          matches.map(() => {
              match = matches[index]
              high = highest[index]
              high_wickets = high.high_wickets.map((player) => {
                return(player[1])
              })
              high_scores = high.high_scores.map((player) => {
                return(player[1])
              })

              display = {matchid : "1348643"}

              if(high_scores.indexOf(match.batsman) > -1 ){
                display["batsman"] = match.batsman + "--" + 2
              } else {
                display["batsman"] = match.batsman + "--" + 0
              }
              if(high_wickets.indexOf(match.bowler) > -1 ){
                display["bowler"] = match.bowler + "--" + 2
              } else {
                display["bowler"] = match.bowler + "--" + 0
              }
              if(high.mom['data'] == match.mom ){
                display["mom"] = match.mom + "--" + 2
              } else {
                display["mom"] = match.mom + "--" + 0
              }
              if(high.winner == match.team ){
                display["winner"] = match.team + "--" + 2
              } else {
                display["winner"] = match.team + "--" + 2
              }
              index = index + 1
              displayList = displayList.concat(display)
              
          })

          let dummyList = [1]

          let rendering = dummyList.map(()=>{
            return(     
              <div>
              <ReactTable>
                data = {displayList}
                columns = {columns}
                defaultPageSize={2}
                pageSizeOptions={[2,4,6]}
              </ReactTable>
              </div>         
            )
          })
           

          test.render = rendering

          console.log(test.render)
          
          setScores(test)
          
        } catch(error){
            console.log(error)
            navigate('/')
        }
        
    }
    

    useEffect(() => {
        callResults()
      }, [])

    return(
        <>
          {scores.render}
        </>
        
      
        
    )
}

export default Results