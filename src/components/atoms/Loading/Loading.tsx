import {FunctionComponent} from "react";
import FadeIn from "../../animations/FadeIn/FadeIn.tsx";

const Loading: FunctionComponent = () => {

  return (
    <FadeIn>
      <img alt="loading" src="/puff.svg" />
    </FadeIn>
  );
}

export default Loading;
