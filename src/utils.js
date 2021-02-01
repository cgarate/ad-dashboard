/* eslint-disable import/prefer-default-export */
export const calculateCTR = (clicks, impressions) => {
  if (
    impressions <= 0 ||
    typeof clicks !== 'number' ||
    typeof impressions !== 'number'
  ) {
    return null
  }

  const result = (clicks / impressions) * 100
  return result.toFixed(2)
}
