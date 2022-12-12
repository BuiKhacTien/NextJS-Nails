import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import dynamic from "next/dynamic";
import { useSelector } from "react-redux";

const PanelLeft = dynamic(
  () => import("../../../components/Account/PanelLeft"),
  {
    ssr: false,
  }
);
const Profile = dynamic(() => import("../../../components/Account/Profile"), {
  ssr: false,
});
const Address = dynamic(() => import("../../../components/Account/Address"), {
  ssr: false,
});
const YourOrders = dynamic(
  () => import("../../../components/Account/YourOrders"),
  {
    ssr: false,
  }
);
const WishList = dynamic(
    () => import("../../../components/Account/WishList"),
    {
      ssr: false,
    }
  );
const Discount = dynamic(() => import("../../../components/Account/Discount"), {
  ssr: false,
});
const Reward = dynamic(() => import("../../../components/Account/Reward"), {
  ssr: false,
});
const Payment = dynamic(() => import("../../../components/Account/Payment"), {
  ssr: false,
});
const Communication = dynamic(
  () => import("../../../components/Account/Communication"),
  {
    ssr: false,
  }
);

const routes = [
  {
     name: Profile,
     path: 'account',
  },
  {
     name: Address,
     path: 'address',
  },
  {
     name: YourOrders,
     path: 'your-order',
  },
  {
     name: Discount,
     path: 'discount-code',
  },
  {
     name: Reward,
     path: 'reward',
  },
  {
     name: Payment,
     path: 'payment',
  },
  {
     name: Communication,
     path: 'communication-preferences',
  },
]

export default function Index({}) {
  const router = useRouter();
  const slug = router.query.slug;

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      router.push("/login-register")
    }
  }, []);

  return (
    <main className="account-page">
      <div className="container bg-white pt-4">
        <div className="row">
          <div
            style={{ position: "sticky", top: 0 }}
            className="d-none d-md-block col-md-3"
          >
            <PanelLeft />
          </div>
          <div className="col-md-9">
            {
              routes.map((value, index) => {
                return slug === value.path && (
                  <div key={index+"account"}>
                    <Profile/>
                  </div>
                )
              })
            }
            {/* {slug === "account" && <Profile />}
            {slug === "address" && <Address />}
            {slug === "your-order" && <YourOrders />}
            {slug === "wish-list" && <WishList />}
            {slug === "discount-code" && <Discount />}
            {slug === "reward" && <Reward />}
            {slug === "payment" && <Payment />}
            {slug === "communication-preferences" && <Communication />} */}
          </div>
        </div>
      </div>
    </main>
  );
}
