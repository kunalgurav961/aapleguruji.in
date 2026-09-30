import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../state/authActions";
import { getRegistrationOptions } from "../api/authApi";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const useAuthHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [role, setRole] = useState("devotee");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      role: "devotee",
      whatsappUpdates: true,
    },
  });

  const password = watch("password", "");
  const [options, setOptions] = useState({ cities: [], vedicShakhas: [] });
  const [optionsError, setOptionsError] = useState("");
  const [registrationMessage, setRegistrationMessage] = useState("");

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const response = await getRegistrationOptions();
        setOptions(response);
      } catch {
        setOptionsError("Registration options could not be loaded. Please refresh and try again.");
      }
    };

    loadOptions();
  }, []);

  const changeRole = (nextRole) => {
    setRole(nextRole);
    setValue("role", nextRole, { shouldValidate: true });
  };

  const formSubmit = async (data) => {
    try {
      setRegistrationMessage("");
      const response = await dispatch(registerUser(data)).unwrap();
      setRegistrationMessage(response.message);
      toast.success("Congratulations Your Account Has Been Successfully created!");
      navigate("/home");
    } catch (error) {
      error.errors?.forEach(({ path, message }) => setError(path, { type: "server", message }));
      toast.error(error.message || "Registration failed. Please try again.");
    }
  };

  return {
    dispatch,
    navigate,
    role,
    setRole: changeRole,
    password,
    register,
    errors,
    handleSubmit,
    reset,
    formSubmit,
    watch,
    isSubmitting,
    cities: options.cities,
    vedicShakhas: options.vedicShakhas,
    optionsError,
    registrationMessage,
  };
};
