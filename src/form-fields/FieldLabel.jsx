import { Typography } from "@mui/material"

export const FieldLabel = ({ children, required }) => {

  // ---------------------------------------------------------------------------------------
  // JSX
  // ---------------------------------------------------------------------------------------
  return (
    <Typography
      variant="body2" // Από caption σε body2 για καλύτερο base size
      sx={{
        display: 'block',
        mb: 0.8, // Ελαφρώς περισσότερο κενό από το πεδίο
        fontWeight: 600, // Semi-bold αντί για πολύ βαρύ 700
        color: 'text.primary', // Πιο σκούρο χρώμα για μέγιστη αντίθεση
        fontSize: '0.825rem', // Ισορροπημένο μέγεθος
        lineHeight: 1.2,
        letterSpacing: '0.01rem',
        // Προσθήκη ελαφριάς απόστασης από το αριστερό περιθώριο αν χρειάζεται
        pl: 0.2
      }}
    >
      {children}
      {required && (
        <Typography
          component="span"
          sx={{
            color: 'error.main',
            ml: 0.5,
            fontWeight: 900,
            fontSize: '1rem',
            lineHeight: 0
          }}
        >
          *
        </Typography>
      )}
    </Typography>
  )
}