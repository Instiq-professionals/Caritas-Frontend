import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import {
  Home,
  About,
  FAQ,
  Signin,
  Dashboard,
  MyCauses,
  MyCauseDetails,
  EditCause,
  ReviewCauses,
  RecommendAcause,
  GetAllCausesForCleadersDecision,
  CauseDetailsToBeApproved,
  GetAllCausesForDirectors,
  Resolvecause,
  MySuccessStory,
  GetMySuccessStoryDetails,
  CreateEvent,
  GetAllMyEvent,
  EditEvent,
  MyEventDetails,
  GetAllEventsByCleader,
  MakeAdecisionOnEventByCleader,
  GetAllEventsByDirector,
  ResolveEvent,
  ViewVolunteerRegPending ,
  ApproveVolunteer,
  VisitorsSuccessStoryPage,
  Causes,
  HowItWorks,
  Signup,
  RecoverPassword,
  ACausePage,
  AddCause,
  Profile,
  UserDetails,
  ViewALLUsers,
  ViewALLCausesByAdmins,
  ViewAllEventsByAdmins,
  ModeratorCausePage,
  VerifyEmailPage,
  ResetPassword,
  AdminCauseView,
  NotFound
} from "./containers";
import * as serviceWorker from "./serviceWorker";
import "./index.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';
import {
  signUpreducer,
  profile,
  getAllMyCauses,
  getMyCause,
  getVolunteersForApproval,
  getVolunteerForApproval,
  makeDecisionOnVolunteer,
  displayCausesForReview,
  displayCause,
  recommendCause,
  makeDecisionOnCause,
  resolveCause,
  getAllMySuccessStories,
  MyStoryDetails,
  getAllSuccessStories,
  crudEvent,
  makeDecisionOnEventByCleader,
  resolveEvent,
  getAllCausesByCategory,
  admins
} from './store/reducers/index'

import { Colors } from "./constants";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import ModeratorRoute from "./components/ModeratorRoute";
import VolunteerRoute from "./components/VolunteerRoute";
import CleaderRoute from "./components/CleaderRoute";
import AdminAndChairmanRoute from "./components/AdminAndChairmanRoute"

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
profile,
getAllMyCauses,
getMyCause,
getVolunteersForApproval : getVolunteersForApproval,
getVolunteerForApproval,
makeDecisionOnVolunteer,
reviewCauses : displayCausesForReview,
displayCause : displayCause,
recommend : recommendCause,
makeDecisionOnCause,
resolveCause,
getAllMySuccessStories,
MyStoryDetails,
getAllSuccessStories,
crudEvent,
makeDecisionOnEventByCleader,
resolveEvent,
getAllCausesByCategory,
admins
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
            <Route path="/cause/:id" exact component={ACausePage} />
            <Route path="/story/:id" exact component={VisitorsSuccessStoryPage} />
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
            <ProtectedRoute path="/dashboard/myCauses" component={MyCauses} exact/>
            <ProtectedRoute path="/dashboard/myCauses/:id" exact component={MyCauseDetails} />
            <ProtectedRoute path="/dashboard/myCauses/:id/:cause_id" component={EditCause} />
            <ProtectedRoute path="/dashboard/profile" component={Profile} />
            <ProtectedRoute path="/dashboard/getMySuccessStory/:id" component={GetMySuccessStoryDetails} />
            <ProtectedRoute path="/dashboard/mySuccessStory/:id" exact component={MySuccessStory}/>
            <ProtectedRoute path="/dashboard/myevents" component={GetAllMyEvent} exact/>
            <ProtectedRoute path="/dashboard/myevents/:id" component={MyEventDetails} />
            <CleaderRoute path="/dashboard/approveVolunteer" component={ViewVolunteerRegPending} exact/>
            <ProtectedRoute path="/dashboard/createEvent" component={CreateEvent} />
            <ProtectedRoute path="/dashboard/editEvent/:id" component={EditEvent} />
            <CleaderRoute path="/dashboard/approveVolunteer/:id" component={ApproveVolunteer} />
            <VolunteerRoute path="/dashboard/review" component={ReviewCauses } exact/>
            <VolunteerRoute path="/dashboard/review/:id" component={RecommendAcause }/>
            <CleaderRoute exact path="/dashboard/approve" component={GetAllCausesForCleadersDecision}/>
            <CleaderRoute exact path="/dashboard/getEventsByCleader" component={GetAllEventsByCleader}/>
            <CleaderRoute exact path="/dashboard/getEventsByCleader/:id" component={MakeAdecisionOnEventByCleader}/>
            <CleaderRoute path="/dashboard/approve/:id" component={CauseDetailsToBeApproved}/>
            <ModeratorRoute path="/dashboard/resolve" exact component={GetAllCausesForDirectors}/>
            <ModeratorRoute exact path="/dashboard/resolve/:id" component={Resolvecause}/>
            <ModeratorRoute path="/dashboard/resolveEvent" exact component={GetAllEventsByDirector}/>
            <ModeratorRoute path="/dashboard/resolveEvent/:id" exact component={ResolveEvent}/>
            <ModeratorRoute
              path="/dashboard/cause/:id"
              component={ModeratorCausePage}
            />
            <AdminAndChairmanRoute exact path="/dashboard/users" component={ViewALLUsers}/>
            <AdminAndChairmanRoute exact path="/dashboard/user/:id" component={UserDetails}/>
            <AdminAndChairmanRoute exact path="/dashboard/viewCausesAsAleader" component={ViewALLCausesByAdmins}/>
            <AdminAndChairmanRoute exact path="/dashboard/viewEventsAsAleader" component={ViewAllEventsByAdmins}/>
            <AdminAndChairmanRoute exact path="/dashboard/viewCauseAsAleader/:id" component={AdminCauseView}/>
            <Route  component={NotFound} />
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
