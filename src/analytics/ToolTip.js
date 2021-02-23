import React, { useState, useEffect } from "react";
import { UncontrolledTooltip } from "reactstrap";
import Table from "./Table";

const ToolTip = (props) => {
  return (
    <UncontrolledTooltip placement="bottom" target="toolTipDiv">
      <Table data={props} />
    </UncontrolledTooltip>
  );
};

export default ToolTip;
