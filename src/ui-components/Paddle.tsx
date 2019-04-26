import * as React from 'react';

export interface PaddleProps {
    xPos: number,
    width: number,
    height: number
}

const Paddle: React.FC<PaddleProps> = (props) => {
    const { xPos, width, height } = props;
    return (<rect x={xPos} y="500" width={width} height={height} style={{ fill: "rgb(0, 0, 255)" }} ></rect>);
}

export default Paddle;