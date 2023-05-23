export default function(stars) {
  if (stars.length === 5) return 'all';  // all 5 stars means filtering for 'all' reviews
  if (stars.length === 1) return `${stars[0]} star`;  // only 1 filter
  stars = stars.toSorted().reverse();
  if (stars.length === 2) return `${stars[0]} & ${stars[1]} star`;  // 2 filters
  let result = '';
  stars.forEach((star, index) => {  // 3 or 4 filters
    result += star;
    if (index < stars.length - 1) result += ', ';
    if (index === stars.length - 2) result += '& ';
    if (index === stars.length - 1) result += ' star';
  });
  return result;
}