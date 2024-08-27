import Array "mo:base/Array";
import Int "mo:base/Int";
import Nat "mo:base/Nat";
import Text "mo:base/Text";

actor LifeCounter {
  // Stable variable to store life totals
  stable var lifeTotals : [var Nat] = Array.tabulateVar<Nat>(4, func(_) = 40);

  // Mutable variable to store player names
  var playerNames : [var ?Text] = Array.tabulateVar<(?Text)>(4, func(_) = null);

  // Get current life totals for all players
  public query func getLifeTotals() : async [Nat] {
    Array.freeze(lifeTotals)
  };

  // Update life total for a specific player
  public func updateLifeTotal(playerId : Nat, change : Int) : async () {
    if (playerId < 4) {
      let currentLife = lifeTotals[playerId];
      let newLife = Int.max(0, currentLife + change);
      lifeTotals[playerId] := Int.abs(newLife);
    };
  };

  // Reset all life totals to starting amount (40)
  public func resetLifeTotals() : async () {
    for (i in lifeTotals.keys()) {
      lifeTotals[i] := 40;
    };
  };

  // Set player name
  public func setPlayerName(playerId : Nat, name : ?Text) : async () {
    if (playerId < 4) {
      playerNames[playerId] := name;
    };
  };

  // Get player names
  public query func getPlayerNames() : async [?Text] {
    Array.freeze(playerNames)
  };
}
