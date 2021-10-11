import React from "react";
import { render, screen } from "@testing-library/react";

import { Registeration } from "../Registeration";

describe("Registeration", () => {
  test("renders Registeration component", () => {
    render(<Registeration />);

    screen.debug();
  });
});
