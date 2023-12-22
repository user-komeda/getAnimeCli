import EpisodeObject from './EpisodeObject'
import voiceActorObject from './VoiceActorObject'

export default interface AnimeData {
  pageId: string
  title: string
  characterList: Array<string>
  episodeList: Array<EpisodeObject>
  soundList: Array<string>
  staffList: Array<string>
  voiceActorList: Array<voiceActorObject>
}
