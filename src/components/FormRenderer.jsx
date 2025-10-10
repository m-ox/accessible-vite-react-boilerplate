import { useEffect } from "react";
import Section from "./Section";
import data709 from "../data/form709.json";
import { useFormStore } from "../store/useFormStore";

const FormRenderer = () => {
  const { formData, setFormData } = useFormStore();

  useEffect(() => {
    if (!formData) {
      setFormData(data709);
    }
  }, [formData, setFormData]);

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="form-container">
      <p>OMB Control Number: {formData.OMBControlNumber}</p>

      {formData.children.map((child, index) => (
        <Section key={index} node={child} />
      ))}
    </div>
  );
};

export default FormRenderer;
