const { expect } = require("chai");

const toWei = (num) => ethers.utils.parseEther(num.toString())
const fromWei = (num) => ethers.utils.formatEther(num)

describe("Blockchain Voting System Testing",async function(){
    let voter, deployer,  leader_citizen, voter_citizen1, voter_citizen2;
    beforeEach(async function(){
        // getting all the contracts
        const Voter = await ethers.getContractFactory("Voter");
        // Getting the signers
        [deployer,leader_citizen,voter_citizen1,voter_citizen2] = await ethers.getSigners();
        // Deploy the Contracts
        voter = await Voter.deploy()
    })

    // Test for Deployment
    describe("Deployment",()=>{
        it("After the deployment the deployer should be the owner",async function(){
            expect(await voter.owner()).to.equal(deployer.address);
        })
    })

    // Test for the Adding Participant
    describe("Adding Participants and Citizens",()=>{
        it("The Citizens should be added to the S.T",async function(){
            // Connect
            await voter.connect(deployer).addCitizen(voter_citizen1.address)
            // The Citizens should be added
            expect((await voter.citizens(voter_citizen1.address)).addr).to.equal(voter_citizen1.address)
            // The Citizen hasn't been voted yet, check bool
            expect((await voter.citizens(voter_citizen1.address)).isVoted).to.equal(false)
            // The Citizen is now a voter and he/she is ready to vote
            expect(await voter.voters(voter_citizen1.address)).to.equal(true)
            // The noOfVoters should get increased
            expect(await voter.noOfVoters()).to.equal(1)
            // The voters should be added to allCitizens
            expect((await voter.allCitizens(0)).addr).to.equal(voter_citizen1.address)
        })
        it("The Participants should be added to the S.T", async function () {
            // Connect by the owner
            await voter.connect(deployer).addParticipant("Sujay", leader_citizen.address)
            // The Participant should be added
            expect((await voter.participants(0)).addr).to.equal(leader_citizen.address)
            // The Participant should have zero votes
            expect(await voter.noOfLeaderVotes(leader_citizen.address)).to.equal(0)
        })
    })

    // Test for events when added the participants
    describe("An Event should be emitted after the participants are added", () => {
        it("Adding a Citizen should emit a event in the Blockchain", async function () {
            // An event Emmitted by the Voter 
            await expect(voter.connect(deployer).addCitizen(voter_citizen1.address)).to.emit(voter, "AdditionOfCitizen").withArgs(deployer.address, voter_citizen1.address, [ 0, voter_citizen1.address, false ])
        })
        it("Adding a Participant should emit a event in the Blockchain", async function () {
            // An event Emmitted by the participant
            await expect(voter.connect(deployer).addParticipant("Sujay", leader_citizen.address)).to.emit(voter, "AdditionOfParticipant").withArgs(deployer.address, [ "Sujay", 0, leader_citizen.address ])
        })
    })

    // Test for votes by the voters
    describe("The voters has choosen a participant to vote", () => {
        it("Voter has choosen and voted a candidate", async function () {
            // Connect and add a citizen
            await voter.connect(deployer).addCitizen(voter_citizen1.address)
            // Connect and add a Leader
            await voter.connect(deployer).addParticipant("Sujay",leader_citizen.address)
            // Connect as a voter and voter the leader
            await voter.connect(voter_citizen1).voteLeader(leader_citizen.address)
            // Check for the increased leadervotes
            expect(await voter.noOfLeaderVotes(leader_citizen.address)).to.equal(1)
            // Check if the voter state has been changed to hasVoted
            expect((await voter.citizens(voter_citizen1.address)).isVoted).to.equal(true)
        })
        it("An event should be emmited", async function () {
            // Connect and add a citizen
            await voter.connect(deployer).addCitizen(voter_citizen1.address)
            // Connect and add a Leader
            await voter.connect(deployer).addParticipant("Sujay", leader_citizen.address)
            // Check for an emitted event
            await expect(voter.connect(voter_citizen1).voteLeader(leader_citizen.address)).to.emit(voter,"VotedforParticipant").withArgs(leader_citizen.address,voter_citizen1.address,[0,voter_citizen1.address,true])
        })
    })

    // Testing for revertions
    describe("The Revertion test", () => {
        it("The Voter should be reverted if u adding the voter again", async function () {
            // Connect as a deployer and add a citizen
            await voter.connect(deployer).addCitizen(voter_citizen1.address)
            // Check for the revertions
            await (expect(voter.connect(deployer).addCitizen(voter_citizen1.address))).to.be.revertedWith("This address is already in the Voters List")
        })
        it("Voter should not vote for himself/herself",async function(){
            // Connect as a deployer add a participant
            await voter.connect(deployer).addParticipant("Sujay", leader_citizen.address)
            // Check for revert -> if same one is added again
            await (expect(voter.connect(deployer).addParticipant("Sujay", leader_citizen.address))).to.be.revertedWith("Only one guy can add him/her")
            // Check for revert
            await (expect(voter.connect(leader_citizen).voteLeader(leader_citizen.address))).to.be.revertedWith("Self Voting cannot take place")
            // Connect as deployer add a citizen
            await voter.connect(deployer).addCitizen(voter_citizen1.address)
            // Check for revert - citizen-list
            await (expect(voter.connect(voter_citizen2).voteLeader(leader_citizen.address))).to.be.revertedWith("This address is not in our citizen list contact admin/owner")
            // Connect as a client 1 and vote for leader
            await voter.connect(voter_citizen1).voteLeader(leader_citizen.address)
            // Check for revertions
            await (expect(voter.connect(voter_citizen1).voteLeader(leader_citizen.address))).to.be.revertedWith("Duplicate votes cannot be done")
        
        })
        
    })






})