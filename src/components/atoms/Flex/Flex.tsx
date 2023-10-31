import React, {PropsWithChildren, ReactElement} from 'react';
import css from './Flex.module.scss';

export enum Align {
  START = 'START',
  CENTER = 'CENTER',
  END = 'END',
  NORMAL = 'NORMAL',
  STRETCH = 'STRETCH',
}

export enum Justify {
  START = 'START',
  CENTER = 'CENTER',
  END = 'END',
  SPACE_BETWEEN = 'SPACE_BETWEEN',
  SPACE_AROUND = 'SPACE_AROUND',
  SPACE_EVENLY = 'SPACE_EVENLY',
  STRETCH = 'STRETCH',
}

export enum FlexDirection {
  COLUMN = 'COLUMN',
  COLUMN_REVERSE = 'COLUMN_REVERSE',
  ROW = 'ROW',
  ROW_REVERSE = 'ROW_REVERSE',
}

export enum Gap {
  NONE = 'NONE',
  XS = 'XS',
  SM = 'SM',
  MD = 'MD',
  LG = 'LG',
  XL = 'XL',
  XXL = 'XXL',
}

export type FlexPropsType = {
  align?: Align,
  justify?: Justify,
  flexDirection?: FlexDirection,
  gap?: Gap,
  className?: string,
};

export const Flex: React.FC<PropsWithChildren<FlexPropsType>> = ({
  gap = Gap.NONE,
  align = Align.CENTER,
  justify = Justify.CENTER,
  flexDirection = FlexDirection.ROW,
  children,
  className = '',
}: PropsWithChildren<FlexPropsType>): ReactElement => {

  return (
    <div
      className={`
        ${css.flex}
        ${css[`ALIGN_${align}`]}
        ${css[`JUSTIFY_${justify}`]}
        ${css[`DIRECTION_${flexDirection}`]}
        ${css[`GAP_${gap}`]}
        ${className}
      `}>
      { children }
    </div>
  );
};
