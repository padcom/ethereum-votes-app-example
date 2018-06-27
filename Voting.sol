pragma solidity ^0.4.11;

contract Voting {
  mapping (bytes32 => uint8) public votesReceived;

  bytes32[] public candidates;

  constructor(bytes32[] candidateNames) public {
    candidates = candidateNames;
  }

  function totalVotesFor(bytes32 candidate) public view returns (uint8) {
    if (isValidCandidate(candidate)) {
      return votesReceived[candidate];
    } else {
      revert();
    }
  }

  function vote(bytes32 candidate) public {
    if (isValidCandidate(candidate)) {
      votesReceived[candidate] += 1;
    } else {
      revert();
    }
  }

  function isValidCandidate(bytes32 candidate) internal view returns (bool) {
    for (uint i = 0; i < candidates.length; i++) {
      if (candidates[i] == candidate) {
        return true;
      }
    }
    return false;
  }
}
