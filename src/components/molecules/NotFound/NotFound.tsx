import {FunctionComponent} from "react";
import {Align, Flex, FlexDirection, Gap} from "../../atoms/Flex/Flex.tsx";
import FadeIn from "../../animations/FadeIn/FadeIn.tsx";

export type NotFoundPropsType = {}

const NotFound: FunctionComponent<NotFoundPropsType> = ({}: NotFoundPropsType) => {

  return (
    <FadeIn>
      <Flex flexDirection={FlexDirection.COLUMN} align={Align.STRETCH} gap={Gap.MD}>
        <h2>Welp!</h2>
        <p>It definitely looks like we didn't anticipate you making it to this URL.</p>
      </Flex>
    </FadeIn>
  );
}

export default NotFound;
