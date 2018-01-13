function PlayerVote(player_id) {
    this.player_id = player_id,
        this.vote_count = 0,

        this.addVote = () => {
            this.vote_count += 1;
            return this.vote_count
        },

        this.minusVote = () => {
            if (this.vote_count > 0) {
                this.vote_count -= 1;
            }
            return this.vote_count;
        }
}

function VoteSystem() {
    this.players = [];

    // Takes a list of PlayerVote Objects
    this.addAllPlayers = (listOfPlayers) => {
        for (i = 0; i < list_of_players.length; i++) {
            this.addPlayer(new PlayerVote(listOfPlayers[i]));
        }
    },

        // takes PlayerVote Object
        this.addPlayer = (playerId) => {
            this.players.push(new PlayerVote(playerId));
        },

        this.resetVoteSystem = () => {
            this.players = [];
        }

}

module.export = {
    PlayerVote: PlayerVote,
	VoteSystem: VoteSystem
}