export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'getPlayersState' : IDL.Func(
        [],
        [
          IDL.Vec(
            IDL.Tuple(
              IDL.Nat,
              IDL.Opt(IDL.Text),
              IDL.Nat,
              IDL.Nat,
              IDL.Vec(IDL.Nat),
            )
          ),
        ],
        ['query'],
      ),
    'resetCounters' : IDL.Func([], [], []),
    'setPlayerName' : IDL.Func([IDL.Nat, IDL.Opt(IDL.Text)], [], []),
    'updateCommanderDamage' : IDL.Func([IDL.Nat, IDL.Nat, IDL.Int], [], []),
    'updateLifeTotal' : IDL.Func([IDL.Nat, IDL.Int], [], []),
    'updatePoisonCounters' : IDL.Func([IDL.Nat, IDL.Int], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
