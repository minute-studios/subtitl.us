import _sortedIndexBy from 'lodash/sortedIndexBy'
import { parseSync, stringifySync } from 'subtitle'

class CaptionData {
  constructor(srtText){
    this.nodes = []
    if (srtText){
      this.nodes = parseSync(srtText)
    }
  }

  clear(){
    this.nodes = []
    return this
  }

  addCue(startMs, endMs, text){
    const entry = {
      type: 'cue',
      data: {
        start: startMs,
        end: endMs,
        text
      }
    }
    const idx = _sortedIndexBy(this.nodes, entry, 'data.start')
    this.nodes.splice(idx, 0, entry)
    return this
  }

  getSrt(){
    return stringifySync(this.nodes, { format: 'SRT' })
  }

  getVtt(){
    return stringifySync(this.nodes, { format: 'WebVTT' })
  }
}

export default CaptionData
