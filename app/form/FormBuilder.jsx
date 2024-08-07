import React, { useState } from "react";
import PropTypes from "prop-types";

const FormBuilder = ({ formConfig, onSubmit, customStyles }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
    setErrors({
      ...errors,
      [name]: undefined // Clear error on change
    });
  };

  const validate = () => {
    const newErrors = {};
    formConfig.fields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
      if (
        field.type === "email" &&
        formData[field.name] &&
        !/\S+@\S+\.\S+/.test(formData[field.name])
      ) {
        newErrors[field.name] = "Email is invalid";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      if (onSubmit) {
        await onSubmit(formData);
      }
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${customStyles}`}>
      <h2 className="text-xl font-semibold">{formConfig.title}</h2>
      {formConfig.fields.map((field, index) => {
        const { type, name, label, disabled, min, max, options } = field;

        return (
          <div key={index} className="flex flex-col">
            {label && <label className="mb-1">{label}</label>}
            {type === "select" ? (
              <select
                name={name}
                onChange={handleChange}
                disabled={disabled}
                className="border rounded p-2">
                {options.map((option, idx) => (
                  <option key={idx} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : type === "checkbox" ? (
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name={name}
                  onChange={handleChange}
                  disabled={disabled}
                  className="mr-2"
                />
                <span>{label}</span>
              </div>
            ) : (
              <input
                type={type}
                name={name}
                onChange={handleChange}
                disabled={disabled}
                min={min}
                max={max}
                className={`border rounded p-2 ${errors[name] ? "border-red-500" : ""}`}
              />
            )}
            {errors[name] && (
              <span className="text-red-500 text-sm">{errors[name]}</span>
            )}
          </div>
        );
      })}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`bg-blue-500 text-white rounded p-2 hover:bg-blue-600 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

FormBuilder.propTypes = {
  formConfig: PropTypes.shape({
    title: PropTypes.string.isRequired,
    fields: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        label: PropTypes.string,
        disabled: PropTypes.bool,
        required: PropTypes.bool,
        min: PropTypes.string,
        max: PropTypes.string,
        options: PropTypes.arrayOf(
          PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired
          })
        )
      })
    ).isRequired
  }).isRequired,
  onSubmit: PropTypes.func,
  customStyles: PropTypes.string
};

export default FormBuilder;
