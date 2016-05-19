import {List, Map} from 'immutable';

export function setEntries(state, entries) {
  return state.set('entries', List(entries));
}

function getWinners(tally) {
  const max = tally.max();
  return tally.filter(val => val === max).keySeq();
}

export function next(state) {
  const tally = state.getIn(
    ['vote', 'tally'],
    Map()
  );
  const entries = state.get('entries').concat(getWinners(tally));
  return entries.count() === 1 ?
    state.remove('vote').remove('entries').set('winner', entries.first()) :
    state.merge({
      vote: Map({pair: entries.take(2)}),
      entries: entries.skip(2)
    });
}

export function vote(voteState, entry) {
  return voteState.updateIn(
    ['tally', entry],
    0,
    tally => tally + 1
  );
}

export const INITIAL_STATE = Map();
