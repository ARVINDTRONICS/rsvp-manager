import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

export const ThemedButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#f05434"),
  backgroundColor: "#f05434",
  "&:hover": {
    backgroundColor: "#f05434"
  }
}));
