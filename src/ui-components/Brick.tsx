import * as React from 'react';

export interface BrickProps {
    xPos: number;
    yPos: number;
    power: number;
    id: number;
}

const Brick: React.SFC<BrickProps> = (props: BrickProps) => {
    const { xPos, yPos, power } = props;
    return (
        <rect
            x={xPos}
            y={yPos}
            width="100"
            height="20"
            style={{ fill: "rgb(255, 0, 0)", opacity: power }}>
        </rect >);
}

export default Brick;