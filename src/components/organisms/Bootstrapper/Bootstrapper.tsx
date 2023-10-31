import {FunctionComponent, PropsWithChildren, useContext, useEffect, useState} from "react";
import css from "./Bootstrapper.module.scss"
import {AppContext} from "../../../stores/AppContext.ts";
import {observer} from "mobx-react-lite";
import FadeIn from "../../animations/FadeIn/FadeIn.tsx";
import Loading from "../../atoms/Loading/Loading.tsx";
import {Align, Flex, FlexDirection, Gap} from "../../atoms/Flex/Flex.tsx";


const Bootstrapper: FunctionComponent<PropsWithChildren> = ({
  children,
}: PropsWithChildren) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const {
    CustomerStore,
    MeterStore,
  } = useContext(AppContext);

  useEffect(() => {
    const async = async () => {
      try{
        await CustomerStore.fetchAll();
        await MeterStore.fetchAll();
        setLoading(false);
        setError(false);
      } catch (e){
        setLoading(false);
        setError(true);
      }

    };
    async()
  },[])


  if(loading){
    return (
      <FadeIn className={css.bootstrapper}>
        <Flex flexDirection={FlexDirection.COLUMN} align={Align.CENTER} gap={Gap.MD}>
          <Loading />
          <span>Getting your profile.</span>
        </Flex>
      </FadeIn>
    )
  }

  if(error){
    throw new Error('OW!')
  }

  return (
    <div className={css.bootstrapper}>
      { children }
    </div>
  );
}

export default observer(Bootstrapper);

