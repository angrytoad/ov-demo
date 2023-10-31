import {FunctionComponent, useContext, useEffect, useState} from "react";
import css from "./MeterVisualiser.module.scss"
import {Fuel, Meter} from "../../../types/api.types.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconName} from "@fortawesome/free-solid-svg-icons";
import Loading from "../../atoms/Loading/Loading.tsx";
import {AppContext} from "../../../stores/AppContext.ts";
import {observer} from "mobx-react-lite";
import FadeIn from "../../animations/FadeIn/FadeIn.tsx";
import {Align, Flex, FlexDirection, Gap} from "../../atoms/Flex/Flex.tsx";
import NationalGridStore from "../../../stores/NationalGridStore.ts";
import {DateTime} from "luxon";

export type MeterVisualiserPropsType = {
  meter: Meter,
}

const MeterVisualiser: FunctionComponent<MeterVisualiserPropsType> = ({
  meter,
}: MeterVisualiserPropsType) => {
  const [loading, setLoading] = useState(true);

  const {
    MeterStore,
  } = useContext(AppContext);

  useEffect(() => {
    const async = async () => {
      await MeterStore.fetchMeter(meter._id)
      await NationalGridStore.fetchCarbonIntensities(
        DateTime.fromJSDate(new Date('2023-01-01')).toFormat("yyyy-MM-dd'T'HH:mm'Z'"),
        DateTime.fromJSDate(new Date('2023-01-10')).toFormat("yyyy-MM-dd'T'HH:mm'Z'")
      )
      await NationalGridStore.fetchCarbonIntensities(
        DateTime.fromJSDate(new Date('2023-01-10')).toFormat("yyyy-MM-dd'T'HH:mm'Z'"),
        DateTime.fromJSDate(new Date('2023-01-20')).toFormat("yyyy-MM-dd'T'HH:mm'Z'")
      )
      await NationalGridStore.fetchCarbonIntensities(
        DateTime.fromJSDate(new Date('2023-01-20')).toFormat("yyyy-MM-dd'T'HH:mm'Z'"),
        DateTime.fromJSDate(new Date('2023-02-01')).toFormat("yyyy-MM-dd'T'HH:mm'Z'")
      )
      await NationalGridStore.fetchEnergyMixes(
        DateTime.fromJSDate(new Date('2023-01-01')).toFormat("yyyy-MM-dd'T'HH:mm'Z'"),
        DateTime.fromJSDate(new Date('2023-02-01')).toFormat("yyyy-MM-dd'T'HH:mm'Z'")
      )
      setLoading(false);
    }

    async();
  }, [])

  /*
  This is kWh
   */
  const totalUsage = MeterStore.totalUsageForMeter(meter._id);

  /*
  This is gCO2/kWh
   */
  const totalEmission = MeterStore.totalEmissionForMeter(meter._id, NationalGridStore.intensities)

  const energyMix = NationalGridStore.averagedEnergyMix(
    DateTime.fromJSDate(new Date('2023-01-01')).toFormat("yyyy-MM-dd'T'HH:mm'Z'"),
    DateTime.fromJSDate(new Date('2023-02-01')).toFormat("yyyy-MM-dd'T'HH:mm'Z'")
  )

  return (
    <div className={`${css.meter} ${loading ? css.loading : ''}`}>
      <div className={css.graphic}>
        <FontAwesomeIcon
          className={css.icon}
          icon={"fa-solid fa-mobile-retro" as IconName}
        />
        {
          loading && (
            <div className={css.loading}>
              <Loading />
            </div>
          )
        }
      </div>
      <div className={css.info}>
        <small>#{ meter.meter_number }</small>
        <div>{ meter.description }</div>
      </div>
      {
        !loading && (
          <FadeIn className={css.data}>
            <Flex flexDirection={FlexDirection.COLUMN} gap={Gap.MD} align={Align.STRETCH}>
              <Flex gap={Gap.MD}>
                <div>
                  <small>Total Usage (kWh)</small>
                  <div>{ totalUsage.toLocaleString() }&nbsp;kWh</div>
                </div>
                <div>
                  <small>CO2 Emitted (kgs)</small>
                  <div>{ (totalEmission/1000).toLocaleString() }&nbsp; kgs</div>
                </div>
              </Flex>
              <div>
                <small>Energy Mix Breakdown</small>
                <Flex className={css.energyMix} flexDirection={FlexDirection.COLUMN} align={Align.START}>
                  <small>
                    Biomass - { energyMix[Fuel.BIO].toFixed(2) }%
                    <span className={css.bar} style={{ width: `${energyMix[Fuel.BIO].toFixed(2)}%`}}></span>
                  </small>
                  <small>
                    Coal - { energyMix[Fuel.COAL].toFixed(2) }%
                    <span className={css.bar} style={{ width: `${energyMix[Fuel.COAL].toFixed(2)}%`}}></span>
                  </small>
                  <small>
                    Gas - { energyMix[Fuel.GAS].toFixed(2) }%
                    <span className={css.bar} style={{ width: `${energyMix[Fuel.GAS].toFixed(2)}%`}}></span>
                  </small>
                  <small>
                    Hydro - { energyMix[Fuel.HYDRO].toFixed(2) }%
                    <span className={css.bar} style={{ width: `${energyMix[Fuel.HYDRO].toFixed(2)}%`}}></span>
                  </small>
                  <small>
                    Imports - { energyMix[Fuel.IMPORTS].toFixed(2) }%
                    <span className={css.bar} style={{ width: `${energyMix[Fuel.IMPORTS].toFixed(2)}%`}}></span>
                  </small>
                  <small>
                    Nuclear - { energyMix[Fuel.NUCLEAR].toFixed(2) }%
                    <span className={css.bar} style={{ width: `${energyMix[Fuel.NUCLEAR].toFixed(2)}%`}}></span>
                  </small>
                  <small>
                    Solar - { energyMix[Fuel.SOLAR].toFixed(2) }%
                    <span className={css.bar} style={{ width: `${energyMix[Fuel.SOLAR].toFixed(2)}%`}}></span>
                  </small>
                  <small>
                    Wind - { energyMix[Fuel.WIND].toFixed(2) }%
                    <span className={css.bar} style={{ width: `${energyMix[Fuel.WIND].toFixed(2)}%`}}></span>
                  </small>
                </Flex>
              </div>
            </Flex>
          </FadeIn>
        )
      }
    </div>
  );
}

export default observer(MeterVisualiser);
