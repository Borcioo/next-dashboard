import dynamic from "next/dynamic";
import { LucideProps } from "lucide-react";
import { icons } from "lucide-react";
// import dynamicIconImports from "lucide-react/dynamicIconImports";

interface IconProps extends LucideProps {
  name: keyof typeof icons;
}

const Icon = ({ name, ...props }: IconProps) => {
  // const LucideIcon = dynamic(dynamicIconImports[name]);
  const LucideIcon = icons[name];

  return <LucideIcon {...props} />;
};

export default Icon;
