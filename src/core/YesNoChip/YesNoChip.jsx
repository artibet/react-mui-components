import React from 'react'
import { MyChip } from '../MyChip'

export const YesNoChip = ({ status, showYes = true, showNo = true, width = 80 }) => {
  if (Boolean(status)) {
    return showYes &&
      <MyChip
        label='ΝΑΙ'
        backgroundColor='green'
        fontSize='12px'
        paddingX='5px'
        width={width}
      />
  }
  else {
    return showYes &&
      <MyChip
        label='ΟΧΙ'
        backgroundColor='red'
        fontSize='12px'
        paddingX='5px'
        width={width}
      />
  }

}

export default YesNoChip