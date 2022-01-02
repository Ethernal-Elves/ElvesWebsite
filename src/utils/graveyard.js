export const lookupOrc = async (tokenid)=>{

    let orcs = await nftContract.methods.orcs(tokenid).call()
    let ownerNotStaked = await nftContract.methods.ownerOf(tokenid).call()
    
    let a = await nftContract.methods.tokenURI(tokenid).call()
    var b = a.split(",")
    var orc = JSON.parse(atob(b[1]))
  
    let activity = await nftContract.methods.activities(tokenid).call()
    let claimable = parseInt(await nftContract.methods.claimable(tokenid).call())
    
    let level = orcs.level
    let lvlProgress = orcs.lvlProgress
    let action = activity.action
    let owner = activity.owner.toLowerCase()
  
      if(owner === "0x0000000000000000000000000000000000000000" || action === 0){
        owner = ownerNotStaked
      }
  
      let username = await getUsername(owner)
    
  const {calcLevel, activitymap} = calaculateActions({action, claimable, level, lvlProgress, tokenid})
  
  const  orcObj = {
        owner: owner.toLowerCase(),
        username: username,
        tokenid: tokenid, 
        time: activity.timestamp,  
        action: activity.action,  
        actionString: activitymap,
        level:orcs.level, 
        calcLevel: calcLevel,
        claimable: claimable,
        image: orc.image,
        name: orc.name,
        body: orcs.body,
        helm: orcs.helm,
        mainhand: orcs.mainhand,
        offhand: orcs.offhand,
        zugModifier: orcs.zugModifier,    
        attributes: orc.attributes
      }
  
      return(orcObj)
  
  }