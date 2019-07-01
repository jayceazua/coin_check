const ChallengeList = artifacts.require('./ChallengeList.sol')

contract('ChallengeList', (accounts) => {
  before(async () => {
    this.challengeList = await ChallengeList.deployed()
  })

  it('deploys successfully', async () => {
    const address = await this.challengeList.address
    assert.notEqual(address, 0x0)
    assert.notEqual(address, '')
    assert.notEqual(address, null)
    assert.notEqual(address, undefined)
  })

  it('lists challenges', async () => {
    const challengeCount = await this.challengeList.challengeCount()
    const challenge = await this.challengeList.challenges(challengeCount)
    assert.equal(challenge.id.toNumber(), challengeCount.toNumber())
    assert.equal(challenge.content, "Visit the website militarycoincheck.com")
    assert.equal(challenge.completed, false)
    assert.equal(challengeCount.toNumber(), 1)
  })

  it('creates challenges', async () => {
    const result = await this.challengeList.createChallenge('A new challenge')
    const challengeCount = await this.challengeList.challengeCount()
    assert.equal(challengeCount, 2)
    const event = result.logs[0].args
    assert.equal(event.id.toNumber(), 2)
    assert.equal(event.content, 'A new challenge')
    assert.equal(event.completed, false)
  })

  it('toggles challenge completion', async () => {
    const result = await this.challengeList.toggleCompleted(1)
    const challenge = await this.challengeList.challenges(1)
    assert.equal(challenge.completed, true)
    const event = result.logs[0].args
    assert.equal(event.id.toNumber(), 1)
    assert.equal(event.completed, true)
  })

})