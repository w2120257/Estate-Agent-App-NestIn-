import { filterProperties } from '../utils/filterProperties';

const props = [{ id: '1', bedrooms: 5 }];

test('filters by max bedrooms', () => {
    const res = filterProperties(props, { maxBeds: 4 });
    expect(res.length).toBe(0);
});