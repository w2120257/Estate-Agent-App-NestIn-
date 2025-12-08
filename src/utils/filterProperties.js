export const filterProperties = (properties, criteria) => {
  return properties.filter(property => {
    // 1. Filter by Type
    if (criteria.type !== 'any' && property.type !== criteria.type) {
      return false;
    }

    // 2. Filter by Price
    if (criteria.minPrice && property.price < parseInt(criteria.minPrice)) return false;
    if (criteria.maxPrice && property.price > parseInt(criteria.maxPrice)) return false;

    // 3. Filter by Bedrooms
    if (criteria.minBeds && property.bedrooms < parseInt(criteria.minBeds)) return false;
    if (criteria.maxBeds && property.bedrooms > parseInt(criteria.maxBeds)) return false;

    // 4. Filter by Postcode (Simple partial match on Location/Postcode)
    if (criteria.postcode) {
      // Check against location string since your JSON uses "location" (e.g., "Petts Wood, Orpington")
      const pLocation = property.location.toLowerCase();
      const pPostcode = property.postcode ? property.postcode.toLowerCase() : "";
      const cSearch = criteria.postcode.toLowerCase();
      
      // Match if the search text is in location OR postcode
      if (!pLocation.includes(cSearch) && !pPostcode.includes(cSearch)) {
        return false;
      }
    }

    // 5. Filter by Date Added
    if (criteria.dateAfter || criteria.dateBefore) {
      // Parse the JSON string (e.g. "2025-10-12") into a Date object
      const propDate = new Date(property.dateAdded);

      // Check "After"
      if (criteria.dateAfter && propDate < criteria.dateAfter) return false;

      // Check "Before"
      if (criteria.dateBefore && propDate > criteria.dateBefore) return false;
    }

    return true;
  });
};