import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// reducer import
import accountReducer from './accountReducer';
import customizationReducer from './customizationReducer';
import snackbarReducer from './snackbarReducer';
import cartReducer from './cartReducer';
import kanbanReducer from './kanbanReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    snackbar: snackbarReducer,
    account: accountReducer,
    cart: persistReducer(
        {
            key: 'cart',
            storage,
            keyPrefix: 'berry-'
        },
        cartReducer
    ),
    kanban: kanbanReducer
});

export default reducer;
