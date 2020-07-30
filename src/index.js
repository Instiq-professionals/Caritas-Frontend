import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import {
  Home,
  About,
  FAQ,
  Signin,
  Dashboard,
  ReviewCauses,
  RecommendAcause,
  ApproveCause,
  CauseDetailsToBeApproved,
  ViewVolunteerRegPending ,
  ApproveVolunteer,
  Causes,
  HowItWorks,
  Signup,
  RecoverPassword,
  ACausePage,
  AddCause,
  Profile,
  ModeratorCausePage,
  VerifyEmailPage,
  ResetPassword,
} from "./containers";
import * as serviceWorker from "./serviceWorker";
import "./index.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';
import {
  signUpreducer,
  getVolunteersForApproval,
  getVolunteerForApproval,
  makeDecisionOnVolunteer,
  displayCausesForReview,
  displayCause,
  recommendCause
} from './store/reducers/index'
//import signUpreducer from './store/reducers/signupreducers';
//import displayCausesForReview from './store/reducers/reviewCauses';
//import displayCause from './store/reducers/causeDetails';
//import recommendCause from './store/reducers/recommendAcause';
//import store from "./store";
import { Colors } from "./constants";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import ModeratorRoute from "./components/ModeratorRoute";

function logger({ getState }) {
  return next => action => {
    //console.log('will dispatch', action)

    // Call the next dispatch method in the middleware chain.
    const returnValue = next(action)

    //console.log('state after dispatch', getState())

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
signup : signUpreducer,
getVolunteersForApproval : getVolunteersForApproval,
getVolunteerForApproval,
makeDecisionOnVolunteer,
reviewCauses : displayCausesForReview,
displayCause : displayCause,
recommend : recommendCause
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, ReduxThunk)))

const App = () => {
  const theme = createMuiTheme({
    transitions: {
      duration: {
        shortest: 200,
        shorter: 200,
        short: 200,
        standard: 200,
        complex: 200,
        enteringScreen: 200,
        leavingScreen: 200,
      },
    },
    palette: {
      primary: {
        main: Colors.appRed,
      },
    },
  });


  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/about" component={About} />
            <Route path="/FAQ" component={FAQ} />
            <Route path="/causes" exact component={Causes} />
            <GuestRoute path="/signin" component={Signin} />
            <GuestRoute path="/signup" component={Signup} />
            <GuestRoute path="/recover-password" component={RecoverPassword} />
            <GuestRoute
              path="/users/verify_email/:token"
              component={VerifyEmailPage}
            />
            <GuestRoute
              path="/users/reset_password/:token"
              component={ResetPassword}
            />
            <Route path="/how-it-works" component={HowItWorks} />
            <ProtectedRoute path="/dashboard" component={Dashboard} exact />
            <ProtectedRoute
              path="/dashboard/create-cause"
              component={AddCause}
            />
            <ProtectedRoute path="/dashboard/profile" component={Profile} />
            <ProtectedRoute path="/dashboard/approveVolunteer" component={ViewVolunteerRegPending} exact/>
            <ProtectedRoute path="/dashboard/approveVolunteer/:id" component={ApproveVolunteer} />
            <ProtectedRoute path="/dashboard/review" component={ReviewCauses } exact/>
            <ProtectedRoute path="/dashboard/review/:id" component={RecommendAcause }/>
            <ProtectedRoute exact path="/dashboard/approve" component={ApproveCause}/>
            <ProtectedRoute path="/dashboard/approve/:id" component={CauseDetailsToBeApproved}/>
            <Route path="/cause/:id" component={ACausePage} />
            <ModeratorRoute
              path="/dashboard/cause/:id"
              component={ModeratorCausePage}
            />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
