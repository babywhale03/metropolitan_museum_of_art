import { Link } from "react-router-dom";

function Radio({ children, value, name, defaultChecked, disabled }) {
    return (
      <label>
        <input
          type="radio"
          value={value}
          name={name}
          defaultChecked={defaultChecked}
          disabled={disabled}
          style={{marginRight: 1 + 'em', marginBottom: 1 + 'em'}}
        />
        {children}
        <p></p>
      </label>
    );
  }

export default Radio;