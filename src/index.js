import React from 'react';
import ReactDOM from 'react-dom';
import AddRecipe from './AddRecipe';
import * as serviceWorker from './serviceWorker';

ReactDOM.render( <
    AddRecipe / > ,
    document.getElementById('root')
);
serviceWorker.unregister();