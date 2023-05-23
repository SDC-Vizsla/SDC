export default function(reviews, criteria) {
  // criteria = relevant, recent, helpful

  const msInAMonth = 2.628 * 10**9;
  const ageFactor = 50;  // i.e., a 1-month-old review has weight of 50 (+ its helpfulness)

  switch (criteria) {
      case 'relevant':
          return reviews.toSorted((a, b) => {
              const bMonthsAgo =(Date.now() - Date.parse(b.date)) / msInAMonth;
              const aMonthsAgo =(Date.now() - Date.parse(a.date)) / msInAMonth;
              const bRelevance = b.helpfulness + (1 / bMonthsAgo) * ageFactor;
              const aRelevance = a.helpfulness + (1 / aMonthsAgo) * ageFactor;
              return bRelevance - aRelevance;  // sort descending by calculated relevance score
          });
          break;
      case 'recent':
          return reviews.toSorted((a, b) => Date.parse(b.date) - Date.parse(a.date));  // sort descending by date
          break;
      case 'helpful':
          return reviews.toSorted((a, b) => b.helpfulness - a.helpfulness);  // sort descending by helpfulness
          break;
  };
};