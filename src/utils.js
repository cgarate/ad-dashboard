/* eslint-disable import/prefer-default-export */
export const calculateCTR = (clicks, impressions) => {
  if (
    typeof clicks !== 'number' &&
    typeof impressions !== 'number' &&
    impressions <= 0
  ) {
    return null
  }

  const result = (clicks / impressions) * 100
  return result.toFixed(2)
}
