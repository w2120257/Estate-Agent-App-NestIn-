import { filterProperties } from '../utils/filterProperties';

const mockProps = [
    { id: '1', type: 'House', price: 100, bedrooms: 3, postcode: 'BR1' },
    { id: '2', type: 'Flat', price: 200, bedrooms: 2, postcode: 'NW1' }
];

test('filters by type correctly', () => {
    const result = filterProperties(mockProps, { type: 'House' });
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('1');
});

test('filters by min price', () => {
    const result = filterProperties(mockProps, { minPrice: 150 });
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('2');
});

test('returns all for "any" type', () => {
    const result = filterProperties(mockProps, { type: 'any' });
    expect(result.length).toBe(2);
});

test('filters by postcode partial match', () => {
    const result = filterProperties(mockProps, { postcode: 'br' });
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('1');
});