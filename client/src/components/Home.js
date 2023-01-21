import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Grid} from '@material-ui/core'




const Home = () => {

  const [userData, setUserData] = useState(0)

  const [teams, setTeams] = useState([])
  const [bats, setBats] = useState([])
  const [bowls, setBowls] = useState([])
  const [moms, setMoms] = useState([])
  let userName, matches_sel, matches, mat_sel
  let defTeam, defBat, defBowler, defMom
  

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
      matches_sel = data.matches

      const res_matches = await fetch('/matchesinfo', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          "Content-Type": 'application/json'
        },
        credentials: 'include'
      })

      const data_matches = await res_matches.json()
      data_matches.sort((match1, match2) => {
        return match1.matchid - match2.matchid
      })

      let pre_teams = []
      let pre_bats = []
      let pre_bowlers = []
      let pre_moms = []
      matches = data_matches.map((match) => {
        mat_sel = matches_sel.filter(item => item.matchid == match.matchid)
        pre_teams = pre_teams.concat({"team": mat_sel[0].team, "matchid": mat_sel[0].matchid})
        pre_bats = pre_bats.concat({"batsman": mat_sel[0].batsman, "matchid": mat_sel[0].matchid})
        pre_bowlers = pre_bowlers.concat({"bowler": mat_sel[0].bowler, "matchid": mat_sel[0].matchid})
        pre_moms = pre_moms.concat({"mom": mat_sel[0].mom, "matchid": mat_sel[0].matchid})

        let flag = false
        if(mat_sel.length > 0){
          flag = true
          defTeam = mat_sel[0].team
          defBat = mat_sel[0].batsman
          defBowler = mat_sel[0].bowler
          defMom = mat_sel[0].mom
        }
        // console.log(flag)

        return(
          <Grid item xs={12} lg={5} style={{backgroundColor:'lightBlue', marginBottom:40, marginLeft:10, borderRadius:10}}>
            <h2>{match.matchid}</h2>
            <label >
              Pick your favorite Team:
              <select disabled={match.disable} name={match.matchId} onChange={(e, matchid) => teamHandleChange(e, match.matchid)}>
              <option key='blankKey' hidden value >Select</option>
                {match.teams.map((team) => {
                  if(defTeam == team){
                    return(
                      <option value={team} selected>{team}</option>
                    )
                  } else {
                    return(
                      <option value={team}>{team}</option>
                    )
                  }
                  
                })}
              </select>
            </label>

            <br></br>
            <br></br>

            <label >
              Pick your favorite Batsman:
              <select disabled={match.disable} name={match.matchId} onChange={(e, matchid) => batHandleChange(e, match.matchid)}>
              <option key='blankKey' hidden value >Select</option>
                {match.players.map((player) => {
                  if(defBat == player.data){
                    return(
                      <option value={player.data} selected>{player.name}</option>
                    )
                  } else{
                    return(
                      <option value={player.data}>{player.name}</option>
                    )
                  }
                  
                })}
              </select>
            </label>

            <br></br>
            <br></br>

            <label >
              Pick your favorite Bowler:
              <select disabled={match.disable} name={match.matchId} onChange={(e, matchid) => bowlHandleChange(e, match.matchid)}>
              <option key='blankKey' hidden value >Select</option>
                {match.players.map((player) => {
                  if(defBowler == player.data){
                    return(
                      <option value={player.data} selected>{player.name}</option>
                    )
                  } else{
                    return(
                      <option value={player.data}>{player.name}</option>
                    )
                  }
                  
                })}
              </select>
            </label>

            <br></br>
            <br></br>

            <label >
              Pick your Player of the Match:
              <select disabled={match.disable} name={match.matchId} onChange={(e, matchid) => momHandleChange(e, match.matchid)}>
              <option key='blankKey' hidden value >Select</option>
                {match.players.map((player) => {
                  if(defMom == player.data){
                    return(
                      <option value={player.data} selected>{player.name}</option>
                    )
                  }else{
                    return(
                      <option value={player.data}>{player.name}</option>
                    )
                  }
                  
                })}
              </select>
            </label>

            <br></br>
            <br></br>

          </Grid>
        )

      })
      // console.log("All teams before changes")
      // console.log(teams)
      data.matches = matches

      //console.log(data)

      pre_teams.map((team) => {
        setTeams(teams => [...teams, team])
      })
      
      pre_bats.map((bat) => {
        setBats(bats => [...bats, bat])

      })

      pre_bowlers.map((bowler) => {
        setBowls(bowls => [...bowls, bowler])
      })

      pre_moms.map((mom) => {
        setMoms(moms => [...moms, mom])
      })

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