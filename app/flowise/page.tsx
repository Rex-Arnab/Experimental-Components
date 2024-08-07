"use client";
import { BubbleChat, FullPageChat } from "flowise-embed-react";

const Flowise = () => {
  return (
    <BubbleChat
      chatflowid="9c9c3a8e-f55c-4fb1-9b02-a8115514061a"
      apiHost="http://localhost:3000"
    />
  );
};

export default Flowise;
