import { useDispatch } from "react-redux";
import { addBooking } from "../state/bookingSlice";

export const useBookingHook = () => {
  let dispatch = useDispatch();
  const handleBooking = (data) => {
    dispatch(addBooking(data));
  };

  return {
    dispatch,
    handleBooking,
  };
};
