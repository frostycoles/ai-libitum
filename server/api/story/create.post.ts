export default eventHandler(async (event) => {
  const { pieces }: { pieces: StoryPieces } = await readBody(event);
  return getStory(pieces);
});