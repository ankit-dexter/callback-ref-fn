"use client"

import React from "react";
import UseRefFailingExample from './components/normalRef';
import CallbackRefDemo from './components/callbackRef';

export default function RefsUse() {

  return (
    <div style={{ padding: "2rem" }}>
     <UseRefFailingExample />
     <CallbackRefDemo />
    </div>
  );
}
