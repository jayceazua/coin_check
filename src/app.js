App = {
  loading: false,
  contracts: {},
  load: async () => {
    await App.loadWeb3()
    await App.loadAccount()
    await App.loadContract()
    await App.render()
  },
  loadWeb3: async () => {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
    } else {
      window.alert("Please connect to Metamast.")
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum)
      try {
        //  request account access if needed
        await ethereum.enable()
      } catch (error) {
        // user denied account access...
      }
    }
    // legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = web3.currentProvider
      window.web3 = new Web3(web3.currentProvider)
      // Accounts always exposed
      web3.eth.sendTransaction({
        /* ... */
      })
    }
    // non-dapp browsers...
    else {
      console.log("Non-Ethereum browser detected.")
    }
  },
  loadAccount: async () => {
    App.account = web3.eth.accounts[0]
  },

  loadContract: async () => {
    // create a javascript version of the smart contract
    const challengeList = await $.getJSON("ChallengeList.json")
    App.contracts.ChallengeList = TruffleContract(challengeList)
    App.contracts.ChallengeList.setProvider(App.web3Provider)
    // console.log(challengeList)
    App.challengeList = await App.contracts.ChallengeList.deployed()
  },

  render: async () => {
    // prevent double rendering
    if (App.loading) {
      return
    }
    // update app loading
    App.setLoading(true)

    $("#account").html(App.account)
    await App.renderChallenges()

    App.setLoading(false)
  },

  renderChallenges: async () => {
    // kiad total challenge count
    const challengeCount = await App.challengeList.challengeCount()
    const $challengeTemplate = $(".challengeTemplate")
    // render out each challenge with a new challenge template
    for (let i = 1; i <= challengeCount; i += 1) {
      const challenge = await App.challengeList.challenges(i)
      const challengeId = challenge[0].toNumber()
      const challengeContent = challenge[1]
      const challengeCompleted = challenge[2]

      const $newChallengeTemplate = $challengeTemplate.clone()
      $newChallengeTemplate.find(".content").html(challengeContent)
      $newChallengeTemplate.find("input")
        .prop("name", challengeId)
        .prop("checked", challengeCompleted)
      // .on("click", App.toggleCompleted)
      if (challengeCompleted) {
        $("#completedChallengeList").append($newChallengeTemplate)
      } else {
        $("#challengeList").append($newChallengeTemplate)
      }
      // show the challenge
      $newChallengeTemplate.show()
    }

  },

  setLoading: (bool) => {
    App.loading = bool
    const loader = $("#loader")
    const content = $("#content")
    if (bool) {
      loader.show()
      content.hide()
    } else {
      loader.hide()
      content.show()
    }
  }
}

$(() => {
  $(window).load(() => {
    App.load()
  })
})