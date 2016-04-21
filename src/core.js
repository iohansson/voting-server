import {List, Map} from 'immutable';

export function setEntries(state, entries) {
  return state.set('entries', List(entries));
}

export function next(state) {
  const entries = state.get('entries');
  return state.merge({
    vote: Map({pair: entries.take(2)}),
    entries: entries.skip(2)
  });
}

export function vote(state, entry) {
  const vote = state.get('vote');
  const tally = vote.get('tally') || Map();
  const entryTally = tally.get(entry) || 0;
  return state.set('vote', vote.merge({
    tally: tally.set(entry, entryTally + 1)
  }));
}
