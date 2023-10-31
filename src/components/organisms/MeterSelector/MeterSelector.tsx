import {FunctionComponent, useContext} from "react";
import css from "./MeterSelector.module.scss"
import {useParams} from "react-router-dom";
import {AppContext} from "../../../stores/AppContext.ts";
import {observer} from "mobx-react-lite";
import FadeIn from "../../animations/FadeIn/FadeIn.tsx";
import DirectionalEntry from "../../animations/DirectionalEntry/DirectionalEntry.tsx";
import {Align, Flex, FlexDirection, Justify} from "../../atoms/Flex/Flex.tsx";
import MeterVisualiser from "../MeterVisualiser/MeterVisualiser.tsx";

const MeterSelector: FunctionComponent = () => {
  const { customerId } = useParams();

  const {
    MeterStore,
  } = useContext(AppContext);

  if(!customerId){
    return <></>
  }

  const meters = MeterStore.metersForCustomer(customerId);

  if(meters.length === 0){
    return (
      <FadeIn className={css.meterSelector}>
        <small>This customer ({customerId}) has no meters</small>
      </FadeIn>
    )
  }

  return (
    <FadeIn className={css.meterSelector}>
      <h3>January 2023</h3>
      <Flex className={css.meters} justify={Justify.START} flexDirection={FlexDirection.COLUMN} align={Align.STRETCH}>
        {
          meters.map(([key, meter], i) => {
            return (
              <DirectionalEntry key={key} className={css.meter} delay={i * 0.2}>
                <MeterVisualiser meter={meter} />
              </DirectionalEntry>
            )
          })
        }
      </Flex>
    </FadeIn>
  );
}

export default observer(MeterSelector);
