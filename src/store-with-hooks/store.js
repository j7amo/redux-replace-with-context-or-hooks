import { useEffect, useState } from 'react';

// to SWITCH FROM REDUX TO CUSTOM HOOK we take these STEPS:

// STEP-1:
// define global objects OUTSIDE the custom hook (we need this
// to avoid re-creating these objects for every separate component that
// uses this custom hook)
let globalState = {};
const listeners = [];
let actions = {};

const useStore = (shouldListen = true) => {
  // STEP-2:
  // use "useState" hook to trigger updates of components using custom hook.
  // Every component that calls this hook will get its OWN "setState" function.
  const [, setState] = useState(globalState);

  // STEP-3:
  // Register listener function (add to listeners array). Of course registering
  // such a listener from a specific component should ONLY take place when component MOUNTS:
  useEffect(() => {
    // we add listeners conditionally because we don't want to trigger re-rendering of the component
    // that is (1)just dispatching an action and (2)not using globalState directly
    if (shouldListen) {
      listeners.push(setState);
    }

    // STEP-4:
    // provide clean-up function that REMOVES specific listener
    // when corresponding component UNMOUNTS (to avoid calling listeners that doesn't do anything)
    return () => {
      // the clean-up function should also work conditionally because we don't want to remove
      // a listener which
      if (shouldListen) {
        listeners.filter((listener) => listener !== setState);
      }
    };
  }, [setState, shouldListen]);

  // STEP-5:
  // add "dispatch" function
  const dispatch = (action) => {
    // this function should use "action.type" as a KEY to:
    // 1) get another function from "actions" object
    // 2) use this function to get the updated state
    const newState = actions[action.type](globalState, action.payload);
    // then MERGE OLD state with NEW state:
    globalState = {
      ...globalState,
      ...newState,
    };
    // and "notify" listeners about state change by CALLING every listener
    // which is a SETSTATE function and as a result - TRIGGERING corresponding
    // component re-renders! (this is the effect of calling "setState")
    listeners.forEach((listener) => listener(globalState));
  };

  // STEP-6:
  // return [state, dispatch] which looks familiar...
  // because it is the same as useReducer return!
  // So we basically build our own version of it but with a little more power(the state
  // is app-wide):
  return [globalState, dispatch];
};

// STEP-7:
// define a function for setting up the STORE because without it the "useStore" hook
// is pretty generic and abstract(it doesn't have any concrete data, methods to work with data)
export const initStore = (userActions, initialState) => {
  if (initialState) {
    // we need this merging of "state" and "actions" to be able to create
    // MORE THAN 1 STATE SLICE! (e.g. products, authentication etc.)
    globalState = { ...globalState, ...initialState };
  }

  actions = { ...actions, ...userActions };
};

// STEP-8:
// proceed to "productsSlice.js" file

export default useStore;
