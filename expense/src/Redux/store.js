import { createStore,combineReducers, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducer from './reducer/reducer';
 const reduce=combineReducers({
    expense:reducer
 });


const middleware=[thunk];

const store = createStore(
    reduce,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;
