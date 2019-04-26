import * as React from 'react';

export interface PaddleProps {
    xPos: number
}

const Paddle: React.FC<PaddleProps> = (props) => {
    const { xPos } = props;
    return (<rect x={xPos} y="500" width="50" height="20" style={{ fill: "rgb(0, 0, 255)" }} ></rect>);
}

export default Paddle;