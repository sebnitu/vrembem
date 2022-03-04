export async function closeAll(array, exclude, transition) {
  const result = [];
  await Promise.all(array.map(async (modal) => {
    if (exclude && exclude === modal.id) {
      Promise.resolve(); 
    } else {
      result.push(await modal.close(transition));
    }
  }));
  return result;
}
