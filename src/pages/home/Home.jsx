import FeaturedInfo from "../../featuredInfo/FeaturedInfo";
import WidgetLg from "../../widgetLg/WidgetLg";
import WidgetSm from "../../widgetSm/WidgetSm";
import Chart from "../../chart/Chart";
import "./home.css";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../../requestMethods";
import { Outlet } from "react-router";

export default function Home() {
  const [userStats, setUserStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("/users/stats");
        res.data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active User": item.total },
          ])
        );
      } catch (err) {
        res.status(500).json(err);
      }
    };
    getStats();
  }, [MONTHS]);
  return (
    <>
      <div className="home">
        <FeaturedInfo />
        <Chart
          data={userStats}
          title="User Analytics"
          grid
          dataKey="Active User"
        />
        <div className="homeWidgets">
          <WidgetSm />
          <WidgetLg />
        </div>
      </div>
      <Outlet />
    </>
  );
}
