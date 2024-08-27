import Array "mo:base/Array";
import Int "mo:base/Int";
import Nat "mo:base/Nat";
import Text "mo:base/Text";

actor LifeCounter {
  // Player data structure
  type Player = {
    var lifeTotal: Nat;
    var poisonCounters: Nat;
    var commanderDamage: [var Nat];
    var name: ?Text;
  };

  // Stable variable to store players
  stable var players : [var Player] = Array.tabulateVar<Player>(4, func(_) = {
    var lifeTotal = 40;
    var poisonCounters = 0;
    var commanderDamage = Array.tabulateVar<Nat>(4, func(_) = 0);
    var name = null;
  });

  // Get current state for all players
  public query func getPlayersState() : async [(Nat, ?Text, Nat, Nat, [Nat])] {
    Array.tabulate<(Nat, ?Text, Nat, Nat, [Nat])>(4, func(i) {
      let player = players[i];
      (i, player.name, player.lifeTotal, player.poisonCounters, Array.freeze(player.commanderDamage))
    })
  };

  // Update life total for a specific player
  public func updateLifeTotal(playerId : Nat, change : Int) : async () {
    if (playerId < 4) {
      let player = players[playerId];
      player.lifeTotal := Nat.max(0, Int.abs(Int.max(0, Int.fromNat(player.lifeTotal) + change)));
    };
  };

  // Update poison counters for a specific player
  public func updatePoisonCounters(playerId : Nat, change : Int) : async () {
    if (playerId < 4) {
      let player = players[playerId];
      player.poisonCounters := Nat.max(0, Int.abs(Int.max(0, Int.fromNat(player.poisonCounters) + change)));
    };
  };

  // Update commander damage for a specific player
  public func updateCommanderDamage(playerId : Nat, fromPlayerId : Nat, change : Int) : async () {
    if (playerId < 4 and fromPlayerId < 4 and playerId != fromPlayerId) {
      let player = players[playerId];
      let currentDamage = player.commanderDamage[fromPlayerId];
      player.commanderDamage[fromPlayerId] := Nat.max(0, Int.abs(Int.max(0, Int.fromNat(currentDamage) + change)));
    };
  };

  // Reset all counters
  public func resetCounters() : async () {
    for (player in players.vals()) {
      player.lifeTotal := 40;
      player.poisonCounters := 0;
      for (i in player.commanderDamage.keys()) {
        player.commanderDamage[i] := 0;
      };
    };
  };

  // Set player name
  public func setPlayerName(playerId : Nat, name : ?Text) : async () {
    if (playerId < 4) {
      players[playerId].name := name;
    };
  };
}
