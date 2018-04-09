import { style } from 'react-toastify';

export const TOASTER_ERROR_OPTION = {
  autoClose: false,
  style: style({
    width: "40%",
    colorError: "#e74c3ccc",
  }),
  className: {
    borderRadius: "5px"
  }
}