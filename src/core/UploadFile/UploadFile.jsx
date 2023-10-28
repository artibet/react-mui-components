import React from 'react'
import { Box } from '@mui/material'
import { ConfirmationDialog } from '../../Modals'

export const UploadFile = ({
  activationElement,
  onUpload,
  replace = false,
  replaceTitle = 'Επιβεβαίωση Τροποποίησης Αρχείου',
  replaceMessage = 'Το προηγούμενο αρχείο θα διαγραφεί οριστικά. Να γίνει η τροποποίηση;',
}) => {

  // ---------------------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------------------
  const [showConfirm, setShowConfirm] = React.useState(false)
  const inputFileRef = React.useRef(null)

  // ---------------------------------------------------------------------------------------
  // Upload click handler
  // ---------------------------------------------------------------------------------------
  const handleUploadClick = () => {
    if (replace) {
      setShowConfirm(true)
    } else {
      handleConfirm()
    }
  }

  // ---------------------------------------------------------------------------------------
  // Upload confirmation handler
  // ---------------------------------------------------------------------------------------
  const handleConfirm = () => {
    setShowConfirm(false)
    inputFileRef.current.value = null
    inputFileRef.current.click()
  }

  // ---------------------------------------------------------------------------------------
  // Upload file handler
  // ---------------------------------------------------------------------------------------
  const handleUpload = event => {
    const file = event.target.files[0]
    if (!file) return // cancel pressed
    onUpload(file)
  }

  // ---------------------------------------------------------------------------------------
  // JSX
  // ---------------------------------------------------------------------------------------
  return (
    <>
      <Box onClick={handleUploadClick}>
        {activationElement}
      </Box>
      <input type='file' ref={inputFileRef} style={{ display: 'none' }} onChange={(e) => handleUpload(e)} />
      {
        replace &&
        <ConfirmationDialog
          open={showConfirm}
          onConfirm={handleConfirm}
          onCancel={() => setShowConfirm(false)}
          title={replaceTitle}
          message={replaceMessage}
        />
      }
    </>
  )
}
