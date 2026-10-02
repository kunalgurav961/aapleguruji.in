import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addBooking } from "../state/bookingSlice";

export const useBookingHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleBooking = (data) => {
    if (data) {
      dispatch(addBooking(data));
    }

    navigate(isAuthenticated ? "/home/booking" : "/login");
  };

  return {
    dispatch,
    handleBooking,
  };
};
