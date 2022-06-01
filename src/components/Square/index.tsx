import React from 'react'
import { PlayerType, SquareState } from 'types'
import { WiDaySunny, WiNightAltSleet } from "react-icons/wi";

interface IProps {
    value: SquareState
    onClick: () => void
}

const name: React.FC<IProps> = ({value, onClick}) => {
  return (
    <button className='square' onClick={onClick}>
        {!!value && (value === 'X' ? <WiDaySunny color='red'/> : < WiNightAltSleet color='white'/>)}
    </button>
  )
}
export default name