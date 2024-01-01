import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import NewHome from "views/examples/NewHome";
import Home from "views/examples/Home";
import { useSelector } from "react-redux";
import TermsAndConditions from "views/examples/TaC";
import ConfirmConsert from "views/examples/confirmConsent";
import ShopUser from "views/examples/shop/ShopUser";
import Shop from "views/examples/Shop";
import ShopSign from "views/examples/ShopSign";
import ShopPoster from "views/examples/ShopPoster";
import SignsAndPosters from "views/examples/SignsAndPosters";
import Badges from "views/examples/Badges";
import Trending from "views/examples/Trending";

function App() {
  let auth = useSelector((state) => state.auth);
  return (
    <>
      <BrowserRouter>
        {auth.uid ? (
          <Switch>
            <Route
              path="/admin"
              render={(props) => <AdminLayout {...props} />}
            />
            <Redirect from="/auth" to="/admin/index" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
            <Redirect from="/admin" to="/auth/login" />
          </Switch>
        )}
        <Route path="/" exact component={NewHome} />
        <Route path="/home" exact component={Home} />
        <Route path="/shop" exact component={Shop} />
        <Route path="/trending" exact component={Trending} />
        <Route path="/badges" exact component={Badges} />
        <Route path="/shop/signs" exact component={ShopSign} />
        <Route
          path="/shop/signs-and-posters"
          exact
          component={SignsAndPosters}
        />
        <Route path="/shop/posters" exact component={ShopPoster} />
        <Route path="/shop/:name/payment" exact component={ShopUser} />
        <Route path="/terms-and-conditions" component={TermsAndConditions} />
        <Route path="/confirm-consent" exact component={ConfirmConsert} />
      </BrowserRouter>
    </>
  );
}

export default App;
