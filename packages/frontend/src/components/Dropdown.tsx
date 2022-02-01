import { FunctionComponent } from "react";

interface IProps {
  options: { label: string; key: string }[];
  onChange: (key: string) => void;
}
const Dropdown: FunctionComponent<IProps> = ({ options, onChange }) => {
  return <h1>Dropdown</h1>;
};

export default Dropdown;
