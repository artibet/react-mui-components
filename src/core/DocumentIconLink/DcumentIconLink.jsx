import { DescriptionOutlined } from '@mui/icons-material'
import { Tooltip } from '@mui/material'
import React from 'react'

export const DocumentIconLink = ({
  url,
  tooltip = null,
  size = '36px',
  activeColor = 'green',
  inactiveColor = 'red'
}) => {

  // If tooltip exists
  if (tooltip) {
    return (
      <Tooltip title={tooltip}>
        {url
          ?
          <a href={url} target="_blank">
            <DescriptionOutlined sx={{ fontSize: size, color: activeColor }} />
          </a>
          :
          <DescriptionOutlined sx={{ fontSize: size, color: inactiveColor }} />

        }
      </Tooltip>
    )
  }

  // If no tooltip
  return (
    <>
      {url
        ?
        <a href={url} target="_blank">
          <DescriptionOutlined sx={{ fontSize: { size }, color: activeColor }} />
        </a>
        :
        <DescriptionOutlined sx={{ fontSize: { size }, color: { inactiveColor } }} />

      }
    </>
  )
}

