import React from "react";
import { Admin, Resource } from "react-admin";

import { dataProvider } from "./providers/dataProvider";
import { authProvider } from "./providers/authProvider";
import UserList from "./pages/User/UserList";
import UserEdit from "./pages/User/UserEdit";

import TourList from "./pages/Tour/TourList";
import TourCreate from "./pages/Tour/TourCreate";
import TourEdit from "./pages/Tour/TourEdit";

import OrderList from "./pages/Order/OrderList";
import OrderEdit from "./pages/Order/OrderEdit";

function App() {
  return (
    <Admin
      title="My Admin"
      authProvider={authProvider}
      dataProvider={dataProvider}
    >
      <Resource name="users" list={UserList} edit={UserEdit} />
      <Resource
        name="tour"
        options={{ label: "Tours" }}
        list={TourList}
        edit={TourEdit}
        create={TourCreate}
      />
      <Resource name="order" list={OrderList} edit={OrderEdit} />
    </Admin>
  );
}

export default App;
