import React, { useMemo, useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import flagImage from '../images/nl.png'

const FlagsDropdown = ({ codes, codesString, setSelectedFlag }) => {
  const [selected, setSelected] = useState("");
  const onSelect = (code) => {
    setSelected(code);
    setSelectedFlag(code)
  }

  const flagCodes = [];

  for (let code of codes) {
    flagCodes.push(code)
  }
  const allFlags = Object.assign({}, ...flagCodes);


  const showSelectedLabel = ("Show Selected Label", true);
  const showSecondarySelectedLabel = (
    "Show Secondary Selected Label",
    true
  );
  const showOptionLabel = ("Show Option Label", true);
  const showSecondaryOptionLabel = ("Show Secondary Option Label", true);
  const searchable = ("Searchable", false);

  const customLabels = ("Custom Labels",
    allFlags
  );

  const placeholder = "Select Language"

  return (
    <div className="demo-wrapper">
      <ReactFlagsSelect
        selected={selected}
        onSelect={onSelect}
        value={selected}
        // showSelectedLabel={showSelectedLabel}
        // showSecondarySelectedLabel={showSecondarySelectedLabel}
        showOptionLabel={showOptionLabel}
        // showSecondaryOptionLabel={showSecondaryOptionLabel}
        customLabels={customLabels}
        countries={codesString}
        searchable={true}
        fullWidth={true}
        placeholder={<span><img src={flagImage} /> NL</span>}

      />
    </div>
  );
};

export default FlagsDropdown;