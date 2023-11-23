const parseMillimetreToPixel = (
  millimetre: number,
  scaleRange: number
  ): number => {
  return Math.round(millimetre*scaleRange)
}

export default parseMillimetreToPixel
