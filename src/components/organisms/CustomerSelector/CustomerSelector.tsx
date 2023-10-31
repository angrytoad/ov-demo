import {FunctionComponent, useContext} from "react";
import css from "./CustomerSelector.module.scss"
import {Link, Outlet, useParams} from "react-router-dom";
import {AppContext} from "../../../stores/AppContext.ts";
import {observer} from "mobx-react-lite";
import DirectionalEntry from "../../animations/DirectionalEntry/DirectionalEntry.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Align, Flex, FlexDirection} from "../../atoms/Flex/Flex.tsx";
import {IconName} from "@fortawesome/free-solid-svg-icons";

export type CustomerSelectorPropsType = {}

const CustomerSelector: FunctionComponent<CustomerSelectorPropsType> = ({}: CustomerSelectorPropsType) => {
  const { customerId } = useParams();

  const {
    CustomerStore,
    MeterStore,
  } = useContext(AppContext);

  return (
    <div className={css.customerSelector}>
      <div className={css.customers}>
        {
          [...CustomerStore.customers.entries()].map(([key, customer], i) => {
            const meters = MeterStore.metersForCustomer(key);
            const isActive = customerId === key;
            return (
              <DirectionalEntry key={key} className={`${css.customer} ${isActive ? css.active : css.inactive}`} delay={i * 0.2}>
                <Link to={`/customer/${key}`}>
                  <Flex className={css.header}>
                    <FontAwesomeIcon className={css.icon} icon={"fa-solid fa-building" as IconName} />
                    <div className={css.count}>
                      { meters.length } meter(s)
                    </div>
                  </Flex>
                  <Flex className={css.info} flexDirection={FlexDirection.COLUMN} align={Align.STRETCH}>
                    <span className={css.name}>{ customer.name }</span>
                    <small className={css.address}>{ customer.address }</small>
                  </Flex>
                </Link>
              </DirectionalEntry>
            )
          })
        }
      </div>
      <Outlet />
    </div>
  );
}

export default observer(CustomerSelector);
