import React from 'react'
import { Bar, Line } from "react-chartjs-2";

import ThemeContainer from '../../compenents/parts/ThemeContainer'

export default function AHome() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    const tmp_data = {
      labels: ['test 1', 'test 1', 'test 1', 'test 1'],
      datasets: [
        {
          label: "Daily Report",
          backgroundColor: "#fff",
          borderColor: "#ccc",
          borderWidth: 2,
          data: [
            44,
            55,
            66,
            99
          ],
          backgroundColor: ["#FD9800", "#ffa500", "#FFEFB4", "orange"],
          borderColor: ["#FD9800", "#ffa500", "#FFEFB4", "orange"],
          borderWidth: 1,
        },
      ],
    };

    //setData(tmp_data);
    console.log(tmp_data);
  }, []);

  return (<ThemeContainer role="admin">
    <div>AHome</div>
    <div className="flex items-center gap-5 rounded-xl bg-white p-4 shadow-lg ring-1 ring-black/5">
      <div className="grid grid-cols-1 grid-rows-1">
        <div className="border-4 border-gray-100"></div>
        <div className="border-4 border-amber-500 mask-conic-from-75% mask-conic-to-75%"></div>
      </div>
      <div className="w-0 flex-1 text-sm text-gray-950">
        <p className="font-medium">Subscriptions - 75% Renewed</p>
        <p className="mt-1 text-gray-500 "><span className="font-medium">177 </span> out of 200 remaining</p>
      </div>
    </div>
    <div className="flex">
      {data && <div className="w-full md:w-[50%]"><Bar data={data} /></div>}
      {data && <div className="w-full md:w-[50%]"><Line data={data} /></div>}
    </div>

  </ThemeContainer>)
}
