
// describe("entry.teleport() & entry.teleportReturn()", () => {
//   let collection, entry, div;

//   beforeAll(async () => {
//     document.body.innerHTML = `
//       <main>
//         <div id="entry"></div>
//       </main>
//       <div class="container"></div>
//     `;
//     collection = new Collection();
//     entry = collection.createEntry("entry", { settings: {
//       teleportMethod: "append"
//     }});
//     div = document.querySelector(".container");
//   });

//   it("should teleport a registered entry", () => {
//     expect(div.children.length).toBe(0);
//     entry.teleport(".container");
//     expect(div.children.length).toBe(1);
//     expect(entry.returnRef.textContent).toBe("teleported #entry");
//   });

//   it("should log error if teleport is run on an entry that has already been teleported", () => {
//     expect(div.children.length).toBe(1);
//     entry.teleport(".container");
//     expect(console.error).toHaveBeenCalledWith("Element has already been teleported:", entry.el);
//     expect(div.children.length).toBe(1);
//   });

//   it("should return the teleported entry", () => {
//     expect(div.children.length).toBe(1);
//     entry.teleportReturn();
//     expect(div.children.length).toBe(0);
//     expect(entry.returnRef).toBe(null);
//   });

//   it("should log error if teleportReturn is run with no return reference", () => {
//     expect(entry.returnRef).toBe(null);
//     expect(div.children.length).toBe(0);
//     entry.teleportReturn();
//     expect(console.error).toHaveBeenCalledWith("No return reference found:", entry.el);
//     expect(div.children.length).toBe(0);
//   });
// });
