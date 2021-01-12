import _sortedIndexBy from 'lodash/sortedIndexBy'
import _cloneDeep from 'lodash/cloneDeep'
import { parseSync, stringifySync } from 'subtitle'

class CaptionData {
  constructor(srtText){
    this.nodes = []
    if (srtText){
      this.nodes = parseSync(srtText)
      this.fixTiming()
    }
  }

  fixTiming(){
    for (let i = 0, l = this.nodes.length - 1; i < l; i++){
      const next = this.nodes[i + 1]
      const n = this.nodes[i]
      n.data.end = Math.min(n.data.end, next.data.start)
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

  clone(){
    const c = new CaptionData()
    c.nodes = _cloneDeep(this.nodes)
    return c
  }

  getSrt(){
    return stringifySync(this.nodes, { format: 'SRT' })
  }

  getVtt(){
    return stringifySync(this.nodes, { format: 'WebVTT' })
  }
}

export default CaptionData
