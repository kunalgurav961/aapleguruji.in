const PanditFields = ({ register, errors, vedicShakhas }) => {
  return (
    <div className="p-4 sm:p-5 rounded-xl bg-surface-container-low space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 text-primary font-semibold">
        <span className="material-symbols-outlined text-[20px]">verified</span>

        <span>Vedic Scholar Credentials (पुरोहित माहिती)</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Vedic Shakha */}
        <div>
          <label
            htmlFor="vedicShakha"
            className="block font-label-md text-on-surface mb-1.5"
          >
            Vedic Shakha / वेद शाखा
          </label>

          <select
            id="vedicShakha"
            {...register("vedicShakha", {
              required: "Please select your Vedic Shakha",
            })}
            className="w-full px-3 py-2.5 bg-surface-container-lowest text-on-surface rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select Vedic Shakha</option>
            {vedicShakhas.map((shakha) => (
              <option key={shakha.value} value={shakha.value}>
                {shakha.label}
              </option>
            ))}
          </select>
          {errors?.vedicShakha && (
            <p className="mt-1 text-xs text-error">{errors.vedicShakha.message}</p>
          )}
        </div>

        {/* Experience */}
        <div>
          <label
            htmlFor="experience"
            className="block font-label-md text-on-surface mb-1.5"
          >
            Experience / अनुभव
          </label>

          <input
            id="experience"
            type="text"
            placeholder="e.g. 12 Years, Tri-Shula Certified"
            {...register("experience", {
              maxLength: {
                value: 100,
                message: "Experience details are too long",
              },
            })}
            className={`
              w-full
              px-3
              py-2.5
              bg-surface-container-lowest
              text-on-surface
              rounded-lg
              text-sm
              focus:outline-none
              focus:ring-2
              focus:ring-primary
              ${errors?.experience ? "ring-2 ring-error" : ""}
            `}
          />

          {errors?.experience && (
            <p className="mt-1 text-xs text-error">
              {errors.experience.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PanditFields;
