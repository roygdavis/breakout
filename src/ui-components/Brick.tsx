import * as React from 'react';
import { Component } from 'react';
import { BallProps } from './Ball';

export interface BrickProps {
    xPos: number;
    yPos: number;
    power: number;
    balls: Array<BallProps>
    id: number;
}

export interface BrickState {
    power: number;
}

class Brick extends React.Component<BrickProps, BrickState> {
    constructor(props: BrickProps) {
        super(props);
        this.state = { power: props.power };
    }
    render() {
        const { xPos, yPos } = this.props;
        const { power } = this.state;
        const colourShade = (255 / power) * power;
        return (
            <rect
                x={xPos}
                y={yPos}
                width="100"
                height="20"
                style={{ fill: `rgb(${colourShade}, 0, 0)` }} >
            </rect>);
    }
}

export default Brick;