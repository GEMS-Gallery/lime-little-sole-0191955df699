import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface _SERVICE {
  'getLifeTotals' : ActorMethod<[], Array<bigint>>,
  'getPlayerNames' : ActorMethod<[], Array<[] | [string]>>,
  'resetLifeTotals' : ActorMethod<[], undefined>,
  'setPlayerName' : ActorMethod<[bigint, [] | [string]], undefined>,
  'updateLifeTotal' : ActorMethod<[bigint, bigint], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
