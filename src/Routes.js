import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Auth from './auth/Main';
import Home from './core/Home';
import TraditionalSP from './core/TraditionalSP';
import HtvSP from './core/HtvSP';
import Sublimation from './core/Sublimation';
import Embroidery from './core/Embroidery';
import Engraving from './core/Engraving';
import Merchandise from './core/Merchandise';
import Design from './design';
import PrivateRoute from './auth/PrivateRoute';
import UserDashboard from './user/Dashboard';
import UserConfirm from './user/Confirm';
import AdminUserInformation from './admin/dashboard/AdminInformation';
import Categories from './admin/categories/';
import Products from './admin/products';
import ProductViews from './admin/ProductViews';
import FullCart from './cart/fullCart';
import Checkout from './checkout'
import Payment from './payment'
import OrderList from './admin/orders'

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/auth" exact component={Auth} />
                <Route path="/screen-printing/traditional" exact component={TraditionalSP} />
                <Route path="/main" exact component={TraditionalSP} />
                <Route path="/screen-printing/htv" exact component={HtvSP} />
                <Route path="/sublimation" exact component={Sublimation} />
                <Route path="/embroidery" exact component={Embroidery} />
                <Route path="/engraving" exact component={Engraving} />
                <Route path="/merchandise" exact component={Merchandise} />
                <Route path="/design/:productId" exact component={Design} />
                <Route path="/design/:productId/edit/:editProductId" exact component={Design} />
                <Route path="/design/:productId/edit/:editProductId/print/:printingType" exact component={Design} />
                <Route path="/cart" exact component={FullCart} />
                <Route path="/checkout" exact component={Checkout} />
                <Route path="/payment" exact component={Payment} />
                <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
                <PrivateRoute path="/user/confirm" exact component={UserConfirm} />
                <PrivateRoute path="/admin/dashboard/user-information" adminRole={true} exact component={AdminUserInformation} />
                <PrivateRoute path="/admin/dashboard/categories" adminRole={true} exact component={Categories} />
                <PrivateRoute path="/admin/dashboard/products" adminRole={true} exact component={Products} />
                <PrivateRoute path="/admin/dashboard/products/:id/product-views" adminRole={true} exact component={ProductViews} />
                <PrivateRoute path="/admin/dashboard/orders" adminRole={true} exact component={OrderList} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;