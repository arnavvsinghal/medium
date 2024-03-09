import Avatar, { genConfig } from "react-nice-avatar";
import { FunctionComponent } from "react";

interface AvatarImgProps {
  id: string;
  shape : "circle" | "rounded" | "square"
}

const AvatarImg: FunctionComponent<AvatarImgProps> = ({ shape, id }) => {
  const initialConfig = genConfig(id);
  const config = genConfig({
    ...initialConfig,
    sex: "man",
    hairStyle: "normal",
    hatStyle: "none",
    eyeBrowStyle: "up",
  });
  return <Avatar shape={shape} className="h-full w-full" {...config} />;
};

export default AvatarImg;
