"use client"

import React from "react";
import ChartWithUseRef from './components/normalRefForCharts';
import CallbackRefDemo from './components/callbackRefForCharts';

export default function RefsUse() {

  return (
    <div style={{ padding: "2rem" }}>
     <CallbackRefDemo />
     <ChartWithUseRef />
    </div>
  );
}
