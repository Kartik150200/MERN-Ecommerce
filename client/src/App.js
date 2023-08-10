import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ShippingPage from "./pages/ShippingPage";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import ProductPage from "./pages/ProductPage";
import PaymentPage from "./pages/PaymentPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import OrderPage from "./pages/OrderPage";
import OrderListPage from "./pages/OrderListPage";
import ProductListPage from "./pages/ProductListPage";
import UserListPage from "./pages/UserListPage";
import ProductEditPage from "./pages/ProductEditPage";
import ConfirmPage from "./pages/ConfirmPage";
import PasswordResetPage from "./pages/PasswordResetPage";
import UserEditPage from "./pages/UserEditPage";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-2">
        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search/:keyword" element={<HomePage />} />
            <Route path="/page/:pageNumber" element={<HomePage />} />
            <Route
              path="/search/:keyword/page/:pageNumber"
              element={<HomePage />}
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/cart" element={<CartPage />} />
            {/* <Route path="/cart:id?" component={CartPage} /> */}
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/placeorder" element={<PlaceOrderPage />} />
            <Route path="/orders/:id" element={<OrderPage />} />
            <Route path="/admin/orderlist" element={<OrderListPage />} />
            <Route
              path="/admin/orderlist/:pageNumber"
              element={<OrderListPage />}
            />
            <Route path="/admin/userlist" element={<UserListPage />} />
            <Route path="/admin/productlist" element={<ProductListPage />} />
            <Route
              path="/admin/product/:productId/edit"
              element={<ProductEditPage />}
            />
            <Route path="/user/confirm/:token" element={<ConfirmPage />} />
            <Route
              path="/user/password/reset/:token"
              element={<PasswordResetPage />}
            />
            <Route path="/admin/user/:id/edit" element={<UserEditPage />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
