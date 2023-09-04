// 1 = ΝΑΙ 0 = ΟΧΙ
export const yesno = (value) => {
  if (value === 0) return 'ΟΧΙ'
  else if (value === 1) return 'ΝΑΙ'
  else return null
}