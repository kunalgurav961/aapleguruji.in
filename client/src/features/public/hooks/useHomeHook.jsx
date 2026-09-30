import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useBookingHook } from "../../booking/hooks/useBookingHook";

export const useHomeHook = () => {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let { handleBooking } = useBookingHook();
  let navigate = useNavigate();

  const handleBook = (data) => {
      handleBooking(data);
  };

  return {
    register,
    handleSubmit,
    errors,
    navigate,
    handleBook,
  };
};
