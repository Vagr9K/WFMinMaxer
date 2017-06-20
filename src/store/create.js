import { createStore } from 'redux';
import rootReducer from './modules/reducer';

export default function getStore() {
  const store = createStore(
    rootReducer,
  );
  return store;
}
