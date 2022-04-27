import React from "react"

import ElementClassOption from './ElementClassOption'
import Summary from './Summary'

const styles: Styles = {
  options: {
    display: "flex",
    flexWrap: "wrap",
    marginBottom: "10px",
    justifyContent: "space-around",
  }
}

/**
 * 筛选-单选
 * @param {{items: Array<{imageSrc: string; text: string}>; name: srting; onSelect: (index: number) => void}} props 
 * @returns {JSX.Element}
 */
export default function ElementClassSelector(props: {
  options: Array<{ value: string | number; imageSrc: string; name: string; }>;
  name: string;
  value: string;
  onChange: Fn<string | number, void>;
  iconStyle?: React.CSSProperties;
  elementsMaxHeight: string;
}) {
  const {
    options,
    value,
    onChange,
    elementsMaxHeight
  } = props
  return (
    <Summary name={props.name} maxHeight={elementsMaxHeight} flagNumber={options.filter(x => x.value === value).length}>
      <div style={styles.options}>
        {
          options.map((item) => 
            <ElementClassOption 
              key={item.value}
              selected={item.value === value}
              imageSrc={item.imageSrc}
              text={item.name}
              onClick={() => onChange(item.value)}
              iconStyle={props.iconStyle}
            />
          )
        }

        {
          options.length % 2 === 0 ? <></> : <div style={{width: "94px"}}></div>
        }
      </div>
    </Summary>
  )
}