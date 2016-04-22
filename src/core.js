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
  return state.merge({
    vote: Map({pair: entries.take(2)}),
    entries: entries.skip(2)
  });
}

export function vote(state, entry) {
  return state.updateIn(
    ['vote', 'tally', entry],
    0,
    tally => tally + 1
  );
}
