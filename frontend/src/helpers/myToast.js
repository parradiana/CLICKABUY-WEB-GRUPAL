import { toast } from "react-toastify";
const defaultConfiguration = (position) => {
  return {
    position,
    autoClose: 3500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
};

export function showToast(type, message, position = "top-right") {
  switch (type) {
    case "error":
      toast.dark(message, defaultConfiguration(position));
      break;
    case "success":
      toast.dark(message, defaultConfiguration(position));
      break;
    case "info":
      toast.dark(message, defaultConfiguration(position));
      break;
    default:
      toast.dark(`error myToast, type: "${type}" is invalid`, "bottom-left");
  }
}

export function showTostError500(position = "top-right") {
  toast.dark("ups , something went wrong, please try again... ", defaultConfiguration(position));
}
