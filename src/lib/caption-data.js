import _sortedIndexBy from 'lodash/sortedIndexBy'
import _cloneDeep from 'lodash/cloneDeep'
import { parseSync, stringifySync } from 'subtitle'

class CaptionData {
  constructor(vttText){
    this.nodes = []
    if (vttText){
      this.nodes = parseSync(vttText)
      this.fixTiming()
    }
  }

  get nodes(){
    return this._nodes
  }

  set nodes(n){
    this._nodes = n
    this._cues = this._nodes.filter(n => n.type === 'cue')
  }

  get cues(){
    return this._cues
  }

  fixTiming(){
    const cues = this.cues
    for (let i = 0, l = cues.length - 1; i < l; i++){
      const next = cues[i + 1]
      const n = cues[i]
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
