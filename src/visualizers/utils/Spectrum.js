export function Spectrum() {
  var spectrumMaxExponent = 5
  var spectrumMinExponent = 3
  var spectrumHeight = 255

  var spectrum = {
    GetVisualBins: function (dataArray, numElements, SpectrumStart, SpectrumEnd) {
      var SpectrumBarCount = numElements
      var SamplePoints = []
      var NewArray = []
      var LastSpot = 0
      let i, CurSpot
      for (i = 0; i < SpectrumBarCount; i++) {
        var Bin = Math.round(SpectrumEase(i / SpectrumBarCount) * (SpectrumEnd - SpectrumStart) + SpectrumStart)
        if (Bin <= LastSpot) {
          Bin = LastSpot + 1
        }
        LastSpot = Bin
        SamplePoints[i] = Bin
      }

      var MaxSamplePoints = []
      for (i = 0; i < SpectrumBarCount; i++) {
        CurSpot = SamplePoints[i]
        var NextSpot = SamplePoints[i + 1]
        if (NextSpot == null) {
          NextSpot = SpectrumEnd
        }

        var CurMax = dataArray[CurSpot]
        var MaxSpot = CurSpot
        var Dif = NextSpot - CurSpot
        for (var j = 1; j < Dif; j++) {
          var NewSpot = CurSpot + j
          if (dataArray[NewSpot] > CurMax) {
            CurMax = dataArray[NewSpot]
            MaxSpot = NewSpot
          }
        }
        MaxSamplePoints[i] = MaxSpot
      }

      for (i = 0; i < SpectrumBarCount; i++) {
        CurSpot = SamplePoints[i]
        var NextMaxSpot = MaxSamplePoints[i]
        var LastMaxSpot = MaxSamplePoints[i - 1]
        if (LastMaxSpot == null) {
          LastMaxSpot = SpectrumStart
        }
        var LastMax = dataArray[LastMaxSpot]
        var NextMax = dataArray[NextMaxSpot]

        NewArray[i] = (LastMax + NextMax) / 2
        if (isNaN(NewArray[i])) {
          NewArray[i] = 0
        }
      }
      return exponentialTransform(NewArray)
    }
  }

  function exponentialTransform(array) {
    var newArr = []
    for (var i = 0; i < array.length; i++) {
      var exp = spectrumMaxExponent + (spectrumMinExponent - spectrumMaxExponent) * (i / array.length)
      newArr[i] = Math.max(Math.pow(array[i] / spectrumHeight, exp) * spectrumHeight, 1)
    }
    return newArr
  }

  function SpectrumEase(v) {
    return Math.pow(v, 2.55)
  }

  return spectrum
}
