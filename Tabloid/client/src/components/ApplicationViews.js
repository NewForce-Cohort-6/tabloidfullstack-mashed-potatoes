import React from "react";
import { Route, Routes } from "react-router-dom";
import Hello from "./Hello";
import Tag from "./tags/TagList";

export default function ApplicationViews() {

 return(
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/tag" element={<Tag />} />

        <Route path="/Categories" element={<Categories />} />
      </Routes>
   );
 
}
