import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Grid} from '@material-ui/core'




const Home = () => {

  const [userData, setUserData] = useState(0)

  const [teams, setTeams] = useState([])
  const [bats, setBats] = useState([])
  const [bowls, setBowls] = useState([])
  const [moms, setMoms] = useState([])
  let userName
  

  const navigate = useNavigate()

  

  const teamHandleChange = (event, matchid) => {
    const value = event.target.value
    setTeams(teams => [...teams, {"team": value, "matchid": matchid}])    
  }

  const batHandleChange = (event, matchid) => {
    const value = event.target.value
    setBats(bats => [...bats, {"batsman": value, "matchid": matchid}]) 
  }

  const bowlHandleChange = (event, matchid) => {
    const value = event.target.value
    setBowls(bowls => [...bowls, {"bowler": value, "matchid": matchid}]) 
  }

  const momHandleChange = (event, matchid) => {
    const value = event.target.value
    setMoms(moms => [...moms, {"mom": value, "matchid": matchid}]) 
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    let newList_teams = []
    let newList_bats = []
    let newList_bowls = []
    let newList_moms = []
    let mergedArr = []

    let reversed = [...teams].reverse()
    let exists
    reversed.map((team) => {
      exists = newList_teams.filter(item => item.matchid == team.matchid)
      if(!exists.length > 0){
        newList_teams = newList_teams.concat(team)
      }
    })

    reversed = [...bats].reverse()
    reversed.map((team) => {
      exists = newList_bats.filter(item => item.matchid == team.matchid)
      if(!exists.length > 0){
        newList_bats = newList_bats.concat(team)
      }
    })

    reversed = [...bowls].reverse()
    reversed.map((team) => {
      exists = newList_bowls.filter(item => item.matchid == team.matchid)
      if(!exists.length > 0){
        newList_bowls = newList_bowls.concat(team)
      }
    })

    reversed = [...moms].reverse()
    reversed.map((team) => {
      exists = newList_moms.filter(item => item.matchid == team.matchid)
      if(!exists.length > 0){
        newList_moms = newList_moms.concat(team)
      }
    })

    const map = new Map()
    newList_teams.forEach(item => map.set(item.matchid, item))
    newList_bats.forEach(item => map.set(item.matchid, {...map.get(item.matchid), ...item}))
    mergedArr = Array.from(map.values())


    mergedArr.forEach(item => map.set(item.matchid, item))
    newList_bowls.forEach(item => map.set(item.matchid, {...map.get(item.matchid), ...item}))
    mergedArr = Array.from(map.values())

    mergedArr.forEach(item => map.set(item.matchid, item))
    newList_moms.forEach(item => map.set(item.matchid, {...map.get(item.matchid), ...item}))
    mergedArr = Array.from(map.values())

    console.log("User name details : " + userName)

    const res = await fetch("/getSelected", {
      method: 'POST',
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(
          mergedArr
      )
  })



  }

  const callHome = async () => {
    try{
      const res = await fetch('/dashboard', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          "Content-Type": 'application/json'
        },
        credentials: 'include'
      })

      const data = await res.json()
      userName = data.email
      
      let matches, teams_display

      matches = data.matches.map((match) => {
        return(
          <div> {match.matchid} </div>
        )

      })


      const res_matches = await fetch('/matchesinfo', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          "Content-Type": 'application/json'
        },
        credentials: 'include'
      })

      const data_matches = await res_matches.json()
      matches = data_matches.map((match) => {
        return(
          <Grid item xs={12} lg={5} style={{backgroundColor:'lightBlue', marginBottom:40, marginLeft:10, borderRadius:10}}>
            <h2>{match.matchid}</h2>
            <label >
              Pick your favorite Team:
              <select name={match.matchId} onChange={(e, matchid) => teamHandleChange(e, match.matchid)}>
              <option key='blankKey' hidden value >Select</option>
                {match.teams.map((team) => {
                  return(
                    <option value={team}>{team}</option>
                  )
                })}
              </select>
            </label>

            <br></br>
            <br></br>

            <label >
              Pick your favorite Batsman:
              <select name={match.matchId} onChange={(e, matchid) => batHandleChange(e, match.matchid)}>
              <option key='blankKey' hidden value >Select</option>
                {match.players.map((player) => {
                  return(
                    <option value={player.data}>{player.name}</option>
                  )
                })}
              </select>
            </label>

            <br></br>
            <br></br>

            <label >
              Pick your favorite Bowler:
              <select name={match.matchId} onChange={(e, matchid) => bowlHandleChange(e, match.matchid)}>
              <option key='blankKey' hidden value >Select</option>
                {match.players.map((player) => {
                  return(
                    <option value={player.data}>{player.name}</option>
                  )
                })}
              </select>
            </label>

            <br></br>
            <br></br>

            <label >
              Pick your Player of the Match:
              <select name={match.matchId} onChange={(e, matchid) => momHandleChange(e, match.matchid)}>
              <option key='blankKey' hidden value >Select</option>
                {match.players.map((player) => {
                  return(
                    <option value={player.data}>{player.name}</option>
                  )
                })}
              </select>
            </label>

            <br></br>
            <br></br>

          </Grid>
        )

      })

      data.matches = matches

      //console.log(data)
      setUserData(data)

    } catch(error) {
      console.log(error)
      navigate('/')
    }
  }

  useEffect(() => {
    callHome()
  }, [])

  
  

  return(
    
    <div>
      <form method='POST' action="" onSubmit={onSubmit}>
      <h1>Welcome {userData.name}</h1>
      <Grid container spacing={2}>
        {userData.matches}
      </Grid>
      <div>
        <input type="submit" name="submit" value="Submit Teams"/>
      </div>
      </form>
    </div>
    
  )
}

export default Home