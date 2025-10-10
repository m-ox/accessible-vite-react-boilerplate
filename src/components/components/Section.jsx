import InputField from "./Fields/InputField";
import CheckboxField from "./Fields/CheckboxField";
import RadioButtonField from "./Fields/RadioButtonField";
import TextAreaField from "./Fields/TextAreaField";

const Section = ({ index, node }) => {
  if (!node) return null;

    const renderField = (field, i) => {
        switch (field.fieldType) {
            case "Text":
                return <InputField key={i} field={field} />;
            case "Date":
                return <InputField key={i} field={field} />;
            case "Number":
                return <InputField key={i} field={field} type="number" />;
            case "Boolean":
                return <CheckboxField key={i} field={field} />;
            case "Enumeration":
                return <RadioButtonField key={i} field={field} />;
            case "Textarea":
                return <TextAreaField key={i} field={field} />;
            default:
                return null;
        }
    };

  return (
    <div className={`node node-${node.nodeType}`} key={index}>
      {node.title && <h2>{node.title}</h2>}
      {node.description && <p>{node.description}</p>}
      {node.label && <label className="node-label">{node.label}</label>}
        {/* Section has "section Type" */}
      {node.children.map((child, i) => {
        if (child.nodeType === "field") return renderField(child, i);
        else return <Section key={i} node={child} />;
      })}
    </div>
  );
};

export default Section;