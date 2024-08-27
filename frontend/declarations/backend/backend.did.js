export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'getLifeTotals' : IDL.Func([], [IDL.Vec(IDL.Nat)], ['query']),
    'getPlayerNames' : IDL.Func([], [IDL.Vec(IDL.Opt(IDL.Text))], ['query']),
    'resetLifeTotals' : IDL.Func([], [], []),
    'setPlayerName' : IDL.Func([IDL.Nat, IDL.Opt(IDL.Text)], [], []),
    'updateLifeTotal' : IDL.Func([IDL.Nat, IDL.Int], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
