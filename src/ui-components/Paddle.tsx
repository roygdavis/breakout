import * as React from 'react';

export interface PaddleProps {
    xPos: number,
    yPos: number,
    width: number,
    height: number
}

const Paddle: React.FC<PaddleProps> = (props) => {
    const { xPos, yPos, width, height } = props;
    return (<rect x={xPos} y={yPos} width={width} height={height} style={{ fill: "rgb(0, 0, 255)" }} ></rect>);
}

export default Paddle;