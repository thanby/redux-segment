import test from 'tape';
import { compose, createStore, applyMiddleware } from 'redux';
import createAnalyticsStub from './helpers/segment-stub';
import { createTracker, EventTypes } from '../src/index';


test('Track - spec', t => {
  t.test('default', st => {
    st.plan(1);


    window.analytics = createAnalyticsStub();
    const EVENT_TYPE = 'LOGOUT';
    const action = {
      type: EVENT_TYPE,
      meta: {
        analytics: {
          eventType: EventTypes.reset,
        },
      },
    };
    const identity = val => val;
    const tracker = createTracker();
    const store = compose(
      applyMiddleware(tracker)
    )(createStore)(identity);


    store.dispatch(action);
    const defaultEvent = [
      window.analytics[0] && window.analytics[0][0],
      window.analytics[0] && window.analytics[0][1],
    ];
    st.deepEqual(defaultEvent, ['reset', undefined], 'emits a reset event');


    window.analytics = null;
  });
});
