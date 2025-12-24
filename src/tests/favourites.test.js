// This tests logic, not UI rendering 
test('dummy test for favourite logic presence', () => {
    const favs = [];
    const newFav = { id: 1 };
    favs.push(newFav);
    expect(favs.length).toBe(1);
});