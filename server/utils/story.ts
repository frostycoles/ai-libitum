export type StoryPieces = {
  names: string[] | null;
  places: string[] | null;
  verbs: string[] | null;
  adverbs: string[] | null;
  adjectives: string[] | null;
}


export function getStory(pieces: StoryPieces) {
  // const {names, places, verbs, adverbs, adjectives} = pieces;
  console.log('frostycoles', { pieces });
}