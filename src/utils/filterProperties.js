export const filterProperties = (properties, criteria) => {
  return properties.filter(property => {
    // 1. Filter by Type
    if (criteria.type && criteria.type !== 'any' && property.type !== criteria.type) {
      return false;
    }

    // 2. Filter by Price
    if (criteria.minPrice && property.price < parseInt(criteria.minPrice)) return false;
    if (criteria.maxPrice && property.price > parseInt(criteria.maxPrice)) return false;

    // 3. Filter by Bedrooms
    if (criteria.minBeds && property.bedrooms < parseInt(criteria.minBeds)) return false;
    if (criteria.maxBeds && property.bedrooms > parseInt(criteria.maxBeds)) return false;

    // 4. Filter by Postcode/Location
    if (criteria.postcode) {
      // Check if location exists before lowercasing it
      const pLocation = property.location ? property.location.toLowerCase() : "";
      const pPostcode = property.postcode ? property.postcode.toLowerCase() : "";
      const cSearch = criteria.postcode.toLowerCase();
      
      // Match if the search text is in location OR postcode
      if (!pLocation.includes(cSearch) && !pPostcode.includes(cSearch)) {
        return false;
      }
    }

    // 5. Filter by Date 
    if (criteria.dateAfter || criteria.dateBefore) {
      const propDate = new Date(property.dateAdded);

      if (criteria.dateAfter && propDate < criteria.dateAfter) return false;
      if (criteria.dateBefore && propDate > criteria.dateBefore) return false;
    }

    return true;
  });
};