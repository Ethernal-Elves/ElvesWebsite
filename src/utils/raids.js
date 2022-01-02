export const raids = [
  {name: "Giant Crab Beach",  zone: 0, cost:65,  minLvl:  5, idealLvl:15, maxLvl: 35, time:8},
  {name: "Pirate Cove",       zone: 1, cost:150, minLvl: 15, idealLvl:30, maxLvl: 50, time:8},
  {name: "Spider dent",       zone: 2, cost:175, minLvl: 15, idealLvl:30, maxLvl: 50, time:8},
  {name: "Unstable Quagmire", zone: 3, cost:250, minLvl: 30, idealLvl:50, maxLvl: 70 ,time:8},
  {name: "Merfolk Fortress",  zone: 4, cost:300, minLvl: 50, idealLvl:75, maxLvl:95, time:8},
]
export const raidsProbabilities = [
  {levelName: "Regular", level: 0, regular: .85, great: .15, superb: 0},
  {levelName: "Great",level: 1, regular: .50, great: .35, superb: .15},
  {levelName: "Superb",level: 2, regular: .45, great: .4, superb: .15},
]
export const raidsOutcomes = [
  {zone: 0, regular: 2, great: 3, superb: 5},
  {zone: 1, regular: 5, great: 8, superb: 12},
  {zone: 2, regular: 4, great: 8, superb: 20},
  {zone: 3, regular: 12, great: 15, superb: 23},
  {zone: 4, regular: 16, great: 20, superb: 30},
]

export const raidOutcomeHelper = async (level, zoneIndex)=>{

  let levelTiers //= {min: 0, ideal: 1, max: 2}
  const raidsData = raids[zoneIndex]

  if(level < raidsData.minLvl){
    return({expectedValue:"Min level not reached for place"})
  }
  if(level >= raidsData.minLvl){
    levelTiers=0
  }
  if(level >= raidsData.idealLvl){
    levelTiers=1
  }else{
    levelTiers=2
  }

  const raidProbability = raidsProbabilities[levelTiers]
  const raidOutcome = raidsOutcomes[zoneIndex]

  let expectedValue = (raidProbability.regular * raidOutcome.regular) + (raidProbability.great * raidOutcome.great) + (raidProbability.superb * raidOutcome.superb)

  return {
    expectedValue,
    raidProbability,
    raidOutcome,
    raidsData
  }



}

